import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/users', async (req, res) => {
    //const results = await PostgresHelper.query('SELECT * FROM users;');
    //res.send(JSON.stringify(results));
    console.log(req.body);
    console.log(req.headers);
    res.status(201).send('User created');
});

app.listen(process.env.PORT, () => console.log('listeningn in port 3000'));
