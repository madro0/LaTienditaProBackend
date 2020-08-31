import mongoose, { Schema, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';

export interface Provider extends mongoose.Document {
  name: String,
  nit: String,
  cel: String,
  phone: String,
  web: String,
  address: string,
  active:Boolean
}

const ProviderSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  nit: {
    type: String,
    required: false
  },
  cel: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  web: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    default:true,
    required: false
  }
});

export default model<Provider>('Provider', ProviderSchema);