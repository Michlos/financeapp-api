import { GetUserByIdUseCase } from '../use-cases/index.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    notFound,
} from './helpers/index.js';

export class GetUserByIdController {
    async exeucte(httpRequest) {
        try {
            //const { userId } = httpRequest.params.userId;
            //validações
            const idIsValid = checkIfIdIsValid(httpRequest.params.userId);
            if (!idIsValid) {
                return invalidIdResponse();
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            //VERIFICA ID EXISTENTE
            if (!user) {
                return notFound({
                    message: 'UserID not found',
                });
            }

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
