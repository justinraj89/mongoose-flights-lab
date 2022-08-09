const Flight = require('../models/flight');

module.exports = {
    create
};

function create(req,res){
    // console.log(req.params.id, '<--Params.id');
    // console.log(req.body, '<- arrival info')
        Flight.findById(req.params.id, function(err, flight){
            console.log(flight.destinations, '<-flight.destinations');
            console.log(req.body.arrival, '<-req.body.arrival here');
            flight.destinations.push(req.body);
            flight.save(function(err){
                res.redirect(`/flights/${flight._id}`);
            });
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