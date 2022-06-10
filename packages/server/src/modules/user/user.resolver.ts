import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import User, { CreateUserInput } from "./user.schema";
import UserService from "./user.service";

@Service()
@Resolver(of => User)
export default class UserResolver {
  constructor(@Inject() private readonly userService: UserService) {}

  @Query(returns => [User])
  async users() {
    return this.userService.getAll();
  }

  @Mutation(returns => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    return await this.userService.createOne(data);
  }
}
