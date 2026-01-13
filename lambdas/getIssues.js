import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    // 1. Get query parameters (default to "Beginner")
    // API Gateway passes params in event.queryStringParameters
    const params = event.queryStringParameters || {};
    const category = params.category || "Beginner"; 
    const techStack = params.techStack;

    const TABLE_NAME = "IssuePilotIssues";

    try {
        // 2. Build DynamoDB Query
        const commandInput = {
            TableName: TABLE_NAME,
            KeyConditionExpression: "category = :cat",
            ExpressionAttributeValues: {
                ":cat": category
            }
        };

        // 3. Optional Filter: Tech Stack
        if (techStack) {
            commandInput.FilterExpression = "contains(techStack, :tech) OR contains(title, :tech) OR contains(body, :tech)";
            commandInput.ExpressionAttributeValues[":tech"] = techStack;
        }

        const command = new QueryCommand(commandInput);
        const result = await docClient.send(command);

        // 4. Return Results
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify({
                count: result.Count,
                items: result.Items
            })
        };

    } catch (error) {
        console.error("Query Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch issues" })
        };
    }
};
