
const { response } = require("express")
const { IncomeModel } = require("../models")
const { validateSession } = require("../middleware")

const router = require("express").Router()



router.get("/", async (req, res) => {

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
router.post("/", async (req, res) => {

    const {
        payChecks,
        investments,
        reimbursements,
        misc,
    } = req.body

    console.log(nameOfPie, baseOfPie, "----------------")

    try {
        const Income = await IncomeModel.create({
            payChecks,
            investments,
            reimbursements,
            misc,
        })

        res.status(201).json({
            message: "Income Source made suceessfully",
            Pie,
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to create source: ${err}`
        })
    }
})


router.delete("/:id", async (req, res) => {
    try {
        await IncomeModel.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Income successfully deleted",
                    deletedPie: result
                })
            } else {
                res.status(400).json({
                    message: "Income does not exist"
                })
            }

        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete source: ${err}`
        })
    }
})


module.exports = router