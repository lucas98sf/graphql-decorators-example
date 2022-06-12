import { IsEmail, IsHexColor, Length, MaxLength } from "class-validator";
import { Field as GqlField, InputType as GqlInput } from "type-graphql";
import User from "./user.schema";

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
