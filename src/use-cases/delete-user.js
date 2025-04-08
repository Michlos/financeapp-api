import { PostgresDeleteUserRepository } from '../repositories/postgress/index.js';
export class DeleUserUseCase {
    async execute(userId) {
        const deleteUserRepository = new PostgresDeleteUserRepository();

        const deletedUser = await deleteUserRepository.execute(userId);

        return deletedUser;
    }
}
