const { DataTypes } = require("sequelize");
const db = require("../db");

const Income = db.define("income", {
    Paychecks: {
        type: DataTypes.INTEGER,
        allowNull: true , 

    },
    Investments: {
        type: DataTypes.INTEGER,
        allowNull: true , 

    },
    Reimbursements: {
        type: DataTypes.INTEGER,
        allowNull: true , 

    },
    Misc: {
        type: DataTypes.INTEGER,
        allowNull: true , 

    },
});

module.exports = Income;