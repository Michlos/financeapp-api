import * as helpers from '../helpers/index.js';
import validator from 'validator';
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
                return helpers.reuiqredFieldIsMissingResponse(missingField);
            }

            //VALIDANDO ID DO USUÁRIO SE É VÁLIDO
            const userIdIsValid = helpers.checkIfIdIsValid(params.user_id);
            if (!userIdIsValid) {
                return helpers.invalidIdResponse();
            }

            //VALIDAR AMOUNT
            if (params.amount <= 0) {
                return helpers.badRequest({
                    message: 'The amount must be greater than 0.',
                });
            }
            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            );
            if (!amountIsValid) {
                return helpers.badRequest({
                    message: 'The amout must be a valid currency.',
                });
            }

            //VALIDANDO TYPE
            const type = params.type.trim().toUpperCase();
            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            );
            if (!typeIsValid) {
                return helpers.badRequest({
                    message: 'The type must be EARNING, EXPENSE or INVESTMENT.',
                });
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
