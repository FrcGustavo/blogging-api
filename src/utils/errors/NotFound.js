class NotFound extends Error {
  constructor(message = 'not found', status = 404) {
    super(message);
    this.name = 'Not Found';
    this.status = status;
  }
}

module.exports = NotFound;
