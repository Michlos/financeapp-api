export class EmailAlreadyExistsError extends Error {
    constructor(email) {
        super(`This Email ${email} is already in use`);
        this.name = 'EmailAlreadyExistsError';
    }
}
