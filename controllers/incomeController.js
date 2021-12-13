
const { IncomeModel } = require("../models")
const validateSession  = require("../middlewares/validate-session")
const Income = require('../models/income')
const router = require("express").Router()



router.get("/", validateSession, async (req, res) => {

    try {
        const allIncomeSources = await IncomeModel.findAll()
        // the response is sent with a status and instance of info that's turned into an object
        res.status(200).json(allIncomeSources)
    } catch (err) {
        // send a response with an error status code and an object showing the error
        res.status(500).json({
            error: err,
        })
    }
})

// Create One
router.post("/create", validateSession, async (req, res) => {

const { Paychecks, Investments, Reimbursements, Misc } = req.body;

const IncomeEntry = {
        Paychecks,
        Investments,
        Reimbursements,
        Misc
    }

    try {
        const newIncome = await IncomeModel.create(IncomeEntry);

        res.status(201).json({
            message: "Income Source made suceessfully",
            IncomeEntry,
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to create Income source: ${err}`
        })
    }
})


router.delete("/:id", validateSession, async (req, res) => {
    try {
        await IncomeModel.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Income successfully deleted",
                    deletedIncome: result
                })
            } else {
                res.status(400).json({
                    message: "Income does not exist"
                })
            }

        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete Income source: ${err}`
        })
    }
})

router.put("/:id", validateSession, async (req, res) => {
    const {Paychecks,
        Investments,
        Reimbursements,
        Misc} = req.body;

    const query = {
        where: {
            id: req.params.id
        }
    };
    const updatedModel = {
        Paychecks,
        Investments,
        Reimbursements,
        Misc};
    try {
        const update = await IncomeModel.update(updatedModel, query);
        res.status(200).json({message: "Expense successfully edited"});
    } catch (err) {
        res.status(500).json ({ error: err });
    }
});

module.exports = router