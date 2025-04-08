import bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from '../errors/user.js';

export class UpdateUserUseCase {
    constructor(updateUserRepository, getUserByEmailRepository) {
        this.updateUserRepository = updateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }
    async execute(userId, updateUserParams) {
        //ARMAZENANDO DADOS RECEBIDOS PARA ATUALIZAÇÃO POSTERIOR QUANDO NECESSÁRIO
        const user = {
            //OPERADOR DE ESPALHAMENTO (...)
            ...updateUserParams,
        };
        //1. SE O EMAIL ESTIVER SENDO ATUALIZADO VERIFICAR SE JÁ ESTÁ EM USO
        if (updateUserParams.email) {
            const userWithProviderEmail =
                await this.getUserByEmailRepository.execute(
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

        //ESTÁ SENDO PASSADO A CONTANTE user QUE RECEBEU OS PARAMS
        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
