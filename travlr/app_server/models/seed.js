const db = require('./db');
const Trip = require('./travlr');

const fs = require('fs');
const path = require('path');

const trips = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, '../../data/trips.json'),
        'utf8'
    )
);

async function seedDB() {

    try {

        await Trip.deleteMany({});

        await Trip.insertMany(trips);

        console.log('Database seeded successfully.');

    } catch (err) {

        console.error(err);

    } finally {

        db.connection.close();

    }

}

seedDB();