export default{

    //=======================================
    //Port!
    //=======================================
    PORT: process.env.PORT ?? '3000',

    //=======================================
    //URI Database!
    //=======================================
    URI : 'mongodb+srv://madro:K8mwWFepr8Gmc73s@cluster0.yugug.mongodb.net/latiendita',
    //'mongodb://localhost:27017/Lt';

    //=======================================
    //SEED de autenticación (jwt) 
    //=======================================
    SEED : process.env.SEED ?? 'este-es-el-seed-desarrollo',

    //=======================================
    //Vencimiento de token
    //=======================================
    CADUCIDAD_TOKEN : process.env.CADUCIDAD_TOKEN ?? '48h',
    
    //=======================================
    //Configurasion para enviar emails
    //=======================================
    HOST_SEND_EMAILS : 'smtp.ethereal.email',
    PORT_SEND_EMAILS : 587,
    USER_SEND_EMAILS: 'orval.crona0@ethereal.email',
    PASS_SEND_EMAILS: 'J2UuBh6aaPuqzpnzKy',
    FROM_SEND_MAILS: '"La Tiendita 🏪" <madro1025@gmail.com>',

    //=======================================
    //Vencimiento de token para la restauracion de la contraseña
    //=======================================
    CADUCIDAD_TOKEN_RESTORE_PASS: '2h'
    




}