import Flight from './Flight';

describe('API Flight', () => {

  describe('fetchFlights Promise', () => {
    const travelPlan = {
        bookingType: "return",
        origin: {
          code: "PNQ"
        },
        destination: {
          code: "DEL"
        }
      },
      expectedForOneWayFlight = [{
        planId: expect.any(String),
        totalAmount: expect.any(Number),
        toFlight: expect.any(Object)
      }],
      expectedForReturnFlight = [{
        planId: expect.any(String),
        totalAmount: expect.any(Number),
        toFlight: expect.any(Object),
        returnFlight: expect.any(Object)
      }];

    const travelPlanUnavailable = Object.assign({}, travelPlan, { destination: { code: "RPR" } });

    it('should be rejected if travel plan is not passed', () => {
      expect.assertions(1);
      return expect(Flight.fetchFlights()).rejects.toBeDefined();
    });

    it('should return an empty array if no flights is matched with travel plan', () => {
      expect.assertions(1);
      return Flight.fetchFlights(travelPlanUnavailable).then(data => {
        expect(data).toEqual([]);
      });
    });

    it('should return an array of objects according to one way travel plan', () => {
      const oneWayTravelPlan = Object.assign({}, travelPlan, { bookingType: "oneway" });

      expect.assertions(1);
      return Flight.fetchFlights(oneWayTravelPlan)
        .then(data => {
          expect(data).toEqual(expect.arrayContaining(expectedForOneWayFlight));
        });
    });

    it('should return an array of objects according to return travel plan', () => {
      expect.assertions(1);
      return Flight.fetchFlights(travelPlan)
        .then(data => {
          expect(data).toEqual(expect.arrayContaining(expectedForReturnFlight));
        });
    });

  });

});
