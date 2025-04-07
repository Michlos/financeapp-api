import bcrypt from 'bcrypt';
import { PostgresGetUserByEmailRepository } from '../repositories/postgress/get-user-by-email.js';
import { EmailAlreadyExistsError } from '../errors/user.js';
import { PostgressUpdateUserRepository } from '../repositories/postgress/update-user.js';

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        //ARMAZENANDO DADOS RECEBIDOS PARA ATUALIZAÇÃO POSTERIOR QUANDO NECESSÁRIO
        const user = {
            //OPERADOR DE ESPALHAMENTO (...)
            ...updateUserParams,
        };
        //1. SE O EMAIL ESTIVER SENDO ATUALIZADO VERIFICAR SE JÁ ESTÁ EM USO
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository();
            const userWithProviderEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                );
            if (userWithProviderEmail && userWithProviderEmail.id != userId) {
                throw new EmailAlreadyExistsError(updateUserParams.email);
            }
        }

        //2. SE A SENHA ESTIVER SENDO ATUALIZADA, CRIPTOGRAFAR
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );
            user.password = hashedPassword;
        }

        //3. CHAMAR O REPOSITORY PARA ATUALIZAR O USUÁRIO
        const postgressUpdateUserRepository =
            new PostgressUpdateUserRepository();

        //ESTÁ SENDO PASSADO A CONTANTE user QUE RECEBEU OS PARAMS
        const updatedUser = await postgressUpdateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
