import * as helpers from '../helpers/index.js';
import * as errors from '../../errors/index.js';

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }
    async execute(httprequest) {
        try {
            const userId = httprequest.query.userId;
            //VERIFRICAR USER ID PASADO COMO PARAMAETRO
            if (!userId) {
                return helpers.requiredFieldIsMissingResponse('userId');
            }

            //VERIIFCASXE SE USERID É VÁLIDO
            const userIdIsValid = helpers.checkIfIdIsValid(userId);
            if (!userIdIsValid) {
                return helpers.invalidIdResponse();
            }
            //CHAMAWR USECASE
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                });
            //RETORNAR RESPOSTA HTTP
            return helpers.ok(transactions);
        } catch (error) {
            console.error(error);
            if (error instanceof errors.UserNotFoundError) {
                return helpers.userNotFoundReponse();
            }
            return helpers.serverError();
        }
    }
}
