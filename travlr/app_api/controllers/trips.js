const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// GET - List all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve trips' });
    }
};

// GET - Find a trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve trip' });
    }
};

// POST - Add a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: Number(req.body.perPerson),
            image: req.body.image,
            description: req.body.description
        });
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create trip' });
    }
};

// PUT - Update a trip by code
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: Number(req.body.perPerson),
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        );
        if (!updatedTrip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update trip' });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
