//Referencias HTML
const lblDesk = document.querySelector('h1');
const btnServe = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')){
    window.location = 'index.html';
    throw new Error('a Desk is required');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;

divAlert.style.display = 'none';

//this will be our client (frontend)
const socket = io();

socket.on('connect', () =>{
    //console.log('connected');
    btnServe.disabled = false;
});

socket.on('disconnect', () =>{
    //console.log('disconnected from server');
    btnServe.disabled = true;
});

socket.on('pending-tickets', (pendingTickets)=>{
    if(pendingTickets === 0){
        divAlert.style.display = '';
        btnServe.disabled = true;
    }
    lblPending.innerText = pendingTickets;
});

//send an event from the client side to the server side.
btnServe.addEventListener('click', ()=> {
    
    socket.emit('serve-ticket', { desk }, ({ ok, ticket, msg }) =>{
        if (!ok) {
            lblTicket.innerText = 'Nothing'
            return divAlert.style.display = '';
        }
        
        lblTicket.innerText = `Ticket ${ticket.number}`;
        
    });
    //first we need to emit the event
    //and from the server side we need to listen to the same event
    // socket.emit('next-ticket', null, (ticket) => {
    //     lblNewTicket.innerText = ticket;
    // });

});