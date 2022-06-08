import { getModelForClass } from "@typegoose/typegoose";
import Title from "./modules/title/title.schema";
import User from "./modules/user/user.schema";

export const UserModel = getModelForClass(User);
export const TitleModel = getModelForClass(Title);
