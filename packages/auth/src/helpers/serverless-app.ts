import "reflect-metadata"
import { ApolloServer } from "apollo-server-lambda"
import { DynamoDB } from "aws-sdk"
import { DataMapper } from "@aws/dynamodb-data-mapper"
import { buildSchemaSync } from "type-graphql"
import { DYNAMODB_LOCAL_ENDPOINT } from "@root/constants"
import AuthenticationController from "@root/handlers/auth/controllers"
class ServerlessApp {
  public server: ApolloServer
  public client: DynamoDB
  public mapper: DataMapper

  constructor() {
    this.client = new DynamoDB({ endpoint: DYNAMODB_LOCAL_ENDPOINT })
    this.mapper = new DataMapper({ client: this.client })

    this.initializeServer()
  }

  public getServer() {
    return this.server
  }

  public getMapper() {
    return this.mapper
  }

  public getDynamoDBClient() {
    return this.client
  }

  private initializeServer() {
    this.server = new ApolloServer({
      playground: true,
      introspection: true,
      schema: buildSchemaSync({
        resolvers: [AuthenticationController],
        nullableByDefault: true,
      }),
      context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
        mapper: this.mapper,
      }),
    })
  }
}

export default ServerlessApp
