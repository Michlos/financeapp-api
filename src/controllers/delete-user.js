import { DeleUserUseCase } from '../use-cases/index.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
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

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
