import { PostgresHelper } from '../../db/posgres/helper.js';
import { PostgresGetUserByEmailRepository } from './index.js';

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        //create user in postgress

        const postgressGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();
        const userWitthEmail = await postgressGetUserByEmailRepository.execute(
            createUserParams.email,
        );
        if (userWitthEmail) {
            throw new Error('User Email already exists');
        }

        await PostgresHelper.query(
            'INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUserParams.ID,
                createUserParams.first_name,
                createUserParams.last_name,
                createUserParams.email,
                createUserParams.password,
            ],
        );

        const createdUser = await PostgresHelper.query(
            'SELECT * FROM users WHERE ID = $1',
            [createUserParams.ID],
        );

        return createdUser[0];
    }
}
