import { ApolloServer } from '@apollo/server';
import { User } from './user/index.js';
async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
        ${User.typeDefs}
        type Query{
            ${User.queries}
        } 
        type Mutation{
            ${User.mutations}
        }
        `,// Schema 
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutation
            }
        }
    })

    //Start gql Server 
    await gqlServer.start();

    return gqlServer;

}
export default createApolloGraphqlServer;