// import dotenv from 'dotenv';
// import express from 'express';

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.post('/api/users', async (req, res) => {
//     //const results = await PostgresHelper.query('SELECT * FROM users;');
//     //res.send(JSON.stringify(results));
//     console.log(req.body);
//     console.log(req.headers);
//     res.status(201).send('User created');
// });

// app.listen(process.env.PORT, () => console.log('listeningn in port 3000'));
import 'dotenv/config.js';
import express from 'express';
import { CreteUserController } from './src/controllers/create-user.js';

const app = express();

app.use(express.json());

//DEFINE THE ROUTES TO API, REQUESTS AND RESPONSES
app.post('/api/users', async (request, response) => {
    const createUserController = new CreteUserController();

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).json(body);
});

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`),
);
