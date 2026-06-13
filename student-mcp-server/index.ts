// placeholder: student-mcp-server/index.ts
import dotenv from 'dotenv'
import { connectDB } from './src/database/conn'
dotenv.config()
import express from 'express'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { createServer } from './src/tools/studetnTools'
const app=express()
const PORT=process.env.PORT || 3001

app.get("/",(req,res)=>{
    res.status(200).send({message:"health check "})
})
app.post(
    "/mcp",
    async (req, res) => {
        /** this is for http protocall */
        const transport =
            new StreamableHTTPServerTransport({
                sessionIdGenerator: undefined,
            });

        const server = createServer();

        await server.connect(transport);

        await transport.handleRequest(
            req,
            res,
            req.body
        );
    }
);
app.listen(PORT, async () => {
    await connectDB()
    console.log(`server is connect http://localhost:${PORT}`)
})
