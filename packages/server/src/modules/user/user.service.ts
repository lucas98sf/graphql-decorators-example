import { DocumentType } from "@typegoose/typegoose";
import { UserModel } from "../../models";
import User, { CreateUserInput } from "./user.schema";

export const createUser = async (
  data: CreateUserInput,
): Promise<DocumentType<User>> => {
  const user = await UserModel.create(data);

  return user;
};
