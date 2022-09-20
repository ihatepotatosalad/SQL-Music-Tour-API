// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event } = db

const { Op } = require('sequelize')

// FIND ALL BANDS

events.get('/', async (req, res) => {
    try {
        const foundevents = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundevents)
    } catch (error) {
        res.status(500).json(error)
    }
})



// FIND A SPECIFIC BAND
events.get('/:id', async (req, res) => {
    try {
        const foundevents = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundevents)
    } catch (error) {
        res.status(500).json(error)
    }
})
// CREATE A BAND
events.post('/', async (req, res) => {
    try {
        const newevents = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newevents
        })
    } catch (err) {
        res.status(500).json(err)
    }
})
// UPDATE A BAND
events.put('/:id', async (req, res) => {
    try {
        const updatedevents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedevents} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})
// DELETE A BAND
events.delete('/:id', async (req, res) => {
    try {
        const deletedevents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedevents} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events