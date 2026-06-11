
import OpenAI from "openai";
import readline from "readline";
import type { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";
import { executeToolHandler } from "./router.ts";
export const client = new OpenAI();
//this is the local tool definition, it should be consistent with the tool definition in server side
export const tools: NonNullable<ChatCompletionCreateParamsBase["tools"]> = [
  {
    type: "function",
    function: {
      name: "calculator",
      description: "Perform calculations",
      parameters: {
        type: "object",
        properties: {
          expression: {
            type: "string"
          }
        },
        required: ["expression"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get weather of city",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string"
          }
        },
        required: ["city"]
      }
    }
  }
];


/** This is the message with system prompt */
let messages: ChatCompletionCreateParamsBase["messages"] = [
  {
    role: 'system',
    content: "you are smart asssistance your name is UtsavBOt"
  }
];

/** this is for asking question from cli  */
async function ask(question: string) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise<string>((resolve) => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

export async function main() {
  while (true) {
    const userIn = (await ask("You: ")).trim();
    if (userIn.toLowerCase() === "bye") {
      console.log("Terminated.");
      process.exit(0);
    }
    

    /** inserting the user first messge form CLI */
    messages.push({ role: "user", content: userIn });

    try {
       while(true)
       {
         /**Invoking the LLM Modal */
      const response = await client.chat.completions.create({
        model: "gpt-5.5",
        messages,
        tools: tools
      });
        const aiResponseMessage = response.choices[0]?.message
      messages.push(aiResponseMessage!)
      
      const lastMessge=messages[messages.length-1]
      const toolcall = (lastMessge as any)?.tool_calls;
      if (toolcall && toolcall.length > 0) {
        for (let tool of toolcall) {
          //console.log('hello inside loop', tool)
          const isToolType = tool.type
          if (!(isToolType === "function")) return
          const toolResult = await executeToolHandler(tool.function.name, JSON.parse(tool.function.arguments))
          messages.push({
            role: 'tool',
            content: toolResult,
            tool_call_id: tool.id,
          })
        }
      } else {
         console.log(`Bot :${messages[messages.length-1]?.content}`)
         return 
      }
       }
     
      
    
      
     
          //console.log(JSON.stringify(messages,null,2))
      // console.log("toolcall", JSON.stringify(response.choices[0]?.message.tool_calls))
    } catch (err) {
      console.error("Error:", err);
    }
  }
}





