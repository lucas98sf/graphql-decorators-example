import { getModelForClass } from "@typegoose/typegoose";
import Title from "./modules/title/title.schema";
import User from "./modules/user/user.schema";

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
export const TitleModel = getModelForClass(Title, {
  schemaOptions: { timestamps: true },
});
