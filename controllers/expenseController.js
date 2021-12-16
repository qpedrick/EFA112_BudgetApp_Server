const { response } = require("express")
const { ExpenseModel } = require("../models")
const validateSession = require("../middlewares/validate-session")

const router = require("express").Router()



router.get("/", validateSession, async (req, res) => {
    let {id} = req.user
    try {
        const allExpenseSources = await ExpenseModel.findAll({
            where:{
                owner: id
            }
        })

        res.status(200).json(allExpenseSources)
    } catch (err) {

        res.status(500).json({
            error: err,
        })
    }
})

router.post("/create", validateSession, async (req, res) => {

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

    const { id } = req.user

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
        Giving,
        owner: id
    } 

        try {
            const newExpense = await ExpenseModel.create(ExpenseEntry, req.user.id);
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
                id: req.params.id,         
                owner: req.user.id
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

router.put("/:id", validateSession, async (req, res) => {
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

        const expenseId = req.params.id
        const userId = req.user.id

    const query = {
        where: {
            id: expenseId,
            owner: userId
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
        Giving
    };
    
    try {
        const update = await ExpenseModel.update(updatedModel, query);
        res.status(200).json({message: "Expense successfully edited"});
    } catch (err) {
        res.status(500).json ({ error: err });
    }
});



module.exports = router