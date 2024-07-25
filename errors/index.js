export class SystemError extends Error {
    #_code;
    #_errors;

    get code() {
        return this._code;
    }

    get errors() {
        return this._errors;
    }

    constructor(code, message = 'an error occurred', errors) {
        super(message); // 'Error' breaks prototype chain here
        this._code = code || 500;
        this.message = message;
        this._errors = errors;
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}

export class ApplicationError extends SystemError {
    constructor(code, message, errors) {
        super(code, message, errors);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends SystemError {
    constructor(message) {
        super(404, message || 'Resource not found.');
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ConflictError extends SystemError {
    constructor(message) {
        super(409, message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class UnauthorizedError extends SystemError {
    constructor(message) {
        super(401, message || 'You are not authorized to access this resource.');
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadRequestError extends SystemError {
    constructor(message) {
        super(400, message || 'Bad Request');
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ForbiddenError extends SystemError {
    constructor(message) {
        super(403, message || 'Access Denied');
        Object.setPrototypeOf(this, new.target.prototype);
    }
}