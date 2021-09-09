//Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');


//this will be our client (frontend)
const socket = io();


socket.on('connect', () =>{
    console.log('connected');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () =>{
    console.log('disconnected from server');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});


socket.on('send-msg', (payload)=>{
    console.log(payload)
});

//send an event from the client side to the server side.
btnSend.addEventListener('click', ()=> {
    const msg = txtMessage.value;
    //ussually you will send an object
    const payload = {
        msg,
        id: 1234567890,
        date: new Date().getTime()
    }
    //first we need to emit the event
    //and from the server side we need to listen to the same event
    socket.emit('send-msg', payload, (id) => {
        console.log('Desde el server', id)
    });

});