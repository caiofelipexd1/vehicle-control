export default class FatalError extends Error {
  constructor(name, code, message) {
    super(name, code, message);
    this.name = name;
    this.code = code;
    this.message = message;
  }
}