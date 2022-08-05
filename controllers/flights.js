const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index,
	show
};

function index(req, res){
	// List out the movies
	Flight.find({}, function(err, allFlightsInDb){
		// console.log(allFlightsInDb, " <- all the flights");
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

function show(req, res) {
	Flight.findById(req.params.id, function(err, flight) {
	  console.log(flight, " <- show page")
	  res.render('flights/show', {flight: flight});
	});
  }

function newFlight(req, res) {
    res.render('flights/new');
	
}

function create(req, res){
    console.log(req.body, '<-req.body')
    const flight = new Flight(req.body);
    flight.save(function(err){
        if(err) return res.render('flights/new');
        console.log(flight);
		// for (let key in req.body) {			// not sure if this is correct..  for Defaulting DEN
		// 	if (req.body[key] === '') delete req.body[key];
		//   }
        res.redirect('/flights')
    });
}
