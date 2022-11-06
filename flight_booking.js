"use strict";

const { FlightSet } = require("./flight_set");
const { FlightDetails } = require("./models/flight_details");
const { SearchResponse } = require("./models/search_response");
const { ClassSeatAvailablity } = require("./models/seat_availability");

var flightDetailsMap = {};
var flights = [];   

/**
 * Add flight detail
 * @param {FlightDetails} flightDetails
 * @return {boolean} true if add is successful else false
*/
var add = (flightDetails) => {
    if(!flightDetails.isValidFlight())
        return false;

    let flightId = flightDetails.id;

    if(flightDetailsMap.isFlightAlreadyExist(flightId))
        return false;

    flightDetailsMap.addFlight(flightDetails);
    return true;
    
}

/**
 * Add {ClassSeatAvailablity} to given fightId
 * @param {string} flightId
 * @param {ClassSeatAvailablity} seatAvailability
 * @return {boolean} true if add is successful else false
*/
var addSeatAvailability = (flightId, seatAvailability) => {
    if(!flightDetailsMap.isFlightAlreadyExist(flightId))
        return false;
    
    return flightDetailsMap[flightId].addSeatAvailability(seatAvailability);
    
}

/**
 * Update {ClassSeatAvailablity} to given fightId
 * @param {string} flightId
 * @param {ClassSeatAvailablity} seatAvailability
 * @return {boolean} true if update is successful else false
*/
var updateSeatAvailability = (flightId, seatAvailability) => {
    if(!flightDetailsMap.isFlightAlreadyExist(flightId))
        return false;
    return flightDetailsMap[flightId].updateSeatAvailability(seatAvailability);
}

/**
 * Remove {ClassSeatAvailablity} to given fightId
 * @param {string} flightId
 * @param {ClassSeatAvailablity} seatAvailability
 * @return {boolean} true if remove is successful else false
*/
var removeSeatAvailability = (flightId, seatAvailability) => {
    if(!flightDetailsMap.isFlightAlreadyExist(flightId))
        return false;
    
    return flightDetailsMap[flightId].removeSeatAvailability(seatAvailability);
}

/**
 * bookSeat does the booking of a seat for given class type and flight ID
 * @param {string} flightId
 * @param {string} classType
 * @return {boolean} true if booking is successful else false
*/
var bookSeat = (flightId, classType) => {
    if(!flightDetailsMap.isFlightAlreadyExist(flightId))
        return false;
    // return false;
    return flightDetailsMap[flightId].bookSeat(classType);
}

/**
 * Search function searches direct flight details from source to destination
 * @param {string} source
 * @param {string} destination
 * @return {SearchResponse} which matches the criteria
*/
var search = (source, destination) => {
    let ans = [];
    for(let flight of flights){
        // console.log(flight.source,flight.destination,source,destination)
        if(flight.source==source&&flight.destination==destination)
        ans.push(flight);
    }
    let searchResponse = new SearchResponse(ans.length,ans);
    return searchResponse;
}




/**
 * Add flight detail
 * @param {FlightDetails} flightDetails
*/
flightDetailsMap.addFlight = (flightDetails) => {

    if(!flightDetails.isValidFlight()) 
        return false;

    let flightId = flightDetails.id;
    
    if(flightId in flightDetailsMap)
        return false;
    
    flightDetailsMap[flightId] = flightDetails

    flights.push(flightDetails);
    

}

/**
 * 
 * @param {String} flightDetails 
 */
flightDetailsMap.isFlightAlreadyExist = (flightId) => {
    if(flightId in flightDetailsMap)
        return true;
    
    return false;
}



module.exports = {
    add : add,
    addSeatAvailability : addSeatAvailability,
    updateSeatAvailability : updateSeatAvailability,
    removeSeatAvailability : removeSeatAvailability,
    bookSeat : bookSeat,
    search : search
};