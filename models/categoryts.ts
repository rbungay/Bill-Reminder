import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const categorySchema: Schema<ICategory> = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
});

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
);

export { Category, categorySchema };
