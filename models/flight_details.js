"use strict";

const { ClassSeatAvailablity } = require("./seat_availability");

class FlightDetails {

    /**
    * @param {string} id
    * @param {string} name
    * @param {string} airline
    * @param {string} source
    * @param {string} destination
    * @param {ClassSeatAvailablity[]} seatAvailabilities
    */
    constructor(id, name, airline, source, destination, seatAvailabilities) {
        this.id = id;
        this.name = name;
        this.airline = airline;
        this.source = source;
        this.destination = destination;
        this.seatAvailabilities = seatAvailabilities;
    }

    isValidFlight(){
        if(this.id==null)
            return false;
        return true;
    }

    /**
     * @param {ClassSeatAvailablity} seatAvailability
    */
    isClassTypeAlreadyExist(seatClassType){
        let seats = this.seatAvailabilities;

        for(let seat of seats){
            if(seat.classType==seatClassType)
                return true;
        }

        return false;
    }

    /**
     * @param {ClassSeatAvailablity} seatAvailability
    */
    addSeatAvailability(seatAvailability){

        if(this.isClassTypeAlreadyExist(seatAvailability.classType))
            return false;

        this.seatAvailabilities.push(seatAvailability);
        return true;
    }

    /**
     * @param {ClassSeatAvailablity} seatAvailability
    */
    updateSeatAvailability(seatAvailability){
        if(!this.isClassTypeAlreadyExist(seatAvailability.classType))
            return false;

        let seats = this.seatAvailabilities;
        for(let seatNumber in seats){
            if(seats[seatNumber].classType == seatAvailability.classType)
                seats[seatNumber]=seatAvailability;
        }
        return true;
        
    }

    /**
     * @param {ClassSeatAvailablity} seatAvailability
    */
     updateSeatAvailability(seatAvailability){
        if(!this.isClassTypeAlreadyExist(seatAvailability.classType))
            return false;

        let seats = this.seatAvailabilities;
        for(let seatNumber in seats){
            if(seats[seatNumber].classType == seatAvailability.classType)
                seats[seatNumber]=seatAvailability;
        }
        return true;
        
    }
    /**
     * @param {ClassSeatAvailablity} seatAvailability
    */
     removeSeatAvailability(seatAvailability){
        if(!this.isClassTypeAlreadyExist(seatAvailability.classType))
            return false;

        let seats = this.seatAvailabilities;
        const index = seats.indexOf(seatAvailability);
        if (index > -1) { 
            seats.splice(index, 1); 
        }
        return true;
        
    }

    bookSeat(seatClassType){
        if(!this.isClassTypeAlreadyExist(seatClassType))
            return false;
        // return false;

        let index = -1;
        let seats = this.seatAvailabilities;
        for(let idx in seats){
            if(seats[idx].classType==seatClassType)
            index=idx;
        }

        if(index==-1)
        return false;

        if(seats[index].availableSeats.length>0){
            this.seatAvailabilities[index].availableSeats.pop()
            return true;
        }

        return false;

    }



}

module.exports.FlightDetails = FlightDetails;
