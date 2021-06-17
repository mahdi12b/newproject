const Professor = require('../../models/professor')
const Course= require('../../models/cours')
const bcrypt = require ('bcrypt')
const salt = bcrypt.genSaltSync(10)
const jwt = require("jsonwebtoken");
const sendEmail = require('./sendMail');


exports.signup = async (req,res)=>{
    try {
        //   req.body
        const { name, lastName, email, phone, password } = req.body;
    
        // check if the email is not found in the database
        const foundProfessor = await Professor.findOne({ email });
    
        if (foundProfessor) {
         return  res.status(400).send({
            errors: [{ msg: "user already exist email should be unique" }],
          });
         
        }
        // hash password
        const saltRounds = 10
        const newPassword = await bcrypt.hash(password, saltRounds);
        // create newProfessor 
        const newProfessor= new Professor({...req.body})
        if (req.body.adminCode==="adminazerty"){
          newProfessor.isAdmin= true;
    }
        // change the password to the hashed one
        newProfessor.password = newPassword;
        

           // create a key using json webtoken
       const token = jwt.sign(
        {
          id: newProfessor._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: 60 * 60 }
      );
       /*
        const createActivationToken = (payload) => {
          return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: 60*60})
        }
        
       const activation_token = createActivationToken(newProfessor) 
       
       const url = `${CLIENT_URL}/user/activate/${activation_token}`
        sendMail (email,url, verify your email address)
*/ 
        
       await newProfessor.save();
        
       res.status(200).send({msg:"user signup succ please activate your mail", professor:newProfessor,token})
       
        } catch (error){
            console.log(error)
            return  res.status(400).send({
                errors: [{ msg: "Can not sign up please try again" }],
              })

}
}





exports.signin = async (req,res)=>{
    try {
        const {email, password} = req.body;
        //we should test if the email exists
        const foundProfessor= await Professor.findOne({email});
        if(!foundProfessor){
            return res.status(400).send({
                errors:[{msg:"bad credential"}]
            })
        }
        const testPassword=await  bcrypt.compare(password, foundProfessor.password) 
          if(!testPassword){
              return res.status(400).send({
                  errors: [{msg:'bad credantial'}]
              });
        }
        // else create a key
        const token = jwt.sign(
          {
            id: foundProfessor._id,
          },
          process.env.SECRET_KEY,
          { expiresIn: 60 * 60 }
        );
        console.log({token})
  
       
        res.status(200).send({msg:"login succ", professor:foundProfessor,token});

        
    } catch (error) {
        console.log(error)
        return  res.status(400).send({
                errors: [{ msg: "cannot signin" }],
              })
    }
};

// reset password
exports.forgotPassword = async (req,res)=>{
  try {
    const {email}=req.body 
    const professor = await Professor.findOne({email})
    if(!professor) return res.status(400).send({msg:'this email does not exist'})
    const access_token = createAccessToken({id: professor._id})
    const url = `${CLIEN_URL}/user/reset/${access_token}`

    sendEmail(email,url, "Reset your password")
    res.send({msg:"Re-send the password, please check your Email"})

  } catch (error) {
    return res.status(500).send({msg:error.message})
  }
}

exports.getAllProf= async (req, res) => {
  try{
    const listProf = await Professor.find()
    res.status(200).send({msg:'getting professor list succ', listProf})
  }
  catch(error){
    res.status(400).send({msg:`cannot find list of professor ${error}`})
  }
}


exports.getOneProf = async (req, res) => {
  try {
     const ProfToFind = await Professor.findOne({_id: req.professor._id});
     const courses = await Course.find({id_prof: req.professor._id})
     ProfToFind.courses = courses
     
     res.status(200).send({msg: "get one Prof succ", ProfToFind})
    } catch (error) {
      res.status(400).send({msg:`cannot find the professor ${error}`})
  }
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}


