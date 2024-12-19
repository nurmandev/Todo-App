import { UserEntity } from "../entities";
interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}
interface FindUserInput {
    userId?: string;
    email?: string;
}
export declare const createUser: (data: CreateUserInput) => Promise<UserEntity | null>;
export declare const getOneUser: (data: FindUserInput) => Promise<UserEntity | null>;
export {};
