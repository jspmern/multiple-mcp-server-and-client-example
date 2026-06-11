
import OpenAI from "openai";
import type { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";
export const client = new OpenAI();
//this is the local tool definition, it should be consistent with the tool definition in server side
export const tools:ChatCompletionCreateParamsBase["tools"] = [
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
 const messages: ChatCompletionCreateParamsBase["messages"] = [
    {
        role:'system',
        content:"you are smart asssistance your name is UtsavBOt"
    }
 ];
const response = await client.chat.completions.create({
  model: "gpt-5.5",
  messages,
  tools:tools

});


