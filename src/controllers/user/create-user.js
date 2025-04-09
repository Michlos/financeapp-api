import { EmailAlreadyExistsError } from '../../errors/user.js';
import * as helpers from '../helpers/index.js';

export class CreteUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            //VALIDAR A REQUISIÇÃO (CAMPOS OBRIGATÓRIOS, TAMANHO DE SENHA E EMAIL)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];
            const { ok: requiredFieldsWereProvided, missingField } =
                helpers.validateRequiredFields(params, requiredFields);
            if (!requiredFieldsWereProvided) {
                return helpers.badRequest({
                    message: `The field ${missingField} is required.`,
                });
            }

            //VALIDAR TAMANHO DA SENHA]
            const passwordIsValid = helpers.checkIfPassworIsValid(
                params.password,
            );
            if (!passwordIsValid) {
                return helpers.invalidPasswordResponse();
            }

            //VALIDAR EMAIL
            const emailIsValid = helpers.checkIfEmailIsValid(params.email);
            if (!emailIsValid) {
                return helpers.invalidEmailResponse();
            }

            //CHAMAR O USE CASE
            const createdUser = await this.createUserUseCase.execute(params);
            return helpers.created(createdUser);
        } catch (error) {
            //verificando se erro vem do tratamento de erros customizados
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
