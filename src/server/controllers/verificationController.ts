import { hashSync } from "bcrypt";
import { Response, Request } from "express";
import userModel from "../models/userModel";

class VerificationController {
    
  public async confirmEmail(req: Request, res: Response) {
    const email = req.params.email;
    const hash = req.params.hash;
    
    let json200:any ={
      ok: true,
      email,
      message: "Email confirmado",
    };

    let jsonError:any={
      ok: false,
      message: "Error al confirmar email",
    }
    
    try {
      const userDB:any = await userModel.findOne({ email });

      if(userDB.active && userDB.hashConfirmEmail.equals(undefined)){
        json200.email = userDB.email;
        return res.json(
          json200
        );
      }

      //if (userDB.hashConfirmEmail != hashSync(hash, 2)) {
      if (userDB.hashConfirmEmail != hash) {
        return res.status(500).json(
          jsonError
        );
      }

      userDB.hashConfirmEmail = undefined;
      userDB.active = true;
      
      await userDB.save();

      json200.email = userDB.email;
      return res.json(
        json200
      );

    } catch (err) {
      return res.status(500).json(
        jsonError
      );
    }
  }

  public async ressendActivation(req:Request, res:Response){
    
    const email = req.body.email;

    try {
      const userDB:any = await userModel.findOne({ email });

      if(!userDB){
        return res.status(404).json({
          ok:false,
          err:{
            message:'Este correo no se encuentra registrado aun'
          }
        });
      }
      
      if(userDB.active && userDB.hashConfirmEmail.equals(undefined)){
        
        return res.status(400).json({
          ok:false,
          err:{
            message:'Este correo ya se encuentra activado'
          }
        });

      }

      //tengo que llamar la funcion que envia el correo
      res.json({
        ok:true,
        email: userDB.email,
        message:'Email de verificacion de correo electronico reenviado satisfactoriamente.'
      });
      

    } catch (err) {
      res.status(400).json({
        ok:false,
        err:{
          message:'Error al reenviar email de confirmacion de correo electronico.'
        }
      });
    }

  }
}

export const verificationController = new VerificationController();
