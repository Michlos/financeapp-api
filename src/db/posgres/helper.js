import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

//POOL FOR DB CONNECTION
export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    prot: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
});

//SEND QUERIES COMMANDS TO POOL CONNECTION
export const PostgresHelper = {
    query: async (query, params) => {
        const client = await pool.connect();

        const results = await client.query(query, params);

        await client.release();

        return results.rows;
    },
};
