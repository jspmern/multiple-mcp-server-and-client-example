// placeholder: client/tools/calculator.ts
 

export type CalculatorResponse = string

export function calculator(expression: string): CalculatorResponse {
    try {
        const result: unknown = Function(`"use strict"; return (${expression})`)();
         return `result of this expression is :${result}`
    } catch (error) {
        return "Invalid expression"
           
    }
}