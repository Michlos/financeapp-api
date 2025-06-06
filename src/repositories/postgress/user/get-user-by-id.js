import { PostgresHelper } from '../../../db/posgres/helper.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await PostgresHelper.query(
            'SELECT * FROM users WHERE ID = $1',
            [userId],
        );

        return user[0];
    }
}
