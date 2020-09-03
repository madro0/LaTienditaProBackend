import { response, NextFunction } from 'express';

import {body, validationResult } from 'express-validator';

const userAddValidation = () => {
  
   return  [
    // username must be an email
    body('email').isEmail(),
    body('name').not().isEmpty(),
    body('password').not().isEmpty(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6 }),


    getErros
    
  ]
}

const userUpdateValidation = () => {
  
  return  [
   // username must be an email
   body('email').isEmail(),
   body('name').not().isEmpty(),
   
   getErros
   
 ]
} 
const LoginValidation = () => {
  
  return  [
   // username must be an email
   body('email').not().isEmpty(),
   body('password').not().isEmpty(),
   getErros
 ]
} 

const getErros = (req= response, res = response, next:NextFunction ) => {

  const errores = validationResult( req );

  if ( !errores.isEmpty() ) {
      return res.status(400).json({
          ok: false,
          errors: errores.mapped()
      });
  }
  next();
}


module.exports = {
  userAddValidation,
  userUpdateValidation,
  LoginValidation
}
