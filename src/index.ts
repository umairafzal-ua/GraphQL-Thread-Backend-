import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import { prismaClient } from "./lib/db.js";


async function main() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json())
    // Create Graph QL Server
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query{
            hello:String,
            say(name:String):String
        } 
        type Mutation{
            createUser(firstName:String! ,lastName:String! , email:String!, password:String!):Boolean    
        }
        `,// Schema 
        resolvers: {
            Query: {
                hello: () => `Hey There! I have setup graphql server`,
                say: (_, { name }: { name: String }) => `Hey ${name}, How are you`
            },
            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }:
                    { firstName: string, lastName: string, email: string, password: string }) => {
                    await prismaClient.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            password,
                            salt: "random_salt",
                        }
                    })
                    return true;
                }
            }
        }
    })

    //Start gql Server 
    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({ message: " Server is up and running " })
    })

    app.use('/graphql', cors(), expressMiddleware(gqlServer));


    app.listen(PORT, () => console.log(`Server is running on this PORT:${PORT}`))
}

main();