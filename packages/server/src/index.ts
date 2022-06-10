import "reflect-metadata";
import path from "path";
import { config } from "./configs";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { Container as container } from "typedi";
import { connectToDatabase } from "./db";
import { ObjectIdScalarMap } from "./scalars/object-id.scalar";
import maskErrorMessages from "./utils/maskErrorMessages";

async function bootstrap() {
  if (!config.MONGO_URI)
    throw new Error("Please specify a MongoDB URI in .env file");

  await connectToDatabase(config.MONGO_URI);

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.resolver.ts"],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    scalarsMap: [ObjectIdScalarMap],
    container,
    // globalMiddlewares: [TypegooseMiddleware],
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    formatError: err => maskErrorMessages(err),
  });

  const { url } = await server.listen(config.PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap().catch(err => console.error(err));
