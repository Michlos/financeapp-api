import { PostgresHelper } from '../../../db/posgres/helper.js';
export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const query = `
            SELECT 
            	SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) as earnings,
	            SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expenses,
	            SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) as investments,
	            (
		            SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) -
		            SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) -
		            SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)
	            ) as balance
            FROM transactions
            WHERE user_id = $1
        `;
        const values = [userId];

        try {
            const balance = await PostgresHelper.query(query, values);
            //return balance.rows[0].balance;
            return balance[0];
        } catch (error) {
            console.error('Error getting user balance:', error);
            throw new Error('Database error');
        }
    }
}
