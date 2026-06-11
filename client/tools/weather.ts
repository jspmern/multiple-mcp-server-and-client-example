import { tavily } from "@tavily/core"
import dotenv from "dotenv";

// dotenv.config({path:"../../.env"});

export async function searchHandler(query:string) {
const key=process.env.TVLY_API_KEY;
if(!key) throw new Error("TVLY_API_KEY is not defined in environment variables");
 const tvly = tavily({apiKey:key});
const response = await tvly.search(query);
return response;
}
 