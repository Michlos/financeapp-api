import { CreateUserUseCase } from '../use-cases/create-user.js';
import { badRequest, created, serverError } from './helpers/http.js';
import { EmailAlreadyExistsError } from '../errors/user.js';
import {
    checkIfEmailIsValid,
    checkIfPassworIsValid,
    invalidEmailResponse,
    invalidPasswordResponse,
} from './helpers/user.js';

export class CreteUserController {
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

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `Missing param: ${field}`,
                    });
                }
            }

            //VALIDAR TAMANHO DA SENHA]
            const passwordIsValid = checkIfPassworIsValid(params.password);
            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }

            //VALIDAR EMAIL
            const emailIsValid = checkIfEmailIsValid(params.email);
            if (!emailIsValid) {
                return invalidEmailResponse();
            }

            //CHAMAR O USE CASE
            const creUserUseCase = new CreateUserUseCase();
            const createdUser = await creUserUseCase.execute(params);
            return created(createdUser);
        } catch (error) {
            //verificando se erro vem do tratamento de erros customizados
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
