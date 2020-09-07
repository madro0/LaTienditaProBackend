import mongoose, { Schema, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';

export interface Product extends mongoose.Document{
  name: string,
  description: string,
  img: string,
  category: Schema.Types.ObjectId,
  provider: Schema.Types.ObjectId,
  purchasePrice: Number,
  unitPrice: number,
  wholesalePrice: number,
  iva: number,
  user:Schema.Types.ObjectId,
  creationDate: Date,
  modificationDate: Date,
  active: boolean,
};

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is necessary']
  },
  description: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La category es necesaria']
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'Provider',
    required: [true, 'El provider es necesario']
  },
  purchasePrice: {
    type: Number,
    required: [true, 'EL purchasePrice es necesario']
  },
  unitPrice: {
    type: Number,
    required: [true, 'El unitPrice es necesario']
  },
  wholesalePrice: {
    type: Number,
    required: false
  },
  iva: {
    type: Number,
    default: 0.0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required:[true, 'El user es necesario']
  },
  creationDate: {
    type: Date,
    default: new Date()
  },
  modificationDate: {
    type: Date,
    default: new Date()
  },
  active: {
    type: Boolean,
    default: true
  }
});

ProductSchema.plugin(uniquevalidator, { message: '{PATH} must be unique' });
export default model<Product>('Product', ProductSchema);