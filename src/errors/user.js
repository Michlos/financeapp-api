export class EmailAlreadyExistsError extends Error {
    constructor(email) {
        super(`This Email ${email} is already in use`);
        this.name = 'EmailAlreadyExistsError';
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with id ${userId} not found.`);
        this.name = 'UserNotFoundError';
    }
}
