const express = require('express')
const Cohort = require('../models/cohort');

const cohortRouter = express.Router()

const app = express();


//add new learner
cohortRouter.post('/addCohort', async (req, res) => {
    try {

        console.log(req.body)


        const cohort = await Cohort.create({
            name: req.body.name,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            professor_name: req.body.professor_name
        })
        res.status(200).json("Cohort successfully added");

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//delete cohort by name
cohortRouter.delete('/deleteCohort/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const cohort = await Cohort.findOne({ name });
        if (!cohort) {
            return res.status(404).json({ message: `cannot find any cohort with name ${name}` })
        }
        res.status(200).json(`${name} has been deleted`);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//get all
cohortRouter.get('/getCohorts', async (req, res) => {
    try {
        const cohorts = await Cohort.find({});
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get by name
cohortRouter.get('/cohortByName/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const cohort = await Cohort.findOne({ name });
        res.status(200).json(cohort);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//update cohort
cohortRouter.put('/updateCohort/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const cohort = await Cohort.findOneAndUpdate(name, req.body);
        // we cannot find any cohort in database
        if (!cohort) {
            return res.status(404).json({ message: `cannot find any ${name} cohort ` })
        }
        const updatedCohort = await Cohort.findOne({ name });
        res.status(200).json(updatedCohort);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = cohortRouter;