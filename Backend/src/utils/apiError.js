// @add description
// this class is responsible of operational errors (error that i can predict)

class ApiError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${this.message}`.startsWith(4) ? "failed" : "Error";
		this.operational = true;
	}
}

module.exports = ApiError;
