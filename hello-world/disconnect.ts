import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  const connectionId = event.requestContext.connectionId;

  try {
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: "ChatConnections",
        Key: { connectionId },
      })
    );
    return { statusCode: 200, body: "Disconnected" };
  } catch (error) {
    console.error("Error in disconnect:", error);
    return { statusCode: 500, body: "Failed to disconnect" };
  }
};