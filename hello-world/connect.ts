import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const apiClient = new ApiGatewayManagementApiClient({
  endpoint: `https://${process.env.WEBSOCKET_API_ENDPOINT}`,
});

export const handler = async (event: any) => {
  const connectionId = event.requestContext.connectionId;

  try {
    
    await ddbDocClient.send(
      new PutCommand({
        TableName: "ChatConnections",
        Item: { connectionId },
      })
    );

    
    try {
      await apiClient.send(
        new PostToConnectionCommand({
          ConnectionId: connectionId,
          Data: Buffer.from(JSON.stringify({ connectionId })),
        })
      );
    } catch (sendError:any) {
      if (sendError.name === "GoneException") {
        console.warn(`Connection ${connectionId} gone before sending response`);
      } else {
        console.error("Failed to send connectionId:", sendError);
      }
      
    }

    return { statusCode: 200, body: "Connected" };
  } catch (error) {
    console.error("Error in connect:", error);
    return { statusCode: 500, body: "Failed to connect" };
  }
};