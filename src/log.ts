import { name } from '../package.json';

type ConsoleMethod = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn';

const styleSheet = `
  background-color: darkslateblue;
  border-radius: 2px;
  color: white;
  line-height: 1.5;
  padding: 1px 4px;
  text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
`;

function __console__(type: ConsoleMethod, ...args: unknown[]): void {
  if (!atom?.inDevMode()) return;

  args.unshift(`%c${name}%c`, styleSheet, '');
  window.console[type](...args);
}

export default {
  debug(...data: unknown[]): void {
    __console__('debug', ...data);
  },

  error(...data: unknown[]): void {
    __console__('error', ...data);
  },

  info(...data: unknown[]): void {
    __console__('info', ...data);
  },

  log(...data: unknown[]): void {
    __console__('log', ...data);
  },

  trace(...data: unknown[]): void {
    __console__('trace', ...data);
  },

  warn(...data: unknown[]): void {
    __console__('warn', ...data);
  }
};
