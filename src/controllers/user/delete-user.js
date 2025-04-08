import * as helpers from '../helpers/index.js';

export class DeleUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isIsValid = helpers.checkIfIdIsValid(userId);
            if (!isIsValid) {
                return helpers.invalidIdResponse();
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId);

            if (!deletedUser) {
                return helpers.userNotFoundReponse();
            }

            return helpers.ok(deletedUser);
        } catch (error) {
            console.error(error);
            return helpers.serverError();
        }
    }
}
