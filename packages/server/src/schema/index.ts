import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types";

const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname, "./schema.graphql"),
  },
});

export default schema;
