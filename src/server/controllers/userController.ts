import { check, validationResult } from 'express-validator';
import { Request, Response } from "express";
import userModel from "../models/userModel";
import { hashSync } from "bcrypt";
import _ from "underscore";
import crypto from 'crypto';
import {sendEmails} from "../helpers/sentEmails";

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
    console.log(hasConfirmEmail);
    
    let usua = new userModel({
      name: body.name,
      email: body.email,
      password:  body.password = hashSync(body.password, 10),
      role: body.role,
      //hashConfirmEmail: hashSync(hasConfirmEmail, 2);
      hashConfirmEmail: hasConfirmEmail
    });

    try {
       let userDb = await usua.save();

       const e = await sendEmails.sendConfirmEmail();

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
  public getHashConfirmEmail(id:string){
    let user = userModel.findById(id,(err, userDB:any)=>{
      if(err){
        return null;
      }

      return userDB.hashConfirmEmail;
    })
  }


}

export const userController = new UserController();
