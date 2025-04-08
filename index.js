import 'dotenv/config.js';
import express from 'express';
import * as controllers from './src/controllers/index.js';
import * as usecases from './src/use-cases/index.js';
import * as repositories from './src/repositories/postgress/index.js';

const app = express();

app.use(express.json());

// //GET USER BY ID
app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new controllers.GetUserByIdController(
        new usecases.GetUserByIdUseCase(
            new repositories.PostgresGetUserByIdRepository(),
        ),
    );
    const { statusCode, body } = await getUserByIdController.exeucte(request);

    response.status(statusCode).send(body);
});

//DEFINE THE ROUTES TO API, REQUESTS AND RESPONSES
app.post('/api/users', async (request, response) => {
    const createUserController = new controllers.CreteUserController(
        new usecases.CreateUserUseCase(
            new repositories.PostgresCreateUserRepository(),
            new repositories.PostgresGetUserByEmailRepository(),
        ),
    );

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new controllers.UpdateUserController(
        new usecases.UpdateUserUseCase(
            new repositories.PostgressUpdateUserRepository(),
            new repositories.PostgresGetUserByEmailRepository(),
        ),
    );
    const { statusCode, body } = await updateUserController.execute(request);
    response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = new controllers.DeleUserController(
        new usecases.DeleUserUseCase(
            new repositories.PostgresDeleteUserRepository(),
        ),
    );
    const { statusCode, body } = await deleteUserController.execute(request);
    response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`),
);
