AI Office Assistant — Project Overview

This repository is an example implementation of a small Model Context Protocol (MCP) ecosystem that demonstrates how a client process can discover and call tools and read resources exposed by separate MCP servers. The goal of this README is to explain the concepts used, describe the project's file layout and runtime flow, and provide quick start steps so anyone can understand and run the project.

**Quick Start**
- **Install dependencies:**

```bash
npm install
```

- **Build and run (common dev flows):**

```bash
# Build subpackages that need compiling (example: student server)
cd student-mcp-server && npm run build && cd ..

# Run the root client (TypeScript) for development
npx ts-node index.ts

# Or run compiled JS (if you compiled the repo to dist/)
node dist/index.js
```

**Key Concepts**
- **Model Context Protocol (MCP):** A lightweight pattern that lets services (MCP servers) register typed tools (callable functions) and readable resources (URIs pointing to content). Clients connect to MCP servers, discover available tools and resources, and call them remotely.
- **Tools vs Resources:** Tools are typed actions with structured inputs and outputs (used to perform operations). Resources are read-only content items accessible by URI (used to provide documents, references, or data blobs).
- **Function-calling (OpenAI-style):** The chat model is supplied with a list of tool schemas (name, description, JSON schema for inputs). The model may return a structured tool call; the client executes the tool and returns results back to the model.
- **Transport / Client:** Clients talk to MCP servers using a transport layer (the example uses a stdio-based transport used to spawn server processes and communicate via JSON). Authentication (JWT) is demonstrated in the student server example.

**High-level Runtime Flow**
1. Root entry (index) initializes MCP clients for available servers and then starts the chat client.
2. Each MCP client lists tools and resources exposed by its server and converts tool metadata into OpenAI-style function definitions used by the chat model.
3. The chat client calls the model with the message history and the combined tool list (local + remote). If the model chooses to call a tool, the client executes it (locally or via MCP) and appends the result to the conversation.
4. Resources (URIs like `employee://all`) are read by calling the MCP server's readResource API and the result is fed back to the model.

**Project Layout and File Map (what to open first)**
- `index.ts` : Root entry. Connects to MCP servers and starts the chat loop in the client code.
- `package.json`, `tsconfig.json` : Repo-level config and scripts.

client/
- `client/openai.ts` : The chat client and CLI. Maintains the message history, defines local tools (calculator, weather, resource reader), and runs the main chat loop that sends messages to the model and handles tool calls. Read this to see how function-calling results are handled and executed.
- `client/router.ts` : Router that receives a tool call (tool name + args) and dispatches to local handlers or to MCP clients.
- `client/mcp/hrClient.ts` : MCP client helper for the HR server. Connects to the HR MCP server, lists tools/resources, maps tools into OpenAI function schemas, and provides helper functions to call tools and read resources.
- `client/mcp/jiraClient.ts` : Similar to hrClient but for the Jira MCP server.
- `client/mcp/studentClient.ts` : Client helpers for the student MCP server (JWT-auth example).
- `client/tools/calculator.ts` : A simple local tool implementation for arithmetic used as a local example.
- `client/tools/weather.ts` : A toy local tool that returns weather info (example of a simple tool return value).

hr-mcp-server/
- `hr-mcp-server/index.ts` : HR MCP server bootstrap. Sets up the MCP server and registers tools and resources.
- `hr-mcp-server/data/employees.ts` : Small in-memory dataset of employees used by the HR server resources.
- `hr-mcp-server/prompt/employees-prompt.ts` : Example prompt templates used to format resources or tool responses.
- `hr-mcp-server/resource/employees-resource.ts` : Registers a resource URI (e.g., `employee://all`) that returns employee data as a JSON/text blob. This shows how the MCP resource API is used.
- `hr-mcp-server/tool/employee-tools.ts` : Tool implementations for HR domain operations (search employees, get details, etc.). These are registered as callable tools with input schemas.

jira-mcp-server/
- `jira-mcp-server/index.ts` : Minimal example MCP server that exposes Jira-like tickets listed in `jira-mcp-server/data/tickets.ts`.

student-mcp-server/
- `student-mcp-server/index.ts` : Example MCP server illustrating authentication using JWT tokens.
- `student-mcp-server/src/tools/studetnTools.ts` : Registers tools that check user roles and perform actions conditionally.
- `student-mcp-server/src/services/jwtService.ts` : Simple JWT service used by the student server to generate tokens for demo/testing.
- `student-mcp-server/src/models` and `database` : Minimal models and DB connection stubs to demonstrate how a domain service might be structured.

**Important Code Walkthroughs (open these to learn flow)**
- Conversation loop and tools: see `client/openai.ts`. Focus on:
  - How `localTools` is defined and converted to function-call schemas.
  - How the chat response is inspected for `tool_calls` and how the `router` is used to execute the tool.
- MCP client helpers: see `client/mcp/hrClient.ts`. Focus on:
  - `connectHrServer()` to see how the client spawns/attaches to the HR server.
  - Converting tool metadata to the model-facing schema.
- Resource registration: see `hr-mcp-server/resource/employees-resource.ts`. This is the canonical example of registering `employee://` URIs and returning content.

**How to extend the project (examples)**
- Add a new MCP server: implement an `index.ts` that creates a `McpServer`, register tools with clear input JSON schemas and resources via `registerResource(uri, { ... })`, then expose it via the chosen transport (stdio in examples).
- Add typed validation: use a runtime validation library (zod, ajv) on the server side to validate tool inputs.
- Add auth checks: attach user context to calls and gate tools by role, as illustrated in the student server.

**Security & operational notes**
- Keep API keys and secrets out of the repo; use environment variables. The student server contains a demo JWT service — swap it for a real auth provider when needed.
- Validate and sanitize all tool inputs on server side to avoid code-injection or logic errors.

**FAQ / Troubleshooting**
- Q: The client can't find a server's tools. A: Ensure the server process is running or that `connectXServer()` spawns the server correctly. If the transport is stdio and expects compiled JS, compile the server (ts -> js) into the expected path.
- Q: Model returns invalid JSON for tool inputs. A: Robustly parse and validate the JSON before calling the tool; consider re-prompting the model or returning a schema error.

**Next steps I can take for you**
- Add inline code comments to `client/openai.ts` and `client/mcp/hrClient.ts` to explain key blocks. 
- Add npm scripts to build and run the HR server and client in a single command.
- Run a quick smoke test (start servers and run the CLI) and capture the output.

If you want, tell me which of the above you'd like next (inline code comments, run scripts, or a smoke test), and I will implement it.
