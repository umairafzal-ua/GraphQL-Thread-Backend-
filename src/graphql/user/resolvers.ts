import type { CreateUserPayload } from "../../services/user.js";
import UserService from "../../services/user.js";

const queries = {
    getUserToken: async (_: any, payload: { email: string, password: string }) => {
        const token = await UserService.getUserToken(payload)
        return token
    },
    getCurrentLoggedInUser: async (_: any, paramenters: any, context: any) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = UserService.getUserById(id)
            return user;
        }
        throw new Error("I dont know who are you ");
    }
};

const mutation = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload)
        return res.id
    }
};

export const resolvers = { queries, mutation };