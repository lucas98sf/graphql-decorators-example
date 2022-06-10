import { mongoose, prop as Property, Ref } from "@typegoose/typegoose";
import { IsEmail, IsHexColor, Length, MaxLength } from "class-validator";
import {
  Field as GqlField,
  InputType as GqlInput,
  ObjectType as GqlType,
} from "type-graphql";
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

@GqlInput()
export class CreateUserInput implements Partial<User> {
  @GqlField()
  @IsEmail()
  email!: string;

  @GqlField()
  @Length(8, 30)
  password!: string;

  @GqlField()
  @Length(2, 20)
  username!: string;
}

@GqlInput()
export class UpdateUserInput extends CreateUserInput {
  @GqlField({ nullable: true })
  @MaxLength(300)
  biography?: string;

  @GqlField({ nullable: true })
  @IsHexColor()
  profileColor?: string;
}
