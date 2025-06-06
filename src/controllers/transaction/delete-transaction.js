import * as helpers from '../helpers/index.js';
export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId;
            const isIsValid = helpers.checkIfIdIsValid(transactionId);
            if (!isIsValid) {
                return helpers.invalidIdResponse();
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId);

            if (!deletedTransaction) {
                return helpers.transactionNotFoundResponse();
            }

            return helpers.ok(deletedTransaction);
        } catch (error) {
            console.error(error);
            return helpers.serverError();
        }
    }
}
