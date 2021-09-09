//Referencias HTML
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCrear = document.querySelector('button');


//this will be our client (frontend)
const socket = io();

socket.on('connect', () =>{
    //console.log('connected');
    btnCrear.disabled = false;
});

socket.on('disconnect', () =>{
    //console.log('disconnected from server');
    btnCrear.disabled = true;
});

socket.on('last-ticket', (lastTicket) =>{
    lblNewTicket.innerText = 'Ticket ' + lastTicket;
});


//send an event from the client side to the server side.
btnCrear.addEventListener('click', ()=> {
    
    //first we need to emit the event
    //and from the server side we need to listen to the same event
    socket.emit('next-ticket', null, (ticket) => {
        lblNewTicket.innerText = ticket;
    });

});