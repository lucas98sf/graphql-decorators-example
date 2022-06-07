import Router from "@koa/router";
import Koa from "koa";
import { graphqlHTTP } from "koa-graphql";
import { GraphiQLOptions } from "koa-graphql/renderGraphiQL";
import { config } from "./config";
import schema from "./schema";

const app = new Koa();
const router = new Router();

const graphiQLOptions: GraphiQLOptions = {
  headerEditorEnabled: true,
  shouldPersistHeaders: true,
  editorTheme: "dracula",
};

router.all(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: config.NODE_ENV !== "production" ? graphiQLOptions : false,
    pretty: true,
  }),
);

app.use(router.routes()).use(router.allowedMethods());

export default app;
