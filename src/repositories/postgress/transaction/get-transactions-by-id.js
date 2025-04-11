import { PostgresHelper } from '../../../db/posgres/helper.js';

export class PostgresGetTransactionByIdRepository {
    async execute(transactionId) {
        const transactions = await PostgresHelper.query(
            'SELECT * FROM transactions WHERE id = $1',
            [transactionId],
        );
        return transactions;
    }
}
