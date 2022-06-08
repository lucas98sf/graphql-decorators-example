import { prop as Property, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { IsEmail, IsHexColor, MaxLength } from "class-validator";
import { ObjectId } from "mongodb";
import {
  Field as GqlField,
  InputType as GqlInput,
  ObjectType as GqlType,
} from "type-graphql";
import Title from "../title/title.schema";

@GqlType()
export default class User extends TimeStamps {
  @GqlField()
  readonly _id: ObjectId;

  @Property({ required: true, unique: true })
  @GqlField()
  email: string;

  @Property({ required: true })
  password: string;

  @Property({ required: true })
  @GqlField()
  username: string;

  @MaxLength(300)
  @Property()
  @GqlField({ nullable: true })
  biography?: string;

  @Property({ default: "#ffffff" })
  @GqlField()
  profileColor: string;

  @Property({ ref: () => Title })
  @GqlField((type) => [Title])
  titles: Ref<Title>[];

  @GqlField()
  createdAt: Date;

  @GqlField()
  updatedAt: Date;
}

@GqlInput()
export class CreateUserInput implements Partial<User> {
  @IsEmail()
  @GqlField()
  email: string;

  // @Length(8, 30)
  @GqlField()
  password: string;

  // @Length(2, 20)
  @GqlField()
  username: string;
}

@GqlInput()
export class UpdateUserInput extends CreateUserInput {
  @GqlField({ nullable: true })
  biography?: string;

  @IsHexColor()
  @GqlField({ nullable: true })
  profileColor?: string;
}
