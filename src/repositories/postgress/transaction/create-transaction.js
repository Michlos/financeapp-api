import { PostgresHelper } from '../../../db/posgres/helper.js';
export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const createdTransaction = await PostgresHelper.query(
            `
            INSERT INTO transacionts (id, user_id, name, date, amout, type) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
            `,
            [
                createTransactionParams.id,
                createTransactionParams.user_id,
                createTransactionParams.name,
                createTransactionParams.date,
                createTransactionParams.amout,
                createTransactionParams.type,
            ],
        );

        return createdTransaction[0];
    }
}
