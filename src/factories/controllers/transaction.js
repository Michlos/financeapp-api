import * as controllers from '../../controllers/index.js';
import * as usecases from '../../use-cases/index.js';
import * as repositories from '../../repositories/postgress/index.js';

export const makeCreateTransactionController = () => {
    const createTransacionController =
        new controllers.CreateTransactionController(
            new usecases.CreateTransactionUseCase(
                new repositories.PostgresCreateTransactionRepository(),
                new repositories.PostgresGetUserByIdRepository(),
            ),
        );
    return createTransacionController;
};
