const queries = {};

const mutation = {
    createUser: async (_: any, { }: {}) => {
        return "Randomid"
    }
};

export const resolvers = { queries, mutation };