const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {

    try {

        const trips = await Trip.find();

        if (!trips || trips.length === 0) {

            return res.status(404).json({
                message: "No trips found"
            });

        }

        return res.status(200).json(trips);

    } catch (err) {

        return res.status(500).json(err);

    }

};

const tripsFindByCode = async (req, res) => {

    try {

        const trip = await Trip.findOne({
            code: req.params.tripCode
        });

        if (!trip) {

            return res.status(404).json({
                message: "Trip not found"
            });

        }

        return res.status(200).json(trip);

    } catch (err) {

        return res.status(500).json(err);

    }

};

module.exports = {
    tripsList,
    tripsFindByCode
};