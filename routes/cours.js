const express = require("express");

// require Router
const courseRouter = express.Router();

const isAuthProf = require("../middlewares/professorMiddleware/auth_jwt");

// require controllers
const {
  postCourse,
  getAllCourses,
  getCourse,
  deleteCourse,
  editCourse,
} = require("../controllers/coursControllers/cours");

// ************** All routes **********************

/**
 * @desc : test route
 * @method : GET
 * @path : http://localhost:7000/api/courss/test
 * @data : nothing
 * @acess : public
 */

/*coursRouter.get('/test', (req, res) => {
    res.status(200).send('Hello test')
})*/

/**
 * @desc : add ccourse
 * @method : POST
 * @path : 'http://localhost:7000/api/lesson/'
 * @data : req.body
 * @acess : public
 */

courseRouter.post("/coursesList/add", isAuthProf, postCourse);

/**
 * @desc : get all courses
 * @method : GET
 * @path : http://localhost:7000/api/lesson
 * @data : no data
 * @acess : public
 */
courseRouter.get("/coursesList", getAllCourses);

/**
 * @desc : get one course
 * @method : GET
 * @path : http://localhost:7000/api/courss/:_id
 * @data : req.params
 * @acess : public
 */
courseRouter.get("/coursesList/:_id", getCourse);

/**
 * @desc : delete course
 * @method : DELETE
 * @path : http://localhost:7000/api/courss/:_id
 * @data : req.params
 * @acess : public
 */
courseRouter.delete("/coursesList/:_id", deleteCourse);
const deleteCourse = async (req, res) => {
  try {
    const courseToDelete = await Course.findOneAndRemove({ _id });
    // console.log(coursToDelete)
    if (!courseToDelete) {
      res.status(200).send({ msg: "Cours already deleted ..." });
      return;
    }
    res.status(200).send({ msg: "Cours deleted ...", courseToDelete });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Can not delete cours with this id !!", error });
  }
};

/**
 * @desc : edit course
 * @method : PUT
 * @path : http://localhost:7000/api/courss/:_id
 * @data : req.params & req.body
 * @acess : public
 */
courseRouter.put("/coursesList/edit/:_id", editCourse);

module.exports = courseRouter;
