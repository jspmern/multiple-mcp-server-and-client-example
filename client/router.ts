import { calculator } from "./tools/calculator.ts";
import { searchHandler } from "./tools/weather.ts";

async function executeToolHandler(toolsName:string,args:any){
    switch(toolsName){
        case "calculator":
            //call calculator tool handler
            const calResult=calculator(args.expression);
            return  calResult;
        case "weather":
            // call weather tool handler
            const searchResult= searchHandler(args.query);
            return searchResult;
        default:
            throw new Error(`Tool ${toolsName} not found`);
    }

}
