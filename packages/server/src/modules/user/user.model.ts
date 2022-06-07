import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
    },
    profileColor: {
      type: String,
    },
    titles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Title",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export interface User extends Document {
  email: string;
  password: string;
  name: string;
  biography: string;
  profileColor: string;
  titles: [{ type: Schema.Types.ObjectId; ref: "Title" }];
}

const UserModel = model("User", UserSchema);
export default UserModel;
