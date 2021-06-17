const jwt = require("jsonwebtoken");
const Professor = require("../../models/professor");

const isAuth = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];
    // if the token is undefined =>
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    // get the id from the token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
                     
    // search the user
    const professor = await Professor.findById(decoded.id).select("-password");

    // send not authorisation IF NOT professor
    if (!professor) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }

    // if professor exist
    req.professor = professor;

    next();
  } catch (error) {
      console.log(error)
    return res.status(500).send({ errors: [{ msg: "Unauthorized" }] });
  }
};

module.exports = isAuth;