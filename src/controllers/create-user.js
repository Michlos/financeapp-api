import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';

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
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `Missing param: ${field}`,
                        },
                    };
                }
            }

            //VALIDAR TAMANHO DA SENHA
            if (params.password.length < 6) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: 'Password must be at least 6 characters',
                    },
                };
            }

            //VALIDAR EMAIL

            const emailRegex = validator.isEmail(params.email);
            if (!emailRegex) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: 'Invalid email',
                    },
                };
            }

            //CHAMAR O USE CASE
            const creUserUseCase = new CreateUserUseCase();
            const createdUser = await creUserUseCase.execute(params);

            // RETORNAR A RESPOSTA PARA O USUARIO (STATUS CODE - 2##)

            return {
                statusCode: 201,
                body: createdUser,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: {
                    errorMessage: `Internal server error ${error.message}`,
                },
            };
        }
    }
}
