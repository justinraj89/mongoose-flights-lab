const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index
};

function index(req, res){
	// List out the movies
	Flight.find({}, function(err, allFlightsInDb){
		console.log(allFlightsInDb, " <- all the flights");
		if(err){
			res.send('You have an error trying to find the flights, check the terminal')
		}

		// response should be inside the callback, 
		// because this is after we got a response from the db that we 
		// found all the movies
		res.render('flights/index.ejs', {
			flights: allFlightsInDb
		});// end of render
	});
}

function newFlight(req, res) {
    res.render('flights/new')
}

function create(req, res){
    console.log(req.body, '<-req.body')
    const flight = new Flight(req.body);
    flight.save(function(err){
        if(err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights/new')
    });
}