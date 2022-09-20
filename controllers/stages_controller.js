// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db

const { Op } = require('sequelize')

// FIND ALL BANDS

stages.get('/', async (req, res) => {
    try {
        const foundstages = await Stage.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundstages)
    } catch (error) {
        res.status(500).json(error)
    }
})



// FIND A SPECIFIC BAND
stages.get('/:id', async (req, res) => {
    try {
        const foundstages = await Stage.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundstages)
    } catch (error) {
        res.status(500).json(error)
    }
})
// CREATE A BAND
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newStage
        })
    } catch (err) {
        res.status(500).json(err)
    }
})
// UPDATE A BAND
stages.put('/:id', async (req, res) => {
    try {
        const updatedstages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedstages} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})
// DELETE A BAND
stages.delete('/:id', async (req, res) => {
    try {
        const deletedstages = await Stage.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedstages} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = stages
