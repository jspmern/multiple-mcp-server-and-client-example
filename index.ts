// Root entry for the MCP example workspace

import "dotenv/config";
import { main } from "./client/openai.js";
import { connectHrServer} from "./client/mcp/hrClient.js";
import { connectStudentServer } from "./client/mcp/studentClient.js";
async function bootstrap() {
  await connectHrServer();
  await connectStudentServer()
  await main();
}

bootstrap();