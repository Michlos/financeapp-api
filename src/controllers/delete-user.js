import { DeleUserUseCase } from '../use-cases/index.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundReponse,
} from './helpers/index.js';

export class DeleUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isIsValid = checkIfIdIsValid(userId);
            if (!isIsValid) {
                return invalidIdResponse();
            }

            const deleteUserUseCase = new DeleUserUseCase();

            const deletedUser = await deleteUserUseCase.execute(userId);

            if (!deletedUser) {
                return userNotFoundReponse();
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
