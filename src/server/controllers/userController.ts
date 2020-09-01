import { check, validationResult } from 'express-validator';
import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt, { hashSync } from "bcrypt";
import _ from "underscore";
import { User } from "../models/userModel";

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
        .find({ state: true }, "name email role google")
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
    // check(req.body.email, 'err err pipipi').isEmail()
    
    
    let erros = validationResult(req);
    //console.log(erros.mapped());

    if(!erros.isEmpty()){
        return res.status(400). json({
            ok: false,
            err: erros.mapped()
        });
    }
    
    let body = req.body;
    if (!body.password) {
      return res.status(500).json({
        ok: false,
        err: {
          errors: {
            password:{
              properties: {
                message: "El capo password es necesario",
                path: "password",
                value: body.password,
              }
            }
          }
        }
      });
    } else {
      body.password = hashSync(body.password, 10);
    }

    let usua = new userModel({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });

    try {
       let userDb= await usua.save();

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
  public Test(req: Request, res: Response) {
    const id: String = req.params.id;

    res.json({
      ok: true,
      id,
      message: "Todo esta bien",
    });
  }
}

export const userController = new UserController();
