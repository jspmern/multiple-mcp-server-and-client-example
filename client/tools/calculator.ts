// placeholder: client/tools/calculator.ts
export interface CalculatorSuccess {
    success: true;
    result: unknown;
}

export interface CalculatorError {
    success: false;
    error: string;
}

export type CalculatorResponse = CalculatorSuccess | CalculatorError;

export function calculator(expression: string): CalculatorResponse {
    try {
        const result: unknown = Function(`"use strict"; return (${expression})`)();

        return {
            success: true,
            result,
        };
    } catch (error) {
        return {
            success: false,
            error: "Invalid expression",
        };
    }
}