import { EmailAlreadyExistsError } from '../../errors/user.js';
import * as helpers from '../helpers/index.js';

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isIdValid = helpers.checkIfIdIsValid(userId);

            if (!isIdValid) {
                return helpers.invalidIdResponse();
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
                return helpers.badRequest({
                    message: 'CTRL: Some provided filed is not allowed.',
                });
            }

            //VALIDAR TAMANHO DA SENHA

            if (params.password) {
                const passwordIsValid = helpers.checkIfPassworIsValid(
                    params.password,
                );
                if (!passwordIsValid) {
                    return helpers.invalidPasswordResponse();
                }
            }

            //VALIDAR EMAIL

            if (params.email) {
                const emailIsValid = helpers.checkIfEmailIsValid(params.email);
                if (!emailIsValid) {
                    return helpers.invalidEmailResponse();
                }
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            );
            return helpers.ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyExistsError) {
                return helpers.badRequest({ message: error.message });
            }

            console.error(error);
            return helpers.serverError({
                message: error.message,
            });
        }
    }
}
