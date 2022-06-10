import { Service } from "typedi";
import { UserModel } from "../../models";
import { CreateUserInput } from "./user.schema";

@Service()
export default class UserService {
  async getAll() {
    const users = await UserModel.find({});

    return users;
  }

  async createOne(data: CreateUserInput) {
    const user = await UserModel.create(data);

    return user;
  }
}
