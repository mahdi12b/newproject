// require model cours
const Course = require("../../models/cours");

/**
 *
 * POST handler
 *  */

const postCourse = async (req, res) => {
  try {
    const { name, matiere, courseFor } = req.body;
    // handling errors : matiere & name & courseFor are required
    if (!name) {
      res.status(400).send({ msg: " Name is required !!!" });
      return;
    }
    if (!matiere) {
      res.status(400).send({ msg: " matiere is required !!!" });
      return;
    }
    if (!courseFor) {
      res.status(400).send({ msg: "you have to fill in all the fields" });
      return;
    }
    // create and save the new course
    const newCourse = new Course({
      name,
      matiere,
      courseFor,
      id_prof: req.professor._id,
    });
    await newCourse.save();
    res.status(200).send({ msg: "Cours added successfully ...", newCourse });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "impossible to add new cours", error });
  }
};

/*
 * GET all
 */
const getAllCourses = async (req, res) => {
  try {
    const listCourses = await Course.find();
    res
      .status(200)
      .send({ msg: "This is the list of curses ...", listCourses });
  } catch (error) {
    res.status(400).send({ msg: "Can not get all courses !!", error });
  }
};

/**
 * GET one cours
 *  */
const getCourse = async (req, res) => {
  try {
    const { _id } = req.params;
    const courseToFind = await Course.findOne({ _id });
    console.log(courseToFind);
    res.status(200).send({ msg: "I find the cours ...", courseToFind });
  } catch (error) {
    res.status(400).send({ msg: "Can not get cours with this id !!", error });
  }
};

/**
 * delete cours
 *  */
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

// * edit cours
//*
const editCourse = async (req, res) => {
  // const { name, matiere , coursFor } = req.body

  try {
    const { _id } = req.params;
    const courseToEdit = await Course.updateOne(
      { _id },
      { $set: { ...req.body } }
    );
    // console.log(coursToEdit)
    if (!courseToEdit.nModified) {
      res.status(400).send({ msg: "Cours already updated .." });
      return;
    }
    res.status(200).send({ msg: "Cours updated ..", courseToUpdate: req.body });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Can not edit cours with this id !!", error });
  }
};

module.exports = {
  postCourse,
  getAllCourses,
  getCourse,
  deleteCourse,
  editCourse,
};
