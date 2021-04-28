import { name } from '../package.json';

const styleSheet = `
  background-color: darkslateblue;
  border-radius: 2px;
  color: white;
  line-height: 1.5;
  padding: 1px 4px;
  text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
`;

function __console__(type, ...args) {
  if (!atom?.inDevMode()) return;

  args.unshift(`%c${name}%c`, styleSheet, '');
  window.console[type](...args);
}

export default {
  debug(...data) {
    __console__('debug', ...data);
  },

  error(...data) {
    __console__('error', ...data);
  },

  info(...data) {
    __console__('info', ...data);
  },

  log(...data) {
    __console__('log', ...data);
  },

  trace(...data) {
    __console__('trace', ...data);
  },

  warn(...data) {
    __console__('warn', ...data);
  }
};
