import { model, Schema } from "mongoose";

const TitleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sinopse: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["movie", "serie", "anime"],
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export interface Title extends Document {
  name: string;
  sinopse: string;
  type: string;
  users: [{ type: Schema.Types.ObjectId; ref: "User" }];
}

const TitleModel = model("Title", TitleSchema);
export default TitleModel;
