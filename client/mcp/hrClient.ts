import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

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

/**this is for mcp tool execution */
export async function getEmployeeData(limit: string) {
  return await mcpClient.callTool({
    name: "get_all_emp_data",
    arguments: {
      limit,
    },
  });
}