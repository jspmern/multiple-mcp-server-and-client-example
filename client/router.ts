
import { executeHrTool } from "./mcp/hrClient.js";
import { executeStudentTool } from "./mcp/studentClient.js";
import { calculator } from "./tools/calculator.js";
import { get_weather } from "./tools/weather.js";


export async function executeToolHandler(toolsName: string, args: any) {
    console.log("hello i am",toolsName,args)
    switch (toolsName) {
        case "calculator":
            //call calculator tool handler
            const calResult = calculator(args.expression);
            return calResult;
        case "get_weather":
            // call weather tool handler
            const searchResult = get_weather(`weather of ${args.city}`);
            return (await searchResult).results.map((item) => item.content).join("\n \n");
             case "get_all_emp_data":

            const result = await executeHrTool(toolsName,args) as { content: { text: string }[] };
            return result.content[0].text;
            case "create_student_deatils":

            const resultStu = await executeStudentTool(toolsName,args) as { content: { text: string }[] };
            return resultStu.content[0].text;
        default:
            throw new Error(`Tool ${toolsName} not found`);
    }

}
