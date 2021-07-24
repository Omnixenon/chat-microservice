import "reflect-metadata"

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: "ANY",
        path: "graphql",
        cors: true,
      },
    },
  ],
}
