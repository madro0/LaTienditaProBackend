import mongoose from 'mongoose';
class Config{
  //=======================================
  //PUERTO!
  //=======================================
  public PORT = process.env.PORT || '3000';

  //=======================================
  //URI Database!
  //=======================================
  public URI = 'mongodb+srv://madro:K8mwWFepr8Gmc73s@cluster0.yugug.mongodb.net/latiendita'
  //'mongodb://localhost:27017/Lt';

  //=======================================
  //SEED de autenticación (jwt) 
  //=======================================
  public SEED = process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

  //=======================================
  //Vencimiento de token
  //=======================================
  public CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN = '48h';

  //=======================================
  //conecion base de datos
  //=======================================
  public dbConeccion = async()=>{
    try{
      await mongoose.connect(this.URI,{
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