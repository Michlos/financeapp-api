import * as helpers from '../helpers/index.js';
export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            //VALIDAÇÃO DE CAMPOS OBRIGATÓRIOS
            const requiredFields = [
                'user_id',
                'name',
                'date',
                'amount',
                'type',
            ];
            const { ok: requiredFieldsWereProvided, missingField } =
                helpers.validateRequiredFields(params, requiredFields);
            if (!requiredFieldsWereProvided) {
                return helpers.requiredFieldIsMissingResponse(missingField);
            }

            //VALIDANDO ID DO USUÁRIO SE É VÁLIDO
            const userIdIsValid = helpers.checkIfIdIsValid(params.user_id);
            if (!userIdIsValid) {
                return helpers.invalidIdResponse();
            }

            //VALIDAR AMOUNT
            const amountIsValid = helpers.checkIfAmountIsValid(params.amount);
            if (!amountIsValid) {
                return helpers.invalidAmoutResponse();
            }

            //VALIDANDO TYPE
            const type = params.type.trim().toUpperCase();
            const typeIsValid = helpers.checkIfTypeIsValid(type);
            if (!typeIsValid) {
                return helpers.invalidTypeResponse();
            }

            const transaction = await this.createTransactionUseCase.execute(
                params,
                type,
            );

            return helpers.created(transaction);
        } catch (error) {
            console.error(error);
            return helpers.serverError();
        }
    }
}
