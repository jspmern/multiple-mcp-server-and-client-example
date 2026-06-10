import { tavily } from "@tavily/core"


async function searchHandler(){
 const tvly = tavily({ apiKey: "tvly-YOUR_API_KEY" });
const response = await tvly.search("Who is Leo Messi?");
console.log(response);
}
