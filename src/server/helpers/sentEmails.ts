import nodemailer from 'nodemailer';
import path from "path";
import env from "../config/env";

var hbs = require('nodemailer-handlebars');



class SendEmails {

  public configEmailServer ={
    host: env.HOST_SEND_EMAILS,
    port: env.PORT_SEND_EMAILS,
    secure:false,
    auth:{
      user: env.USER_SEND_EMAILS,
      pass: env.PASS_SEND_EMAILS,
    }
  };
  public templatesConfig = {
    viewEngine: {

      layoutsDir: path.resolve(__dirname,'../templates/'),
      partialsDir: path.resolve(__dirname,'../templates/'),
      extName: '.hbs',
      defaultLayout: '',
    },
    viewPath: path.resolve(__dirname,'../templates/'),
    extName: '.hbs',
  }

  constructor(){}

  public async sendConfirmEmail(urlJSON:any) {

    try {
      let transporter =await  nodemailer.createTransport(
        this.configEmailServer
      );

      transporter.use('compile', hbs(
        this.templatesConfig
      ));

      const url = `http://${urlJSON.host}/api/verification/confirm/${urlJSON.email}/${urlJSON.hash}`
      let mailOptions= {
        from: env.FROM_SEND_MAILS,
        to: urlJSON.email, // list of receivers
        subject: "Confirm Email", // Subject line
        // text: "Para confirmar su email click aqui",
        //  html: "<b>Hello world?</b>", // html body
        template: 'confirmEmail',
        context:{
           url
        }
      };

      await transporter.sendMail(mailOptions);
      return true;
      
    } catch (err) {
      console.log(err);
      return false;
    }

  }
  public async sendRestorePasswordEmail(token:any, email:string, host:string){

    try {
      let transporter =await  nodemailer.createTransport(
        this.configEmailServer
      );

      transporter.use('compile', hbs(
        this.templatesConfig
      ));

      const url = `http://${host}/api/login/restore/${token}`
      let mailOptions= {
        from: env.FROM_SEND_MAILS,
        to: email, // list of receivers
        subject: "Restablecer contraseña", // Subject line
        // text: "Para confirmar su email click aqui",
        //  html: "<b>Hello world?</b>", // html body
        template: 'restorePass',
        context:{
           url
        }
      };

      await transporter.sendMail(mailOptions);
      return true;
      
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
export const sendEmails = new SendEmails();
