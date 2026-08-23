import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';
import XRegExp from 'xregexp';
import type { BuildTarget, ErrorMatch, ErrorMatchType, FunctionMatch } from './types.ts';

type PreparedRegexes = Record<ErrorMatchType, (RegExp | null)[]>;

export default class ErrorMatcher extends EventEmitter {
  private regex: PreparedRegexes | null = null;
  private functions: FunctionMatch[] = [];
  private cwd: string | null = null;
  private output = '';
  private currentMatch: ErrorMatch[] = [];
  private firstMatchId: string | null = null;

  constructor() {
    super();

    atom.commands.add('atom-workspace', 'buildium:error-match', this.match.bind(this));
    atom.commands.add('atom-workspace', 'buildium:error-match-first', this.matchFirst.bind(this));
  }

  private _gotoNext(): void {
    const next = this.currentMatch[0];

    if (!next?.id) {
      return;
    }

    this.goto(next.id);
  }

  goto(id: string): void {
    const match = this.currentMatch.find((m) => m.id === id);

    if (!match) {
      this.emit('error', `Can't find match with id ${id}`);
      return;
    }

    // rotate to next match
    while (this.currentMatch[0] !== match) {
      this.currentMatch.push(this.currentMatch.shift() as ErrorMatch);
    }
    this.currentMatch.push(this.currentMatch.shift() as ErrorMatch);

    let file = match.file;

    if (!file) {
      this.emit('error', "Did not match any file. Don't know what to open.");
      return;
    }

    if (!path.isAbsolute(file)) {
      file = this.cwd + path.sep + file;
    }

    const row = match.line ? Number(match.line) - 1 : 0; /* Because atom is zero-based */
    const col = match.col ? Number(match.col) - 1 : 0; /* Because atom is zero-based */

    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        this.emit('error', `Matched file does not exist: ${file}`);
        return;
      }

      atom.workspace.open(file as string, {
        initialLine: row,
        initialColumn: col,
        searchAllPanes: true
      });

      this.emit('matched', match);
    });
  }

  private _parse(): void {
    this.currentMatch = [];

    // first run all functional matches
    this.functions.forEach((f, functionIndex) => {
      this.currentMatch = this.currentMatch.concat(
        f(this.output).map((match, matchIndex) => {
          match.id = `error-match-function-${functionIndex}-${matchIndex}`;
          match.type = match.type || 'Error';
          return match;
        })
      );
    });

    // then for all match kinds
    if (this.regex) {
      (Object.keys(this.regex) as ErrorMatchType[]).forEach((kind) => {
        // run all matches
        this.regex?.[kind]?.forEach((regex, i) => {
          if (!regex) {
            return;
          }

          XRegExp.forEach(this.output, regex, (rawMatch, matchIndex) => {
            // xregexp namespaces named captures under `groups` instead of
            // putting them on the match itself, so they have to be lifted out
            this.currentMatch.push({
              ...(rawMatch as unknown as ErrorMatch),
              ...(rawMatch.groups as unknown as ErrorMatch),
              id: `error-match-${i}-${matchIndex}`,
              type: kind
            });
          });
        });
      });
    }

    this.currentMatch.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

    this.firstMatchId = this.currentMatch.length > 0 ? (this.currentMatch[0]?.id ?? null) : null;
  }

  private _prepareRegex(regex: string | string[] | undefined): (RegExp | null)[] {
    const patterns = regex ? (Array.isArray(regex) ? regex : [regex]) : [];

    return patterns.map((pattern) => {
      try {
        return XRegExp(pattern);
      } catch (err) {
        this.emit('error', `Error parsing regex. ${(err as Error).message}`);
        return null;
      }
    });
  }

  set(target: BuildTarget, cwd: string, output: string): void {
    if (target.functionMatch) {
      this.functions = (Array.isArray(target.functionMatch) ? target.functionMatch : [target.functionMatch]).filter((f) => {
        if (typeof f !== 'function') {
          this.emit('error', `found functionMatch that is no function: ${typeof f}`);
          return false;
        }

        return true;
      });
    }

    this.regex = {
      Error: this._prepareRegex(target.errorMatch),
      Warning: this._prepareRegex(target.warningMatch)
    };

    this.cwd = cwd;
    this.output = output;
    this.currentMatch = [];

    this._parse();
  }

  match(): void {
    this._gotoNext();
  }

  matchFirst(): void {
    if (this.firstMatchId) {
      this.goto(this.firstMatchId);
    }
  }

  hasMatch(): boolean {
    return 0 !== this.currentMatch.length;
  }

  getMatches(): ErrorMatch[] {
    return this.currentMatch;
  }
}
