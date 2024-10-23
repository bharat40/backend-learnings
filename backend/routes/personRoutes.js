const express = require('express');
const router = express.Router();
const person = require("../models/Person.js");

// add new person data
router.post('/', async (req, res) => {
    try {
        const personData = req.body;
        const newPerson = new person(personData);
        const savedPerson = await newPerson.save();
        res.status(200).json(savedPerson);
        console.log("New Person Data Saved!");

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal Server Error!" })
    }
})
// get person data
router.get('/', async (req, res) => {
    try {
        const personData = await person.find();
        res.status(200).json(personData);
        console.log("Person's Data fetched");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log("Error: ", error);
    }
})
// get person data according to their work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const personWithWorkType = await person.find({ work: workType });
            if (Object.keys(personWithWorkType).length == 0) {
                console.log(`Currently no person with this worktype`);
                res.status(200).json({ message: "Currently no person with this worktype" })
            } else {
                res.status(200).json(personWithWorkType);
                console.log(`Person's with work type: ${workType} was found!`);
            }
        }
        else {
            console.log("Work Type Not Found!");
            res.status(404).json({ error: "Work Type Not Found!" })
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal Server Error!" })
    }
})
// update person data
router.put('/:id', async (req, res) => {

    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            console.log("Person Not Found!");
            res.status(404).json({ error: "Person Not Found!" });
        }
        console.log("Data Updated!");
        res.status(200).json(response);

    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
})
// delete person data
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        if (!response) {
            console.log("Person Not Found!");
            res.status(404).json({ error: "Person Not Found!" });
        }
        console.log("Person Data Deleted");
        res.status(200).json({ message: "Person Data Deleted" })

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
})

module.exports = router;