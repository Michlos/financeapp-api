//import { serverError, notFound } from './helpers.js';
import { ok, serverError, badRequest } from './helpers.js';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import validator from 'validator';

export class GetUserByIdController {
    async exeucte(httpRequest) {
        try {
            //const { userId } = httpRequest.params.userId;
            //validações
            const isIdValid = validator.isUUID(httpRequest.params.userId);
            if (!isIdValid) {
                return badRequest({
                    message: 'Invalid userId. Please provide a valid userId',
                });
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            return ok(user);
        } catch (error) {
            console.error(error);
            return serverError({
                message: error.message,
            });
        }
    }
    // async handle(request, response) {
    //     try {
    //         const { userId } = request.params.userId;

    //         const getUserByIdUseCase = new GetUserByIdUseCase();
    //         const user = await getUserByIdUseCase.execute(userId);

    //         return response.status(200).json(user);
    //     } catch (error) {
    //         if (error.code === 404) {
    //             return response.status(404).json(notFound().body);
    //         }
    //         return serverError(response, error);
    //     }
    // }
}
