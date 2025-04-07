import { badRequest, serverError, ok } from './helpers/http.js';
import validator from 'validator';
import { UpdateUserUseCase } from '../use-cases/update-user.js';
import { EmailAlreadyExistsError } from '../errors/user.js';
import {
    checkIfEmailIsValid,
    checkIfPassworIsValid,
    invalidEmailResponse,
    invalidIdResponse,
    invalidPasswordResponse,
} from './helpers/user.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const params = httpRequest.body;

            //1. VALIDAÇÕES DE CAMPOS NÃO PERMITIDS
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'CTRL: Some provided filed is not allowed.',
                });
            }

            //VALIDAR TAMANHO DA SENHA

            if (params.password) {
                const passwordIsValid = checkIfPassworIsValid(params.password);
                if (!passwordIsValid) {
                    return invalidPasswordResponse();
                }
            }

            //VALIDAR EMAIL

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email);
                if (!emailIsValid) {
                    return invalidEmailResponse();
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUser = await updateUserUseCase.execute(userId, params);
            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyExistsError) {
                return badRequest({ message: error.message });
            }

            console.error(error);
            return serverError({
                message: error.message,
            });
        }
    }
}
