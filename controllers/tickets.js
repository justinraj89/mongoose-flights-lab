const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
}


function create(req, res) {
    flightId = req.params.id;
    // console.log(flightId, '<--req.params');
    console.log(req.body, '<-- req.body contents of form')
    req.body.flight = flightId;
    let seat = req.body.seat;
    let price = req.body.price;
    let flight = req.params.id;
    let ticket = new Ticket({ seat, price, flight });
    Ticket.create(req.body, function (err, ticket) {
        res.redirect(`/flights/${flightId}`);
    });
}





function newTicket(req, res){         
    // console.log(req.params, 'this is the req.params')     
    res.render('tickets/new', {ticketId: req.params.id});
}
