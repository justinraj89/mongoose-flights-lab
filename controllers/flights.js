const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
	show
};

function index(req, res){
	Flight.find({}, function(err, allFlights){
		if(err){
			res.send('You have an error trying to find the flights, check the terminal')
		}

		for (let flight of allFlights) {
			// console.log(flight.departs)
			flight.departsDate = formatDate(flight.departs)
		}

		res.render('flights/index', {
			flights: allFlights
		});
	});
}


function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
		console.log(flight, " <- show page")
    //  console.log(flight.departs)
      	flight.departsDate = formatDate(flight.departs)
	  	Ticket.find({flight: flight._id}, function(err, ticket){
		// console.log(ticket, '<-ticket')	
		res.render('flights/show', {flight: flight, ticket: ticket});
		
	  })
    });
  }


function newFlight(req, res) {
	
	let d = new Date();
	defaultDate = d.setFullYear(d.getFullYear() + 1);	
	defaultDate = formatDate(defaultDate,"long")
	// console.log(defaultDate)
    res.render('flights/new', {defaultDate: defaultDate});
	
}

function create(req, res){
    // console.log(req.body, '<-req.body')
    const flight = new Flight(req.body);
    flight.save(function(err){
        if(err) return res.render('flights/new');
        // console.log(flight);
        res.redirect('/flights')
    });
}


const formatDate = (d,dateType = "short") => {
    d = new Date(d)
	if (dateType === "short") {
		let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
		let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
		let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
		let time = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(d);
		return `${mo}-${da}-${ye} ${time}`;
	}
	else {
		let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
		let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
		let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
		let hh = new Intl.DateTimeFormat('en', { hour: '2-digit',  hour12: false}).format(d);
		let mm = new Intl.DateTimeFormat('en', { minute: '2-digit'}).format(d);
		//2023-08-07T22:16
		return `${ye}-${mo}-${da}T${hh}:${mm}`;
	}
}
