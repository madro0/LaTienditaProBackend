import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, response } from 'express';
import env from "../config/env";
import userModel  from './../models/userModel';
import { any } from 'underscore';

class Auth {
  
  //=============================
  //Verificar Token
  //=============================
  public verifyToken(req: any, res: Response, next: NextFunction) {

    const token =  <string>req.get('Authorization');

    jwt.verify(token, env.SEED, (err, decode: any) => {
      if (err) {
        return res.status(401).json({
          err: {
            message: 'Autorization (token) invalid'
          }
        })
      }
      req.user = decode.user

      next();
    });

  }

  //=============================
  //Verificar Token
  //=============================
  
  public verifyRole(req: any,  res: Response, next: NextFunction) {
    let user = req.user;
    
    if (user.role != 'ADMIN_ROLE') {
      return res.status(400).json({
        err: {
          message: 'this account does not have administrator permissions'
        }
      });
    }
    next();
  }

  //=============================
  //Verificar Token para la restauracion de contraseña
  //=============================
  public verifyTokenRestorePassword(req:any, res:Response){
    let token = req.params.token;

    jwt.verify(token, env.SEED, (err:any)=>{
      if(err){
        return res.status(401).json({
          ok:false,
          err: {
            message: 'Autorization (token) invalid'
          }
        });
      }
      res.json({
        ok:true,
        message:'Token valido'
      });

    });

  }
  
  public decodeTokenRestorePassword(req:any, res:Response, next:NextFunction){
    let token = req.params.token;

    jwt.verify(token, env.SEED, (err:any, decoder:any)=>{
      if(err){
        return res.status(401).json({
          err: {
            message: 'Autorization (token) invalid'
          }
        });
      }

      let JSONRestorePassword={
        hash: decoder.hash,
        email: decoder.email
      }
      
      req.JSONRestorePassword = JSONRestorePassword;
      
      next();

    });
  }


}

export const auth = new Auth(); 