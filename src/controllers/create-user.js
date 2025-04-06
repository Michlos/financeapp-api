import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';
import { badRequest, created, serverError } from './helpers.js';

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

            //VALIDAR TAMANHO DA SENHA
            if (params.password.length < 6) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                });
            }

            //VALIDAR EMAIL

            const emailRegex = validator.isEmail(params.email);
            if (!emailRegex) {
                return badRequest({
                    message: 'Invalid email. Please provide a valid email',
                });
            }

            //CHAMAR O USE CASE
            const creUserUseCase = new CreateUserUseCase();
            const createdUser = await creUserUseCase.execute(params);

            // RETORNAR A RESPOSTA PARA O USUARIO (STATUS CODE - 2##)

            // return created({
            //     message: 'User created successfully',
            //     user: {
            //         id: createdUser.id,
            //         first_name: createdUser.first_name,
            //         last_name: createdUser.last_name,
            //         email: createdUser.email,
            //     },
            // });
            return created(createdUser);
        } catch (error) {
            return serverError({
                message: error.message,
            });
        }
    }
}
