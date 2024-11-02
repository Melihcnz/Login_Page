class createError extends Error {
  constructor(message, statusCode) {
    super(message); // Base class olan Error'un constructor'ını çağırır

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Hata durumunu belirler

    Error.captureStackTrace(this, this.constructor); // Stack trace'i yakalar
  }
}

module.exports = createError;
