import { Request, Response } from "express";
import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
    
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body;

        try {
            await this.createUserUseCase.execute({
                name,
                email,
                password
            });

            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            });
        }
    }

    async list(request: Request, response: Response) {
        try {
            const user = await this.createUserUseCase.list(request.body.email);
            return response.json(user);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            });
        }
    }
}
