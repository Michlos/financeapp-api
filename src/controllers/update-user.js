import { badRequest, serverError, ok } from './helpers.js';
import validator from 'validator';
import { UpdateUserUseCase } from '../use-cases/update-user.js';
import { EmailAlreadyExistsError } from '../errors/user.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return badRequest({
                    message: 'CTRL: The provided ID is not valid.',
                });
            }

            const updateUserParams = httpRequest.body;

            //1. VALIDAÇÕES DE CAMPOS NÃO PERMITIDS
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'CTRL: Some provided filed is not allowed.',
                });
            }

            //VALIDAR TAMANHO DA SENHA

            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length < 6;
                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'CTRL: Password must be at least 6 characters',
                    });
                }
            }

            //VALIDAR EMAIL

            if (updateUserParams.email) {
                const emailRegex = validator.isEmail(updateUserParams.email);
                if (!emailRegex) {
                    return badRequest({
                        message:
                            'CTRL: Invalid email. Please provide a valid email',
                    });
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            );
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
