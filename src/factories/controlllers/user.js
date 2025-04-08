import * as controllers from '../../controllers/index.js';
import * as usecases from '../../use-cases/index.js';
import * as repositories from '../../repositories/postgress/index.js';

//GET USER BY ID
export const makeGetUserByIdController = () => {
    const getUserByIdController = new controllers.GetUserByIdController(
        new usecases.GetUserByIdUseCase(
            new repositories.PostgresGetUserByIdRepository(),
        ),
    );

    return getUserByIdController;
};

//CREATE USER
export const makeCreateUserController = () => {
    const createUserController = new controllers.CreteUserController(
        new usecases.CreateUserUseCase(
            new repositories.PostgresCreateUserRepository(),
            new repositories.PostgresGetUserByEmailRepository(),
        ),
    );
    return createUserController;
};

//UPDATE USER
export const makeUpdateUserController = () => {
    const updateUserController = new controllers.UpdateUserController(
        new usecases.UpdateUserUseCase(
            new repositories.PostgressUpdateUserRepository(),
            new repositories.PostgresGetUserByEmailRepository(),
        ),
    );
    return updateUserController;
};

//DELETE USER
export const makeDeleteUserController = () => {
    const deleteUserController = new controllers.DeleUserController(
        new usecases.DeleUserUseCase(
            new repositories.PostgresDeleteUserRepository(),
        ),
    );
    return deleteUserController;
};
