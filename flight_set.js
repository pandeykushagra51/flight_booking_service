const { FlightDetails } = require("./models/flight_details");

class FlightSet{
    constructor(){
        this.flights = {};
    }

    /**
     * Add flight detail
     * @param {FlightDetails} flightDetails
    */
    addFlight(flightDetails){

        if(!flightDetails.isValidFlight()) 
            return false;

        let flightId = flightDetails.id;
        
        if(flightId in this.flights)
            return false;
        
        this.flights.flightId = flightDetails;

    }

    /**
     * 
     * @param {FlightDetails} flightDetails 
     */
    isFlightAlreadyExist(flightDetails){
        if(!flightDetails.isValidFlight())
            return false;

        let flightId = flightDetails.id;
    
        if(flightId in this.flights)
            return false;
        
        return true;
    }

}

module.exports = {FlightSet}