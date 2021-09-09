const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('current-status', ticketControl.last4);
    socket.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) =>{

       const nextTicket = ticketControl.nextTicket();
       callback( nextTicket );
       socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);


    });

    socket.on('serve-ticket', ({ desk }, callback) => {
        
        if (!desk) {
            return callback({
                ok: false,
                msg: 'Desk is required'
            });
        }

        const ticket = ticketControl.serveTicket(desk);

        socket.broadcast.emit('current-status', ticketControl.last4);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
        if(!ticket){
            callback({
                ok: false,
                msg: 'There is no more tickets to serve'
            });
        }else{
            callback({
                ok: true,
                ticket
            })
        }

    });
}


module.exports = {
    socketController
};