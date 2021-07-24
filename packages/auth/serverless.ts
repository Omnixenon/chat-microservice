import "reflect-metadata"
import type { AWS } from "@serverless/typescript"
import auth from "./src/handlers/auth"

const serverlessConfiguration: AWS = {
  service: "auth",
  frameworkVersion: "2",
  plugins: [
    "serverless-plugin-typescript",
    "serverless-plugin-monorepo",
    "serverless-tscpaths",
    "serverless-offline",
  ],
  package: {
    individually: true,
  },
  custom: {
    "serverless-offline": {
      host: "0.0.0.0",
      httpPort: "7000",
      lambdaPort: "7002",
      useChildProcesses: true,
      noPrependStageInUrl: true,
    },
    tscpaths: {
      tscpathsPath: "../../node_modules/@baemingo/tscpaths-async",
    },
  },
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: { auth },
}

module.exports = serverlessConfiguration
