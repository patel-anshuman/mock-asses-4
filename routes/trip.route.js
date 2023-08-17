const {TripModel} = require('../models/trip.model');
const {Router} = require('express');

const tripRouter = Router();

// Retrieve Data - filter , sort
tripRouter.get('/', async (req,res) => {
    try {
        const {destination,sort} = req.query;
        const query = {}, sortType={};
        if(destination){
            query.destination = destination;
        }
        if(sort=="asc"){
            sortType.budgetPerPerson = 1;
        } else if(sort=="desc"){
            sortType.budgetPerPerson = -1;
        }
        const data = await TripModel.find(query).sort(sortType);
        res.status(200).json({data: data});
    } catch (err) {
        res.status(400).json({"Error": err.message});
    }
});

// Post Data
tripRouter.post('/', async (req,res) => {
    try {
        const data = new TripModel(req.body);
        await data.save();
        res.status(200).json({data: data});
    } catch (err) {
        res.status(400).json({"Error": err.message});
    }
});

// Delete Data
tripRouter.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const data = await TripModel.findByIdAndDelete({_id: id});
        res.status(200).json({data: data});
    } catch (error) {
        res.status(400).json({"Error": err.message});
    }
});

module.exports = tripRouter;
