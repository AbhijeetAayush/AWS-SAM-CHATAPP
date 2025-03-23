import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const apiClient = new ApiGatewayManagementApiClient({
  endpoint: `https://${process.env.WEBSOCKET_API_ENDPOINT}`,
});

export const handler = async (event: any) => {
  const connectionId = event.requestContext.connectionId;
  let body: { action?: string; data?: string };
  try {
    body = JSON.parse(event.body || "{}");
  } catch (error) {
    console.error("Invalid JSON:", error);
    return { statusCode: 400, body: "Invalid message format" };
  }
  const message = body.data || "No message provided";

  try {
    
    const { Items } = await ddbDocClient.send(new ScanCommand({ TableName: "ChatConnections" }));
    const connections = Items?.map((item) => item.connectionId as string) || [];

    if (connections.length === 0) {
      console.log("No connections found in ChatConnections");
      return { statusCode: 200, body: "No connections to send to" };
    }

    
    const broadcastPromises = connections.map(async (targetConnectionId: string) => {
      try {
        await apiClient.send(
          new PostToConnectionCommand({
            ConnectionId: targetConnectionId,
            Data: Buffer.from(JSON.stringify({ message: `User ${connectionId} says: ${message}` })),
          })
        );
        console.log(`Successfully sent to ${targetConnectionId}`);
      } catch (error: any) { 
        console.error(`Failed to send to ${targetConnectionId}:`, error);
        if (error.name === "GoneException") {
         
          try {
            await ddbDocClient.send(
              new DeleteCommand({
                TableName: "ChatConnections",
                Key: { connectionId: targetConnectionId },
              })
            );
            console.log(`Removed stale connection ${targetConnectionId}`);
          } catch (deleteError) {
            console.error(`Failed to remove ${targetConnectionId}:`, deleteError);
          }
        }
      }
    });

    await Promise.all(broadcastPromises);
    return { statusCode: 200, body: "Message sent" };
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return { statusCode: 500, body: "Failed to send message" };
  }
};