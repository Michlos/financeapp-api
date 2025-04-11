import * as errors from '../../errors/index.js';
import * as helpers from '../helpers/index.js';

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase;
    }

    async execute(httpRequest) {
        const { userId } = httpRequest.params;
        try {
            const idIsValid = helpers.checkIfIdIsValid(userId);
            if (!idIsValid) {
                return helpers.invalidIdResponse();
            }

            const balance = await this.getUserBalanceUseCase.execute(userId);

            return helpers.ok(balance);
        } catch (error) {
            if (error instanceof errors.UserNotFoundError) {
                return helpers.userNotFoundReponse(userId);
            }
            console.error(error);
            return helpers.serverError();
        }
    }
}
