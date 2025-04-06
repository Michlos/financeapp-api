import { PostgresGetUserByIdRepository } from '../repositories/postgress/get-user-by-id.js';
export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRepository();

        const user = await getUserByIdRepository.execute(userId);

        return user;
    }
}
