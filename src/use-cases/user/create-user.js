import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as errors from '../../errors/index.js';

export class CreateUserUseCase {
    constructor(creteUserRepository, getUserByEmailRepository) {
        this.createUserRepository = creteUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }
    async execute(createUserParams) {
        //TODO: veificar se e-0mail já está em uso
        const userWithProviderEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email);
        if (userWithProviderEmail) {
            throw new errors.EmailAlreadyExistsError(createUserParams.email);
        }

        //gerar ID UUID do usuário
        const userId = uuidv4();

        //critpografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        //inserir o usuário no banco de dados

        const user = {
            ID: userId,
            ...createUserParams,
            password: hashedPassword,
        };

        //chamar o repository
        const createdUser = await this.createUserRepository.execute(user);
        return createdUser;
    }
}
