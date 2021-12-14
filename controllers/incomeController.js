
const { IncomeModel } = require("../models")
const validateSession = require("../middlewares/validate-session")
const Income = require('../models/income')
const router = require("express").Router()



router.get("/", validateSession, async (req, res) => {
    let {id} = req.user
    try {
        const allIncomeSources = await IncomeModel.findAll({
            where:
            {
                owner: id
            }
        })

        res.status(200).json(allIncomeSources)
    } catch (err) {

        res.status(500).json({
            error: err,
        })
    }
})


router.post("/create", validateSession, async (req, res) => {

    const { Paychecks, Investments, Reimbursements, Misc } = req.body;
    const { id } = req.user

    const IncomeEntry = {
        Paychecks,
        Investments,
        Reimbursements,
        Misc,
        owner: id
    }

    try {
        const newIncome = await IncomeModel.create(IncomeEntry, req.user.id);

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
                id: req.params.id,
                owner: req.user.id
            }
        }
        ).then((result) => {
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
    const { Paychecks,
        Investments,
        Reimbursements,
        Misc } = req.body;

    const incomeId = req.params.id
    const userId = req.user.id
    
    const query = {
        where: {
            id: incomeId,
            owner: userId
        }
    };
    const updatedModel = {
        Paychecks,
        Investments,
        Reimbursements,
        Misc
    };
    try {
        const update = await IncomeModel.update(updatedModel, query);
        res.status(200).json({ message: "Income successfully edited" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router