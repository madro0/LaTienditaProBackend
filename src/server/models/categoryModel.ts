import mongoose, { Schema, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';

export interface Category extends mongoose.Document{
  name: string,
  description: string,
  user: Schema.Types.ObjectId,
  state: boolean
};

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'The name is necessary']
  },
  description: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  state: {
    type: Boolean,
    default:true
  }
});

CategorySchema.plugin( uniquevalidator, { message: '{PATH} debe ser unico' });

export default model<Category>('Category', CategorySchema);
