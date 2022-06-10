import { mongoose, Prop as Property, Ref } from "@typegoose/typegoose";
import {
  Field as GqlField,
  // InputType as GqlInput,
  ObjectType as GqlType,
} from "type-graphql";
import User from "../user/user.schema";

export type TitleTypes = "movie" | "serie" | "anime";

@GqlType()
export default class Title {
  @GqlField()
  readonly _id!: mongoose.Types.ObjectId;

  @GqlField()
  @Property({ required: true, unique: true })
  name!: string;

  @GqlField()
  @Property({ required: true })
  synopsis!: string;

  @GqlField()
  @Property({ required: true })
  type!: TitleTypes;

  @GqlField(type => [User])
  @Property({ ref: () => User })
  users!: Ref<User>[];

  @GqlField()
  createdAt!: Date;

  @GqlField()
  updatedAt!: Date;
}
