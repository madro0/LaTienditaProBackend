import nodemailer from 'nodemailer';
import path from "path";
var hbs = require('nodemailer-handlebars');



class SendEmails {

  public async sendConfirmEmail() {
    

    try {
      let transporter =await nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 25,
        secure:false,
        auth:{
          user: 'apikey',
          pass:'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',
        } 
      });
      
      
     
      transporter.use('compile', hbs({
        viewEngine: {
          
          layoutsDir: path.join(__dirname,'/templates/'),
          partialsDir: path.join(__dirname,'/templates/'),
          extName: '.hbs',
          defaultLayout: '',
        },
        viewPath: path.join(__dirname,'/templates/'),
        extName: '.hbs',
      }));
  
      let mailOptions= {
        from: '"La Tiendita 🏪" <madro1025@gmail.com>', // sender address
        to: "daanii2013@gmail.com", // list of receivers
        subject: "Confirm Email", // Subject line
        text: "Para confirmar su email click aqui",
        // html: "<b>Hello world?</b>", // html body
        template: 'confirmEmail',
        context:{
          url:'http://localhost3000/confirm/daanii2013@gmail.com/123A435B8CEF'
        }
        
      };

       transporter.sendMail(mailOptions,(err:any, data:any)=>{
         if(err){
           console.log(err);
           return false;
         }
         console.log('send!!');
         return true;
       });

    } catch (err) {
      console.log(err);
      return false;
    }
    



  }
}
export const sendEmails = new SendEmails();
