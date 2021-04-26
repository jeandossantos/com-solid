import User from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import IUserRepository from "../../repositories/IUserRepository";
import ICreateUserDTO from "./CreateUserDTO";

export default class CreateUserUseCase {
    
    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error('user already exists.');
        }

        const user = new User(data);

        await this.userRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                email: data.email,
                name: data.name
            },
            from: {
                name: 'Nome da minha equipe',
                email: 'nodedaequipe@meuapp.com'
            },
            subject: 'Seja bem-vindo a plataforma',
            body: '<p>Você já pode fazer login na plataforma</p>'
        });
    }

    async list(email: string) {
        return await this.userRepository.findByEmail(email);
    }
}
