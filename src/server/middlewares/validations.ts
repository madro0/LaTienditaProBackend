const { body }  = require('express-validator')

const userValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    //body('password').isLength({ min: 5 }),
  ]
}



module.exports = {
  userValidationRules
}

/*
exports.login = [
  check('email').isEmail().withMessage('blabla'),
  check('password').exists(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.json(422).json({ errors: err.mapped() });
    }
  }
];
*/

// class Validations{

//     public validationAddUser (){
//         return [
//             check('name','el nombre es obligatorio').not().isEmpty(),
//             check('email', 'El email es obligatorio').not().isEmpty(),
//             check('a', 'a es obligatorio').not().isEmpty(),
//         ];
//     } 
// }
  //export const validations = new validation(); 