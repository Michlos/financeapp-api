import * as errors from '../../errors/index.js';
import * as helpers from '../helpers/index.js';

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase;
    }

    async execute(httpRequest) {
        const userId = httpRequest.params.userId;
        try {
            const idIsValid = helpers.checkIfIdIsValid(userId);
            if (!idIsValid) {
                return helpers.invalidIdResponse();
            }

            const balance = await this.getUserBalanceUseCase.execute(userId);

            return helpers.ok(balance);
        } catch (error) {
            console.error(error);
            if (error instanceof errors.UserNotFoundError) {
                return helpers.userNotFoundReponse(userId);
            }
            return helpers.serverError();
        }
    }
}
