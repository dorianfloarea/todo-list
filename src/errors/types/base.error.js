class BaseError extends Error {
  constructor(message, shouldLog = false) {
    super(message);

    this.shouldLog = shouldLog;
  }
}

module.exports = BaseError;
