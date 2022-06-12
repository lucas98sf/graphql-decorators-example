import { mongoose, prop as Property, Ref } from "@typegoose/typegoose";
import { Field as GqlField, ObjectType as GqlType } from "type-graphql";
import Title from "../title/title.schema";

@GqlType()
export default class User {
  @GqlField()
  readonly _id!: mongoose.Types.ObjectId;

  @GqlField()
  @Property({ required: true, unique: true })
  email!: string;

  @Property({ required: true })
  password!: string;

  @GqlField()
  @Property({ required: true })
  username!: string;

  @GqlField({ nullable: true })
  @Property({ default: null })
  biography?: string;

  @GqlField()
  @Property({ default: "#ffffff" })
  profileColor!: string;

  @GqlField(type => [Title])
  @Property({ ref: () => Title })
  titles!: Ref<Title>[];

  @GqlField()
  createdAt!: Date;

  @GqlField()
  updatedAt!: Date;
}
