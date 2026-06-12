// Root entry for the MCP example workspace
import 'dotenv/config';
import { main } from './client/openai.js';

console.log('ai-office-assistant-mcp-example started');
console.log('Available servers: student-mcp-server, hr-mcp-server, jira-mcp-server');
main();
