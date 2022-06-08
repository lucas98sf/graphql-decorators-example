import { Prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import User from "../user/user.schema";

export enum TitleTypesEnum {
  "movie",
  "serie",
  "anime",
}

@ObjectType()
export default class Title extends TimeStamps {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  sinopse: string;

  @Field()
  @Prop({ required: true })
  type: TitleTypesEnum;

  @Field((type) => [User], { defaultValue: [] })
  @Prop({ ref: () => User })
  users: Ref<User>[];
}
