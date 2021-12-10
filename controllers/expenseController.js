
const { response } = require("express")
const { ExpenseModel } = require("../models")
const { validateSession } = require("../middleware")

const router = require("express").Router()



router.get("/", async (req, res) => {

    try {
        const allExpenseSources = await ExpenseModel.findAll()
        // the response is sent with a status and instance of info that's turned into an object
        res.status(200).json(allExpenseSources)
    } catch (err) {
        // send a response with an error status code and an object showing the error
        res.status(500).json({
            error: err,
        })
    }
})

// Create One
router.post("/", async (req, res) => {

    const {
        Transportantion,
        Housing,
        Food,
        PersonalCare,
        Lifestyle,
        Health,
        Insurance,
        Debt,
        Savings,
        Giving
    } = req.body


    try {
        const Expense = await ExpenseModel.create({
            Transportantion,
            Housing,
            Food,
            PersonalCare,
            Lifestyle,
            Health,
            Insurance,
            Debt,
            Savings,
            Giving
        })

        res.status(201).json({
            message: "Expense Source made suceessfully",
            Expense,
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to create Expense source: ${err}`
        })
    }
})


router.delete("/:id", async (req, res) => {
    try {
        await ExpenseModel.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Expense successfully deleted",
                    deletedExpense: result
                })
            } else {
                res.status(400).json({
                    message: "Expense does not exist"
                })
            }

        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete Expense source: ${err}`
        })
    }
})


module.exports = router