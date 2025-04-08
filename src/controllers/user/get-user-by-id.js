//import { GetUserByIdUseCase } from '../use-cases/index.js';
import * as helpers from '../helpers/index.js';

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }
    async exeucte(httpRequest) {
        try {
            const idIsValid = helpers.checkIfIdIsValid(
                httpRequest.params.userId,
            );

            if (!idIsValid) {
                return helpers.invalidIdResponse();
            }

            //const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            //VERIFICA ID EXISTENTE
            if (!user) {
                return helpers.userNotFoundReponse();
            }

            return helpers.ok(user);
        } catch (error) {
            console.error(error);
            return helpers.serverError({
                message: error.message,
            });
        }
    }
}
