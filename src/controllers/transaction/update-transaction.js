import * as helpers from '../helpers/index.js';

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }

    async execute(httpRequest) {
        const { transactionId } = httpRequest.params;
        const updateTransactionParams = httpRequest.body;

        try {
            //VERIFICAR SE A ID ENVIADA É VÁLIDA
            const isIdValid = helpers.checkIfIdIsValid(transactionId);
            if (!isIdValid) {
                return helpers.invalidIdResponse();
            }

            //VERIFICAR SE OS CAMPOS ENVIADOS SÃO VÁLIDOS
            const allowedFields = ['name', 'amount', 'date', 'type'];
            const someFieldIsNotAllowed = Object.keys(
                updateTransactionParams,
            ).some((field) => !allowedFields.includes(field));
            if (someFieldIsNotAllowed) {
                return helpers.badRequest({
                    message: 'CTRL: Some provided field is not allowed.',
                });
            }

            //VALIDAR AMOUNT
            if (updateTransactionParams.amount) {
                const amountIsValid = helpers.checkIfAmountIsValid(
                    updateTransactionParams.amount,
                );
                if (!amountIsValid) {
                    return helpers.invalidAmountResponse();
                }
            }

            //VALIDAR TYPE
            if (updateTransactionParams.type) {
                const typeIsValid = helpers.checkIfTypeIsValid(
                    updateTransactionParams.type,
                );
                if (!typeIsValid) {
                    return helpers.invalidTypeResponse();
                }
            }

            //ATUALIZA A TRANSACTION
            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    updateTransactionParams,
                );

            if (!updatedTransaction) {
                return helpers.transactionNotFoundResponde();
            }
            return helpers.ok(updatedTransaction);
        } catch (error) {
            console.error(error);
            return helpers.serverError();
        }
    }
}
