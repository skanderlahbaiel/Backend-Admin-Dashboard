const express = require('express')
const Learner = require('../models/learner');

const learnerRouter = express.Router()


//add new learner
learnerRouter.post('/addLearner', async (req, res) => {
    try {

        console.log(req.body)


        const learner = await Learner.create({
            id: req.body.id,
            name: req.body.name,
            cohort: req.body.cohort,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            number: req.body.number
        })
        res.status(200).json("Success");

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//delete learner by id
learnerRouter.delete('/deleteLearner/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const learner = await Learner.findByIdAndDelete(id);
        if (!learner) {
            return res.status(404).json({ message: `cannot find any learner with ID ${id}` })
        }
        res.status(200).json(`Learner with id: ${id} has been deleted`);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//delete all
learnerRouter.delete('/deleteAllLearner', async (req, res) => {
    try {
        const result = await Learner.deleteMany();
        res.status(200).json(`Deleted ${result.deletedCount} learners`);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})







//get learner by id
learnerRouter.get('/learnerById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const learner = await Learner.findById(id);
        res.status(200).json(learner);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get all
learnerRouter.get('/getLearners', async (req, res) => {
    try {
        const learners = await Learner.find({});
        res.status(200).json(learners);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get by name
learnerRouter.get('/learnerByName/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const learner = await Learner.findOne({ name });
        res.status(200).json(learner);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get by cohort
learnerRouter.get('/learnerBycohort/:cohort', async (req, res) => {
    try {
        const { cohort } = req.params;
        const learner = await Learner.find({ cohort });
        res.status(200).json(learner);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//update learner
learnerRouter.put('/updateLearner/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const learner = await Learner.findByIdAndUpdate(id, req.body);
        // we cannot find any learner in database
        if (!learner) {
            return res.status(404).json({ message: `cannot find any learner with ID ${id}` })
        }
        const updatedLearner = await Learner.findById(id);
        res.status(200).json(updatedLearner);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//update attendance
learnerRouter.patch('/updateLearner/:name', async (req, res) => {
    try {
      const { name } = req.params;
      const learner = await Learner.findOne({ name });
      if (!learner) {
        return res
          .status(404)
          .json({ message: `Cannot find any learner with name ${name}` });
      }
  
      const now = new Date();
      learner.attendance.push({ date: now, present: true });
      
      const updatedLearner = await learner.save();
  
      res.status(200).json(updatedLearner);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  

  

  
module.exports = learnerRouter;