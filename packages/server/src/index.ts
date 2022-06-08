import Router from "@koa/router";
import Koa from "koa";
import { graphqlHTTP } from "koa-graphql";
import { GraphiQLOptions } from "koa-graphql/renderGraphiQL";
import { ObjectId } from "mongodb";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { config } from "./config";
import { connectToDatabase } from "./db";
import { ObjectIdScalar } from "./scalars/object-id.scalar";

const app = new Koa();
const router = new Router();

const graphiQLOptions: GraphiQLOptions = {
  headerEditorEnabled: true,
  shouldPersistHeaders: true,
  editorTheme: "dracula",
};

async function bootstrap() {
  if (!config.MONGO_URI)
    throw new Error("Please specify a MongoDB URI in .env file");

  await connectToDatabase(config.MONGO_URI);

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.resolver.ts"],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });

  router.all(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: config.NODE_ENV !== "production" ? graphiQLOptions : false,
      pretty: true,
    }),
  );

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`);
  });
}

bootstrap().catch((err) => console.error(err));
