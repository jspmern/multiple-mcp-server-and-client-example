// placeholder: hr-mcp-server/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { employees } from "./data/employees.js";
import { registerEmployeeResources }
from "./resource/employees-resource.js";

/** this is the server instance */
const server = new McpServer({
  name: "'hr-mcp-server",
  version: "1.0.0",
});
registerEmployeeResources(server);
/**Adding the tool here later i can move to seprate file */
server.registerTool(
  "get_all_emp_data",
  {
    description: "this tool that give information about he will eligible for tax or not ?",
    inputSchema: {
        id:z .number()
        .describe("this is the id of employeee"),
    },
  },
  async ({id}) => {
    const data = employees.find((item) => item.id == id);
    let str = "";
    if (typeof data?.salary === "number" && data.salary > 6000) {
      str = str + `user ${JSON.stringify(data)} is eligible for tax`;
    } else {
      str = str + `user ${JSON.stringify(data)} is not eligible for tax`;
    }

    return {
      content: [
        {
          type: "text",
          text: str,
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