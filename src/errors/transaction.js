export class TransactionNotFoundError extends Error {
    constructor(transactionId) {
        super(`User with id ${transactionId} not found.`);
        this.name = 'TransactionNotFoundError';
    }
}
