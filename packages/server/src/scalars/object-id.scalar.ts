import { mongoose } from "@typegoose/typegoose";
import { GraphQLScalarType, Kind } from "graphql";

export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo object id scalar type",
  serialize(value: unknown): string {
    if (!(value instanceof mongoose.Types.ObjectId)) {
      throw new Error("ObjectIdScalar can only serialize ObjectId values");
    }
    return value.toHexString();
  },
  parseValue(value: unknown): mongoose.Types.ObjectId {
    if (typeof value !== "string") {
      throw new Error("ObjectIdScalar can only parse string values");
    }
    return new mongoose.Types.ObjectId(value);
  },
  parseLiteral(ast): mongoose.Types.ObjectId {
    if (ast.kind !== Kind.STRING) {
      throw new Error("ObjectIdScalar can only parse string values");
    }
    return new mongoose.Types.ObjectId(ast.value);
  },
});

export const ObjectIdScalarMap = {
  type: mongoose.Types.ObjectId,
  scalar: ObjectIdScalar,
};
