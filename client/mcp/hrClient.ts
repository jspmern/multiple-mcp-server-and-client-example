import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";

let mcpClient: Client;

/** connection for mcp client */
export async function connectHrServer() {
    mcpClient = new Client({
        name: "hr-mcp-client",
        version: "1.0.0",
    });

    /**Transport for mcp client */
    const transport = new StdioClientTransport({
        command: "node",
        args: ["dist/hr-mcp-server/index.js"],
    });

    await mcpClient.connect(transport);

    console.error("Connected to HR MCP Server");
}  

export async function getHrTools() {
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
export async function getEmployeeData(limit: string) {
    return await mcpClient.callTool({
        name: "get_all_emp_data",
        arguments: {
            limit,
        },
    });
}