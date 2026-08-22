import path from 'path';
import type { ErrorMatch } from './types.ts';

type LinterSeverity = 'error' | 'warning' | 'info';

/**
 * A message in the Linter Message v2 format.
 *
 * @see https://github.com/steelbrain/linter/blob/master/docs/types/linter-message-v2.md
 */
type LinterMessage = {
  severity: LinterSeverity;
  location: {
    file: string;
    position: [[number, number], [number, number]];
  };
  excerpt: string;
  description?: string;
};

function extractRange(json: ErrorMatch): [[number, number], [number, number]] {
  return [
    [Number(json.line || 1) - 1, Number(json.col || 1) - 1],
    [Number(json.line_end || json.line || 1) - 1, Number(json.col_end || json.col || 1) - 1]
  ];
}

function typeToSeverity(type: string | undefined): LinterSeverity {
  switch (type?.toLowerCase()) {
    case 'warn':
    case 'warning':
      return 'warning';

    case 'info':
      return 'info';

    default:
      return 'error';
  }
}

/**
 * Flattens an HTML message into plain text, since Linter v2 messages render
 * Markdown rather than HTML.
 */
function stripHtml(html: string | undefined): string {
  if (!html) {
    return '';
  }

  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractExcerpt(match: ErrorMatch, fallback: string): string {
  return match.message || stripHtml(match.html_message) || fallback;
}

/**
 * Linter v2 has no equivalent of the v1 `trace` field, so traces are folded
 * into the parent message's Markdown description instead.
 */
function extractDescription(match: ErrorMatch, cwd: string): string | undefined {
  const traces = (match.trace || []).map((trace) => {
    const excerpt = extractExcerpt(trace, 'Trace in build');
    const [[line, col]] = extractRange(trace);

    return trace.file ? `- ${normalizePath(trace.file, cwd)}:${line + 1}:${col + 1} — ${excerpt}` : `- ${excerpt}`;
  });

  return traces.length ? `### Trace\n\n${traces.join('\n')}` : undefined;
}

function normalizePath(filePath: string, cwd: string): string {
  return path.isAbsolute(filePath) ? filePath : path.join(cwd, filePath);
}

type IndieDelegate = {
  dispose(): void;
  clearMessages(): void;
  setAllMessages(messages: LinterMessage[]): void;
};

/**
 * The `linter-indie` v2 service, a function registering an indie linter.
 *
 * @see https://github.com/steelbrain/linter/blob/master/docs/types/indie-linter-v2.md
 */
export type RegisterIndie = (config: { name: string }) => IndieDelegate;

class Linter {
  private linter: IndieDelegate;

  constructor(registerIndie: RegisterIndie) {
    this.linter = registerIndie({ name: 'Buildium' });
  }

  destroy(): void {
    this.linter.dispose();
  }

  clear(): void {
    this.linter.clearMessages();
  }

  processMessages(messages: ErrorMatch[], cwd: string): void {
    this.linter.setAllMessages(
      messages
        // Linter v2 messages require a location, so matches without a file can't be shown
        .filter((match): match is ErrorMatch & { file: string } => Boolean(match.file))
        .map((match) => ({
          severity: typeToSeverity(match.type),
          location: {
            file: normalizePath(match.file, cwd),
            position: extractRange(match)
          },
          excerpt: extractExcerpt(match, 'Error from build'),
          description: extractDescription(match, cwd)
        }))
    );
  }
}

export default Linter;
