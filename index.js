import 'dotenv/config.js';
import express from 'express';
import * as user from './src/factories/controllers/user.js';
import * as transaction from './src/factories/controllers/transaction.js';

const app = express();

app.use(express.json());

// //GET USER BY ID
app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = user.makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.exeucte(request);
    response.status(statusCode).send(body);
});

// //CREATE USER
app.post('/api/users', async (request, response) => {
    const createUserController = user.makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(request);
    response.status(statusCode).json(body);
});

// //UPDATE USER
app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = user.makeUpdateUserController();
    const { statusCode, body } = await updateUserController.execute(request);
    response.status(statusCode).send(body);
});

// //DELETE USER
app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = user.makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(request);
    response.status(statusCode).send(body);
});

// //CREATE TRANSACTION
app.post('/api/transactions', async (request, response) => {
    const createTransactionController =
        transaction.makeCreateTransactionController();
    const { statusCode, body } =
        await createTransactionController.execute(request);
    response.status(statusCode).send(body);
});

// //GET TRANSACTIONS BY USER ID
app.get('/api/transactions', async (request, response) => {
    const getTransactionsByUserIdController =
        transaction.makeGetTransactionsByUserIdController();
    const { statusCode, body } =
        await getTransactionsByUserIdController.execute(request);
    response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`),
);
