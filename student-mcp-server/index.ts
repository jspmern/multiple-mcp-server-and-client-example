// placeholder: student-mcp-server/index.ts
import dotenv from 'dotenv'
import { connectDB } from './src/database/conn'
dotenv.config()
import express from 'express'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { createServer } from './src/tools/studetnTools'
import { verifyToken } from './src/auth/jwt'
const app = express()
const PORT = process.env.PORT || 3001

app.get("/", (req, res) => {
    res.status(200).send({ message: "health check " })
})
app.post(
    "/mcp",
    async (req, res) => {
        console.log("** ",req, req.header)

        try {

            const authHeader =
                req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    message: "Token Missing"
                });
            }

            const token =
                authHeader.replace(
                    "Bearer ",
                    ""
                );

            const user =
                verifyToken(token);

            console.log(
                "Authenticated User:",
                user
            );

            const transport =
                new StreamableHTTPServerTransport({
                    sessionIdGenerator: undefined,
                });

            const server =
                createServer(user);

            await server.connect(
                transport
            );

            await transport.handleRequest(
                req,
                res,
                req.body
            );

        } catch (error) {

            return res.status(401).json({
                message: "Invalid Token"
            });

        }

    }
);
app.listen(PORT, async () => {
    await connectDB()
    console.log(`server is connect http://localhost:${PORT}`)
})
