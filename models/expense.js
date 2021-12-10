const { DataTypes } = require("sequelize");
const db = require("../db");

const Expense = db.define("income", {
    Transportation: {
        type: DataTypes.INTEGER,
        allowNull: true , 
    },
    Housing: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
    Food: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
    PersonalCare: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
    Lifestyle: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
    Health: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
    Insurance: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
    Debt: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
    Savings: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
    Giving: {
        type: DataTypes.INTEGER,
        allowNull: true ,
    },
});

module.exports = Expense;