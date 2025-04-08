import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailAlreadyExistsError } from '../errors/user.js';

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
            throw new EmailAlreadyExistsError(createUserParams.email);
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

///CODE FEATUREDS COMMENTED BY DEV

//FUNCTION: INSERT USER IN DATABASE
//HOW IT WORKDER: USE ALL PROPERTIES OF THE USER OBJECT
//FEAUTRED: Use the parameter aggregator of properties from the PostgresCreateUserRepository
// class called createUserParams, which brings all the necessary parameters of the User object.
// This avoids the need to modify the classes that call the object's queries when there are changes
// to the User class. If there is an addition of properties to the User class, only the
// PostgresCreateUserRepository class and the User class will need to be modified, not the calling classes.
// const user = {
//     ID: userId,
//     // first_name: createUserParams.first_name,
//     // last_name: createUserParams.last_name,
//     // email: createUserParams.email,
//     password: hashedPassword,
// };
