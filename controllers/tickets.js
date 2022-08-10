const Ticket = require('../models/ticket');
const Flight = require('../models/flight');
const ticket = require('../models/ticket');
const { rawListeners } = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
}


function create(req, res) {
    req.body.flight = req.params.id;
    console.log(req.body)
    const newTicket = new Ticket(req.body)
    newTicket.save(function(err, ticket){
        res.redirect(`/flights/${req.body.flight}`)
    })
}





function newTicket(req, res){         
    // console.log(req.params, 'this is the req.params')     
    res.render('tickets/new', {ticketId: req.params.id});
}


  
