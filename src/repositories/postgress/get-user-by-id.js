import { PostgresHelper } from '../../db/posgres/helper.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await PostgresHelper.query(
            'SELECT * FROM users WHERE ID = $1',
            [userId],
        );

        return user[0];
    }
    //   constructor (postgresClient) {
    //     this.postgresClient = postgresClient
    //   }

    //   async getUserById (userId) {
    //     const query = 'SELECT * FROM users WHERE id = $1'
    //     const values = [userId]

    //     try {
    //       const result = await this.postgresClient.query(query, values)
    //       return result.rows[0]
    //     } catch (error) {
    //       throw new Error('Error retrieving user by ID')
    //     }
    //   }
}
