import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PostgresCreateUserRepository } from '../repositories/postgress/create-user.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        //TODO: veificar se e-0mail já está em uso
        // Check if email is already in use - by copilot

        // const existingUser = await userRepository.findByEmail(
        //     createUserParams.email,
        // );
        // if (existingUser) {
        //     throw new Error('Email is already in use');
        // }

        //gerar ID UUID do usuário
        const userId = uuidv4();

        //critpografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        //inserir o usuário no banco de dados

        const user = {
            ID: userId,
            ...createUserParams,
            // first_name: createUserParams.first_name,
            // last_name: createUserParams.last_name,
            // email: createUserParams.email,
            password: hashedPassword,
        };

        //chamar o repository
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(user);
        return createdUser;
    }
}
