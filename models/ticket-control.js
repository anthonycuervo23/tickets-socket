const path = require('path');
const fs = require('fs');

class Ticket {
    constructor( number, desk ){
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {

    constructor(){
        this.last = 0;
        this.today = new Date().getDate(); //this will give me the current day, example: 31
        this.tickets = [];
        this.last4 = [];

        this.init();
    }

    //getter para serializar y grabar en DB
    get toJson(){
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4,
        }
    }


    //metodos
    init(){
        const {last, today, tickets, last4} = require('../db/data.json');
        if(today === this.today){
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4;
        }else {
            //es otro dia
            this.saveDB();
        }
    }

    saveDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    //asignar el proximo ticket
    //we are creating a new ticket and save it inside a list that contains all the tickets
    nextTicket() {
        this.last +=1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveDB();
        return 'Ticket: ' + ticket.number;
    }

    //atender los tickets
    //cuando atendemos un ticket debemos sacarlo de la lista de tickets y luego 
    //lo metemos en la lista que contiene los ultimos 4 tickets que estan siendo atendidos
    serveTicket(desk) {
        //we dont have ticket
        if (this.tickets.length === 0) {
            return null;
        }

        //take the last ticket and removed from the list of tickets
        //becuase is going to be attended
        const ticket = this.tickets.shift();
        ticket.desk = desk;

        this.last4.unshift( ticket );

        if(this.last4.length > 4){
            this.last4.splice(-1,1);
        }
        this.saveDB();
        return ticket;       
    }


}

module.exports = TicketControl;