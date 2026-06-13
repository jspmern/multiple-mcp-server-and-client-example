import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import { Student } from "../models/studentModel";
function canCreateStudent(
    role: string
) {

    return [
        "ADMIN",
        "TEACHER"
    ].includes(role);
}
export function createServer(user: {
    userId: string;
    email: string;
    role: string;
}) {
    // Create server instance
    const server = new McpServer({
        name: "student-mcp-server",
        version: "1.0.0",
    });

    server.registerTool(
        "create_student_deatils",
        {
            description: "create information of student",
            inputSchema: {
                id: z.string(),
                name: z.string(),
                email: z.string(),
                marks: z.number(),
                department: z.string()

            },
        },
        async ({ id = new Date().getMilliseconds(), name, email, marks, department }) => {
            const studentData = new Student({ id, name, email, marks, department })
            if (
                !canCreateStudent(
                    user.role
                )
            ) {

                throw new Error(
                    "Forbidden"
                );

            }
            const newStudent = await studentData.save();
            console.log('inserted student in db', newStudent)
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(
                            newStudent
                        ),
                    },
                ],
            }

        }


    );

    return server;
}