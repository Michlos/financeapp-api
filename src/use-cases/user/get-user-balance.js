import * as errors from '../../errors/index.js';

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
        this.getUserBalanceRepository = getUserBalanceRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }
    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId);
        if (!user) {
            console.log('error in usecase');
            throw new errors.UserNotFoundError(userId);
        }

        const balance = await this.getUserBalanceRepository.execute(userId);

        return balance;
    }
}
