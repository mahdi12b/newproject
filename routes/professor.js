const express = require('express');
const router = express.Router();
const {signup, signin, getAllProf, getOneProf, forgotPassword} = require('../controllers/userControllers/professor')
const isAuthProfessor = require('../middlewares/professorMiddleware/auth_jwt')


const {
    registerValidation,
    signinValidation,
    validation,
  } = require("../middlewares/user");

//route1 => SignUp

router.post('/professor/signup', registerValidation(), validation, signup)


//route2 =>signin
router.post('/professor/signin',  signinValidation(), validation, signin)

router.get('/' ,getAllProf)


router.get("/professor/current", isAuthProfessor, getOneProf, (req, res) => {
    res.send(req.professor);
  });

// route => reset password
router.post('/forget', forgotPassword)


module.exports = router ;