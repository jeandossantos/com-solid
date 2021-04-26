import MailTrapMailProvider from "../../providers/implementation/MailtrapMailProvider";
import PostgresUserRepository from "../../repositories/PostgresImplementation";
import CreateUserController from "./CreateUserController";
import CreateUserUseCase from "./CreateUserUseCase";

const postgresUserRepository = new PostgresUserRepository();
const mailTrapMailProvider = new MailTrapMailProvider();
const createUserUseCase = new CreateUserUseCase(
    postgresUserRepository,
    mailTrapMailProvider
    );

const createUserController = new CreateUserController(createUserUseCase);


export { createUserController, createUserUseCase }
