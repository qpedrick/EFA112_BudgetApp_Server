
const { response } = require("express")
const { ExpenseModel } = require("../models")
const validateSession = require("../middlewares/validate-session")

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
router.post("/create", async (req, res) => {

    const {Transportation,
        Housing,
        Food,
        PersonalCare,
        Lifestyle,
        Health,
        Insurance,
        Debt,
        Savings,
        Giving} = req.body;
    
    const ExpenseEntry = {
        Transportation,
        Housing,
        Food,
        PersonalCare,
        Lifestyle,
        Health,
        Insurance,
        Debt,
        Savings,
        Giving
    } 

        try {
            const newExpense = await ExpenseModel.create(ExpenseEntry);
            res.status(201).json({
                message: "Expense Source made suceessfully",
                ExpenseEntry,
            })
        } catch (err) {
            res.status(500).json({
                message: `Failed to create Expense source: ${err}`
            })
        }
    })


router.delete("/:id", validateSession, async (req, res) => {
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

router.put("/:id", async (req, res) => {
    const {Transportation,
        Housing,
        Food,
        PersonalCare,
        Lifestyle,
        Health,
        Insurance,
        Debt,
        Savings,
        Giving} = req.body;

    const query = {
        where: {
            id: req.params.id
        }
    };
    const updatedModel = {Transportation,
        Housing,
        Food,
        PersonalCare,
        Lifestyle,
        Health,
        Insurance,
        Debt,
        Savings,
        Giving};
    try {
        const update = await ExpenseModel.update(updatedModel, query);
        res.status(200).json({message: "Expense successfully edited"});
    } catch (err) {
        res.status(500).json ({ error: err });
    }
});



module.exports = router