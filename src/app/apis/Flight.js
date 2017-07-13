import FlightsJSON from './data/flights.json';

function getFlightsBetween(flightsArr, fromAirportCode, toAirportCode){
  return flightsArr.filter((flight) => {
    return flight.origin.code === fromAirportCode && flight.destination.code === toAirportCode;
  });
}

function handleError(error) {
  console.warn(error);
  return null;
}

function fetchFlights(travelPlan) {
  return new Promise(
    function (resolve, reject) {
      try {
        if(!travelPlan || !travelPlan.hasOwnProperty("origin") || !travelPlan.hasOwnProperty("origin")){
          reject(new Error("Invalid travel plan"));
        }

        const originCode = travelPlan.origin.code,
              destinationCode = travelPlan.destination.code;
        let toFlightsArr, returnFlightsArr, flightPlansArr;

        toFlightsArr = getFlightsBetween(FlightsJSON, originCode, destinationCode);

        if(travelPlan.bookingType === 'return'){
          returnFlightsArr = getFlightsBetween(FlightsJSON, destinationCode, originCode);

          flightPlansArr = toFlightsArr.map((toFlight) => {
            return returnFlightsArr.map((returnFlight) => {
              return {
                planId: toFlight.flightId + '-' + returnFlight.flightId,
                totalAmount: toFlight.fare.basicAmount + returnFlight.fare.basicAmount,
                toFlight,
                returnFlight
              };
            });
          });

          flightPlansArr = flightPlansArr.reduce(function(a, b) {
            return a.concat(b);
          }, []);
        }else{
          flightPlansArr = toFlightsArr.map((toFlight) => {
            return {
              planId: toFlight.flightId + '-',
              totalAmount: toFlight.fare.basicAmount,
              toFlight
            };
          });
        }

        flightPlansArr = flightPlansArr.sort(function (a, b) {
          return a.totalAmount - b.totalAmount;
        });

        window.setTimeout(() => {
          resolve(flightPlansArr);
        }, 2000);

      } catch (error) {
        reject(error);
      }

    }
  );
}

function getPriceRange(flightsArr) {
  let priceRange = {
    minPrice: 0,
    maxPrice: 50000
  };
  if(flightsArr && flightsArr.length > 1){
    priceRange.minPrice = flightsArr[0].totalAmount;
    priceRange.maxPrice = flightsArr[flightsArr.length-1].totalAmount;
  }
  return priceRange;
}

function filterFlightsByPrice(flightsArr, refineRange){
  return flightsArr.filter((flight) => {
    return flight.totalAmount >= refineRange.min && flight.totalAmount <= refineRange.max;
  });
}

export default { fetchFlights, getPriceRange, filterFlightsByPrice };
