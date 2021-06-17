const Student = require('../../models/student')
const bcrypt = require ('bcrypt')
const salt = bcrypt.genSaltSync(10)
const jwt = require("jsonwebtoken");
const sendMail = require('./sendMail')


exports.signup = async (req,res)=>{
    try {
        //   req.body
        const { name, lastName, email, phone, password } = req.body;
    
        // check if the email is not found in the database
        const foundStudent = await User.findOne({ email });
    
        if (foundStudent) {
         return  res.status(400).send({
            errors: [{ msg: "user already exist email should be unique" }],
          });
         
        }
        // hash password
        const saltRounds = 10
        const newPassword = await bcrypt.hash(password, saltRounds);
        // create newStudent 
        const newStudent= new Student({...req.body})
        // change the password to the hashed one
        newStudent.password = newPassword;

           // create a key using json webtoken
       const token = jwt.sign(
        {
          id: newStudent._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: 60 * 60 }
      );
       /*
        const createActivationToken = (payload) => {
          return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: 60*60})
        }
        
       const activation_token = createActivationToken(newStudent) 
       
       const url = `${CLIENT_URL}/user/activate/${activation_token}`
        sendMail (email,url)
*/
        
       await newStudent.save();
        
       res.status(200).send({msg:"user signup succ please activate your mail", student:newStudent,token})
       
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
        const foundStudent= await Student.findOne({email});
        if(!foundStudent){
            return res.status(400).send({
                errors:[{msg:"bad credential"}]
            })
        }
        const testPassword=await  bcrypt.compare(password, foundStudent.password) 
          if(!testPassword){
              return res.status(400).send({
                  errors: [{msg:'bad credantial'}]
              });
        }
        // else create a key
        const token = jwt.sign(
          {
            id: foundStudent._id,
          },
          process.env.SECRET_KEY,
          { expiresIn: 60 * 60 }
        );
        console.log({token})
  
       
        res.status(200).send({msg:"login succ", user:foundStudent,token});

        
    } catch (error) {
        console.log(error)
        return  res.status(400).send({
                errors: [{ msg: "cannot signin" }],
              })
    }
};





// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{


      Student.find()
          .then(user => {
              res.send(user)
          })
          .catch(err => {
              res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
          })
  }

  


