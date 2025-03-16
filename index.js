import express from 'express';
import { PostgresHelper } from './src/db/posgres/helper.js';

const app = express();

app.get('/', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users;');

    res.send(JSON.stringify(results));
});

app.listen(3000, () => console.log('listeningn in port 3000'));
