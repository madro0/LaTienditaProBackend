import bcrypt from 'bcrypt';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import env from '../config/env';


class LoginController {

  public async login(req: Request, res: Response) {
    let body = req.body;
    
    try {
      let userDB:any = await userModel.findOne({ email: body.email });

      if (!userDB) {

        return res.status(400).json({
          ok: false,
          err: {
            message: 'Wrong (email) or password '
          }
        });
      }

      if (!bcrypt.compareSync(body.password, userDB.password)) {

        return res.status(400).json({
            ok: false,
            err: {
                message: 'Wrong email or (password)'
            }
        });
      }

      if(!userDB.active){
        return res.status(400).json({
          ok: false,
          err:{
            message: 'Confirme email',
            email: userDB.email
          }
        });
      }

      let token = jwt.sign({
        user: userDB
      }, env.SEED, {
        expiresIn: env.CADUCIDAD_TOKEN
      });

      res.json({
        ok: true,
        user: userDB,
        token
      });

    } catch (err) {

      return res.status(500).json({
        ok: false,
        err
      });

    }
    
  }
      

      

      

    

  // public login(req: Request, res: Response) {
  //   let body = req.body;
    

  //   userModel.findOne({ email: body.email }, (err, userDB) => {
  //     if (err) {
  //       return res.status(500).json({
  //         ok: false,
  //         err
  //       });
  //     }

  //     if (!userDB) {
  //       return res.status(400).json({
  //         ok: false,
  //         err: {
  //           message: 'Wrong (email) or password '
  //         }
  //       });
  //     }

  //     if (!bcrypt.compareSync(body.password, userDB.password)) {
  //       return res.status(400).json({
  //           ok: false,
  //           err: {
  //               message: 'Wrong email or (password)'
  //           }
  //       });
  //     }

  //     let token = jwt.sign({
  //       user: userDB
  //     }, env.SEED, {
  //       expiresIn: env.CADUCIDAD_TOKEN
  //     });

  //     res.json({
  //       ok: true,
  //       user: userDB,
  //       token
  //     });

  //   })
  // }
}

export const loginController = new LoginController(); 