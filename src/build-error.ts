export default class BuildError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.message = message;
    Error.captureStackTrace(this, BuildError);
  }
}
