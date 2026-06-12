// Root entry for the MCP example workspace

import "dotenv/config";
import { main } from "./client/openai.js";
import { connectHrServer } from "./client/mcp/hrClient.js";
async function bootstrap() {
  await connectHrServer();

  await main();
}

bootstrap();