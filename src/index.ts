import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';


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
        `,// Schema 
        resolvers: {
            Query: {
                hello: () => `Hey There! I have setup graphql server`,
                say: (_, { name }: { name: String }) => `Hey ${name}, How are you`
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