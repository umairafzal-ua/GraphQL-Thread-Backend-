import express from "express"
import createApolloGraphqlServer from "./graphql/index.js";
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import UserService from "./services/user.js";
// import { prismaClient } from "./lib/db.js";

async function main() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json())

    app.get("/", (req, res) => {
        res.json({ message: " Server is up and running " })
    })
    const gqlServer = await createApolloGraphqlServer();
    app.use('/graphql', cors(), expressMiddleware(gqlServer, {
        context: async ({ req }) => {
            const token = req.headers['token'];
            try {
                const user = UserService.decodeJWTToken(token as string);
                return { user }
            } catch (error) {
                return "JWT index.ts me error ha "
            }
        }
    }));

    app.listen(PORT, () => console.log(`Server is running on this PORT:${PORT}`))
}

main();