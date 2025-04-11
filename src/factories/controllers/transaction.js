import * as controllers from '../../controllers/index.js';
import * as usecases from '../../use-cases/index.js';
import * as repositories from '../../repositories/postgress/index.js';

export const makeCreateTransactionController = () => {
    const createTransactionController =
        new controllers.CreateTransactionController(
            new usecases.CreateTransactionUseCase(
                new repositories.PostgresCreateTransactionRepository(),
                new repositories.PostgresGetUserByIdRepository(),
            ),
        );
    return createTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsByUserIdController =
        new controllers.GetTransactionsByUserIdController(
            new usecases.GetTransactionsByUserIdUseCase(
                new repositories.PostgresGetTransactionsByUserIdRepository(),
                new repositories.PostgresGetUserByIdRepository(),
            ),
        );

    return getTransactionsByUserIdController;
};

export const makeUpdateTransactionController = () => {
    const updateTransactionController =
        new controllers.UpdateTransactionController(
            new usecases.UpdateTransactionUseCase(
                new repositories.PostgresUpdateTransactionRepository(),
            ),
        );

    return updateTransactionController;
};

export const makeDeleteTransactionController = () => {
    const deleteTransactionController =
        new controllers.DeleteTransactionController(
            new usecases.DeleteTransactionUseCase(
                new repositories.PostgresDeleteTransactionRepository(),
            ),
        );

    return deleteTransactionController;
};
// export const makeCreateTransactionController = () => {
//     const createTransactionRepository =
//         new repositories.PostgresCreateTransactionRepository();

//     const getUserByIdRepository =
//         new repositories.PostgresGetUserByIdRepository();

//     const createTransactionUseCase = new usecases.CreateTransactionUseCase(
//         createTransactionRepository,
//         getUserByIdRepository,
//     );

//     const createTransactionController =
//         new controllers.CreateTransactionController(createTransactionUseCase);

//     return createTransactionController;
// };
