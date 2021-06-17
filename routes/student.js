//
const express = require('express');
const router = express.Router();
const {signup, signin, getAllStudent} = require('../controllers/userControllers/student')
const isAuthStudent = require('../middlewares/studentMiddleware/auth_jwt')
const controller = require('../controllers/userControllers/student')



const {
    registerValidation,
    signinValidation,
    validation,
  } = require("../middlewares/user");

//route1 => SignUp

router.post('/student/signup', registerValidation(), validation, signup)


//route2 =>signin
router.post('/student/signin',  signinValidation(), validation, signin)

router.get('/student', controller.find);





router.get("/student/current", isAuthStudent, (req, res) => {
    res.send(req.student);
  });


module.exports = router ;