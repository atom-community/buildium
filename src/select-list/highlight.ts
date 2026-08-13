/**
 * Vendored from `@children-of-atom/select-list`, which is not published to npm.
 * Upstream: children-of-atom @ 6deeb204e8cbf569da917a945ffa635ef1a21427,
 * `libraries/select-list/src/highlight.ts`. Unmodified apart from formatting.
 *
 * Keep the public API in sync with upstream so this directory can be swapped
 * for the package once it ships.
 */

export type HighlightSegment = {
  text: string;
  match: boolean;
};

/**
 * Split `text` into segments based on which character indices are
 * highlighted. Consecutive characters of the same kind are grouped.
 */
export function buildHighlightSegments(text: string, indices: number[]): HighlightSegment[] {
  if (!indices.length) return [{ text, match: false }];

  const hits = new Set(indices);
  const segments: HighlightSegment[] = [];
  let current = '';
  let currentMatch = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i);
    const isMatch = hits.has(i);

    if (i === 0) {
      currentMatch = isMatch;
      current = ch;
    } else if (isMatch === currentMatch) {
      current += ch;
    } else {
      segments.push({ text: current, match: currentMatch });
      current = ch;
      currentMatch = isMatch;
    }
  }

  if (current) {
    segments.push({ text: current, match: currentMatch });
  }

  return segments;
}
