import mongoose from 'mongoose';
import env from '../config/env';
class Config{
  
  //=======================================
  //conecion base de datos
  //=======================================
  public dbConeccion = async()=>{
    try{
      await mongoose.connect(env.URI,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      console.log('DB Online');
    }catch(err){
      console.log(err);
      throw new Error ('error a la hora de iniciar db');
    }
  }
  
}

export const config = new Config();