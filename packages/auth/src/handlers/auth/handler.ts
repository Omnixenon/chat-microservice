import "reflect-metadata"
import { Handler } from "aws-lambda"
import ServerlessApp from "@root/helpers/serverless-app"

const app = new ServerlessApp().getServer()

export const main: Handler = app.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
})
