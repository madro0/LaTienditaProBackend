import { Request, Response } from "express";
import userModel from "../models/userModel";
import { hashSync } from "bcrypt";
import _, { has } from "underscore";
import crypto from 'crypto';
import {sendEmails} from "../helpers/sentEmails";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';

class UserController {
  public async getUser(req: Request, res: Response) {
    let id = req.params.id;

    try {
      let user = await userModel
        .find()
        .where("_id")
        .equals(id)
        .where("state")
        .equals(true)
        .exec();

      if (user.length === 0) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "There is no active user with this id",
          },
        });
      }

      res.json({
        ok: true,
        user,
      });
    } catch (err) {
      //en caso de que la respuesta retorne un erro.reason: {} el id consultado no se encuentra activo o no existe

      return res.status(500).json({
        ok: false,
        err,
      });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 100;
    limit = Number(limit);

    try {
      let users = await userModel
        .find({ state: true }, "name email role img google")
        .skip(from)
        .limit(limit)
        .exec();

      userModel.countDocuments({ state: true }).exec((err, count) => {
        res.json({
          ok: true,
          users,
          totalUsers: count,
          from,
          limit,
        });
      });
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
  }

  public async addUser(req: Request, res: Response) {
    
    let body = req.body;

    let hasConfirmEmail = crypto.randomBytes(10).toString('hex');
    
    let user = new userModel({
      name: body.name,
      email: body.email,
      password:  body.password = hashSync(body.password, 10),
      role: body.role,
      //hashConfirmEmail: hashSync(hasConfirmEmail, 2);
      hashConfirmEmail: hasConfirmEmail
    });

    try {
      let userDb = await user.save();

      const urlJSON= {
        host: req.headers.host,
        email:userDb.email,
        hash:hasConfirmEmail
      }

      let a = sendEmails.sendConfirmEmail(urlJSON);
      //let a = await sendEmails.sendConfirmEmail(urlJSON);
        
      //  if(!a){
         

      //    return res.status(500).json({
      //     ok: false,
      //     err:{
      //       message: 'Error usuario creado pero mensaje de validacion de email no enviado'
      //     }
      //   });
      //  }

       res.json({
        ok: true,
        usuario: userDb,
      });

    } catch (err) {
      
      return res.status(500).json({
        ok: false,
        err,
      });
    } 
  }

  public async updateUser(req: Request, res: Response) {
    const id: string = req.params.id;

    let body = _.pick(req.body, ["name", "img", "role", "state"]);

    try {
      let user = await userModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });

      res.json({
        ok: true,
        user,
      });
      
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const id: string = req.params.id;

    let body = { state: false };

    try {
      let user = await userModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      res.json({
        ok: true,
        message: "User Delete_1",
        user: user,

        //================
        //NOTAS:
        //Delete_1 se cambio simplemente de estado
        //Delete_0 se elimina completamente la Db
        //================
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
  }
  
  public async updatePassword(req:any, res:Response){
    const body= req.body;
    const userLog= req.user;
    
    try {

      let userDB:any = await userModel.findById(userLog._id);

      userDB.password = hashSync(body.password, 10);
      let userUpdated = await userDB.save();
      
      if (!bcrypt.compareSync(body.password, userDB.password)) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Error contraseña incorrecta'
          }
        });
      }
      res.json({
        ok:true,
        message:'contraseña actualizada correctamente',
        userUpdated
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
  }

  public async forgetPassword(req:any, res:Response){
    let body = req.body;
    let host = req.headers.host;
    try {
      let userDB:any = await userModel.findOne({email:body.email});
      if(!userDB){
        res.status(400).json({
          ok:false,
          err:{
            message: 'Usuario no existente en la base de datos.'
          }
        });
      };

      let hash:string =await crypto.randomBytes(10).toString('hex');
      
      let token = jwt.sign({
        hash,
        email: body.email
      },env.SEED,{
        expiresIn: env.CADUCIDAD_TOKEN_RESTORE_PASS
      });

      userDB.restorePassword = hash;

      await userDB.save();

      sendEmails.sendRestorePasswordEmail(token, body.email, host);

      res.json({
        ok:true,
        message:'Mensaje para restaurar contraseña enviado correctamente',
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
  }

  public async restorePassword(req:any, res:Response){
    
    
    if(!req.JSONRestorePassword){
      return res.status(500).json({
        ok: false,
        err:{
          message:'Error token para restaurar contraseña invalido.'
        }
      });
    }
    
    let JSONRestorePassword = req.JSONRestorePassword;
    let body = req.body;
    
    try {
      
      let userDB:any = await userModel.findOne({email:JSONRestorePassword.email, restorePassword: JSONRestorePassword.hash});

      
      if(!userDB){
        return res.status(400).json({
          ok: false,
          err:{
            message:'Usuario no identificado.'
          }
        });
      }
     
      
      
      userDB.password = hashSync(body.password, 10);
      userDB.restorePassword= undefined;
      let userUpdated = await userDB.save();
      
      res.json({
        ok:true,
        message:'contraseña actualizada correctamente',
        userUpdated
      });
      
    } catch (err) {
      console.log(err);
      
      return res.status(500).json({
        ok: false,
        err,
      });
    }

  }
  


}

export const userController = new UserController();
