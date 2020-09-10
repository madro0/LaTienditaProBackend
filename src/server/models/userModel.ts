import mongoose, { Schema, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';

export interface User extends mongoose.Document {
  
  name: string,
  email: string,
  password: string,
  img: string,
  role: string,
  state: boolean,
  google: boolean,
  activate:boolean,
  hashConfirmEmail: string,
  hash: string,

};

let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
}

const UserSchema = new Schema({

  name: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    unique:true,
    required: [true, 'El email es necesario']
  },
  password: {
    type: String,
    required:[true, 'La contrasena es necesaria']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
  active:{
    type: Boolean,
    default: false,
  },
  hashConfirmEmail: {
    type: String,
    required: false
  },
  restorePassword:{
    type:String,
    required:false,
  }

});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  delete userObject.hashConfirmEmail;

  return userObject;
}

UserSchema.plugin( uniquevalidator, { message: '{PATH} debe ser unico' });


export default model<User>('User', UserSchema);
