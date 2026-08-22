import path from 'path';
import type { ErrorMatch } from './types.ts';

type LinterSeverity = 'error' | 'warning' | 'info';

type LinterMessage = {
  type: string;
  text?: string;
  html?: string;
  filePath?: string;
  severity: LinterSeverity | null;
  range: [[number, number], [number, number]];
  trace?: LinterMessage[];
};

function extractRange(json: ErrorMatch): [[number, number], [number, number]] {
  return [
    [Number(json.line || 1) - 1, Number(json.col || 1) - 1],
    [Number(json.line_end || json.line || 1) - 1, Number(json.col_end || json.col || 1) - 1]
  ];
}

function typeToSeverity(type: string | undefined): LinterSeverity | null {
  switch (type?.toLowerCase()) {
    case 'err':
    case 'error':
      return 'error';

    case 'warn':
    case 'warning':
      return 'warning';

    default:
      return null;
  }
}

type IndieLinter = {
  dispose(): void;
  deleteMessages(): void;
  setMessages(messages: LinterMessage[]): void;
};

export type LinterRegistry = {
  register(options: { name: string }): IndieLinter;
};

class Linter {
  private linter: IndieLinter;

  constructor(registry: LinterRegistry) {
    this.linter = registry.register({ name: 'Buildium' });
  }

  destroy(): void {
    this.linter.dispose();
  }

  clear(): void {
    this.linter.deleteMessages();
  }

  processMessages(messages: ErrorMatch[], cwd: string): void {
    function normalizePath(p: string): string {
      return path.isAbsolute(p) ? p : path.join(cwd, p);
    }

    this.linter.setMessages(
      messages.map((match) => ({
        type: match.type || 'Error',
        text: !match.message && !match.html_message ? 'Error from build' : match.message,
        html: match.message ? undefined : match.html_message,
        filePath: match.file ? normalizePath(match.file) : undefined,
        severity: typeToSeverity(match.type),
        range: extractRange(match),
        trace: match.trace?.map((trace) => ({
          type: trace.type || 'Trace',
          text: !trace.message && !trace.html_message ? 'Trace in build' : trace.message,
          html: trace.message ? undefined : trace.html_message,
          filePath: trace.file ? normalizePath(trace.file) : undefined,
          severity: typeToSeverity(trace.type) || 'info',
          range: extractRange(trace)
        }))
      }))
    );
  }
}

export default Linter;
