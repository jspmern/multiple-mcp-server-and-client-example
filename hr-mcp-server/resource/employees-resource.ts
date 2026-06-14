import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { employees } from "../data/employees.js";

export function registerEmployeeResources(
  server: McpServer
) {
  server.registerResource(
    "employee-directory",
    "employee://all",
    {
      title: "Employee Directory",
      description: "Returns all employee records"
    },
    async (uri) => {
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(
              employees,
              null,
              2
            )
          }
        ]
      };
    }
  );
}