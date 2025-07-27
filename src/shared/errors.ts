export class NotFoundError extends Error {
    constructor(resource = "Resource") {
        super(`${resource} not found`);
    }
}

export class AlreadyExistsError extends Error {
    constructor(resource = "Resource") {
        super(`${resource} already exists`);
    }
}

export class UnreachableError extends Error {
    constructor() {
        super(`unreachable`);
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super(`unauthorized`);
    }
}

export class BadRequestError extends Error {
    constructor(content?: string) {
        if (content) {
            super(content);
        } else {
            super(`bad request`);
        }
    }
}
