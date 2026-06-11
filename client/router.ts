import { calculator } from "./tools/calculator.ts";
import { get_weather } from "./tools/weather.ts";
 

export async function executeToolHandler(toolsName:string,args:any){
    //console.log("hello i am",toolsName,args)
    switch(toolsName){
        case "calculator":
            //call calculator tool handler
            const calResult=calculator(args.expression);
            return  calResult;
        case "get_weather":
            // call weather tool handler
            const searchResult= get_weather(`weather of ${args.city}`);
            return (await searchResult).results.map((item)=>item.content).join("\n \n");
        default:
            throw new Error(`Tool ${toolsName} not found`);
    }

}
