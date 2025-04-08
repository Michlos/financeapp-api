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
                'id',
                'user_id',
                'name',
                'date',
                'amout',
                'type',
            ];
            for (const field in requiredFields) {
                if (!params[field] || params[field].trim().length == 0) {
                    return helpers.badRequest({
                        message: `Missing param: ${field}`,
                    });
                }
            }

            //VALIDANDO ID DO USUÁRIO SE É VÁLIDO
            const userIdIsValid = helpers.checkIfIdIsValid(params.user_id);
            if (!userIdIsValid) {
                return helpers.invalidIdResponse();
            }

            //VALIDAR AMOUT
            if (params.amout <= 0) {
                return helpers.badRequest({
                    message: 'The amout must be reater than 0.',
                });
            }
            const amoutIsValid = validator.isCurrency(params.amout.toString(), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: '.',
            });
            if (!amoutIsValid) {
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
                ...params,
                type,
            );

            return helpers.created(transaction);
        } catch (error) {
            console.error(error);
            return helpers.serverError();
        }
    }
}
