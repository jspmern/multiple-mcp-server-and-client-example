import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

let mcpClient: Client;

/** connection for mcp client */
export async function connectStudentServer() {
    mcpClient = new Client({
        name: "hr-mcp-client",
        version: "1.0.0",
    });

    /**Transport for mcp client */
    const transport = new StreamableHTTPClientTransport(new URL("http://localhost:3001/mcp"), {
     requestInit: {
       headers: {
         Authorization:
           `Bearer ${process.env.JWT_TOKEN}`
       }
     }
   })

    await mcpClient.connect(transport);

    console.error("Connected student remote-student-mcp-server");
}  

export async function getStudentools() {
  const response = await mcpClient.listTools();

  return response.tools.map((tool: any) => ({
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.inputSchema
    }
  }));
}
/**this is for mcp tool execution */
export async function executeStudentTool(
  toolName: string,
  args: Record<string, any>
) {
    console.log("hello i am execute student tools",toolName,args)
  return await mcpClient.callTool({
    name: toolName,
    arguments: args,
  });
}