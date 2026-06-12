// placeholder: hr-mcp-server/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { employees } from "./data/employees.js";

/** this is the server instance */
const server = new McpServer({
  name: "'hr-mcp-server",
  version: "1.0.0",
});

/**Adding the tool here later i can move to seprate file */
server.registerTool(
  "get_all_emp_data",
  {
    description: "this tool is getting all the employees data",
    inputSchema: {
      limit: z
        .string()
        .describe("this is will show how many employee data will return"),
    },
  },
  async ({limit}) => {
    const count =
      typeof limit === "string"
        ? parseInt(limit, 10) || 2
        : typeof limit === "number"
        ? limit
        : 2;
    const data = employees.slice(0, count);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data),
        },
      ],
    };
  },
);

/** code for running mcp in local for testing right now check in claude but later we will do by our own client(local) */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});