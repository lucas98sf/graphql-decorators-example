import { createServer } from "@graphql-yoga/node";
import { ObjectId } from "mongodb";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { config } from "./config";
import { connectToDatabase } from "./db";
import { ObjectIdScalar } from "./scalars/object-id.scalar";

async function bootstrap() {
  if (!config.MONGO_URI)
    throw new Error("Please specify a MongoDB URI in .env file");

  await connectToDatabase(config.MONGO_URI);

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.resolver.ts"],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    // globalMiddlewares: [TypegooseMiddleware],
  });

  const server = createServer({
    schema,
    port: config.PORT,
    maskedErrors: false,
    logging: true,
  });

  await server.start();
}

bootstrap().catch((err) => console.error(err));
