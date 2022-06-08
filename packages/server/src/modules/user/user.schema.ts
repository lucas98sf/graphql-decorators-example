import { Prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { IsEmail, IsHexColor, Length, MaxLength } from "class-validator";
import { ObjectId } from "mongodb";
import { Field, InputType, ObjectType } from "type-graphql";
import Title from "../title/title.schema";

@ObjectType()
export default class User extends TimeStamps {
  @Field()
  readonly _id: ObjectId;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  @Field()
  username: string;

  @MaxLength(300)
  @Field({ nullable: true })
  biography?: string;

  @Prop({ default: "#ffffff" })
  @Field()
  profileColor: string;

  @Prop({ ref: () => Title })
  @Field((type) => [Title])
  titles: Ref<Title>[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserInput implements Partial<User> {
  @IsEmail()
  @Field()
  email: string;

  @Length(8, 30)
  @Field()
  password: string;

  @Length(2, 20)
  @Field()
  username: string;
}

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field({ nullable: true })
  biography?: string;

  @IsHexColor()
  @Field({ nullable: true })
  profileColor?: string;
}
