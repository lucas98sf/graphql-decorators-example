import { DocumentType } from "@typegoose/typegoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserModel } from "../../models";
import User, { CreateUserInput } from "./user.schema";

@Resolver(User)
export default class UserResolver {
  @Query((returns) => [User])
  async users(): Promise<DocumentType<User>[]> {
    const users = await UserModel.find({});
    return users;
  }

  @Mutation((returns) => User)
  async createUser(
    @Arg("data") data: CreateUserInput,
  ): Promise<DocumentType<User>> {
    console.log(data);
    const user = await UserModel.create(data);

    console.log(user);
    return user;
  }
}
