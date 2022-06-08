import { DocumentType } from "@typegoose/typegoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserModel } from "../../models";
import User, { CreateUserInput } from "./user.schema";

// @Service()
@Resolver((of) => User)
export default class UserResolver {
  // constructor(@Inject() private readonly userService: UserService) {}

  @Query((returns) => [User])
  async users(): Promise<DocumentType<User>[]> {
    const users = await UserModel.find({});
    return users;
  }

  @Mutation((returns) => User)
  async createUser(
    @Arg("data") data: CreateUserInput, // : Promise<DocumentType<User>>
  ) {
    // return await this.userService.createUser();
  }
}
