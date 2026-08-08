const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

const travel = async (req, res) => {

    try {

        const response = await fetch(
            tripsEndpoint,
            options
        );

        const json = await response.json();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: json
        });

    } catch (err) {

        console.log(err);

    }

};

module.exports = {
    travel
};