// Root entry for the MCP example workspace
import 'dotenv/config';
 import { searchHandler } from './client/tools/weather.ts';
console.log('ai-office-assistant-mcp-example started');
console.log('Available servers: student-mcp-server, hr-mcp-server, jira-mcp-server');
searchHandler()
