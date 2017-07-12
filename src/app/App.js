import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './components/Loading';
import Header from './components/header/Header';
import WidgetTravelPlan from './components/widgets/WidgetTravelPlan';
import WidgetRefineSearch from './components/widgets/WidgetRefineSearch';
import TravelSummary from './components/TravelSummary';
import Flights from './components/flights/Flights';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      travelPlan: {
        bookingType: "return",
        origin: {
          code: "PNQ",
          name: "Pune"
        },
        destination: {
          code: "DEL",
          name: "Delhi"
        },
        departureDate: "11-03-2017",
        returnDate: "13-03-2017",
        passengersCount: 1,
        minPrice: 0,
        maxPrice: 10000
      },
      mobileActiveForm: "PlanForm",
      resultFlights: [
        {
          "planId": "232123-232124",
          "toFlight": {
            "flightId": "232123",
            "airlineCode": "AI",
            "flightNumber": "202",
            "aircraftType": "Boeing",
            "origin": {
              "code": "PNQ",
              "name": "Pune"
            },
            "destination": {
              "code": "DEL",
              "name": "Delhi"
            },
            "departureTime": "10:00",
            "arrivalTime": "12:00",
            "stops": null,
            "fare": {
              "classCode": "ECO",
              "classDesc": "Economy Class",
              "baggageAllowed": "15 kg",
              "basicAmount": 5000
            }
          },
          "returnFlight": {
            "flightId": "232124",
            "airlineCode": "AI",
            "flightNumber": "202",
            "aircraftType": "Boeing",
            "origin": {
              "code": "DEL",
              "name": "Delhi"
            },
            "destination": {
              "code": "PNQ",
              "name": "Pune"
            },
            "departureTime": "10:50",
            "arrivalTime": "13:00",
            "stops": null,
            "fare": {
              "classCode": "ECO",
              "classDesc": "Economy Class",
              "baggageAllowed": "15 kg",
              "basicAmount": 4500
            }
          }
        }
      ],
      loading: false
    }

    this.toggleActiveForm = this.toggleActiveForm.bind(this);
    this.searchFlights = this.searchFlights.bind(this);
    this.updateTravelPlan = this.updateTravelPlan.bind(this);
  }

  toggleActiveForm(formName){
    this.setState((prevState) => {
      return {
        mobileActiveForm: (formName !== prevState.mobileActiveForm) ? formName : "none"
      }
    });
  }

  searchFlights(travelPlan){
    this.setState(() => {
      return {
        resultFlights: []
      }
    });
  }

  updateTravelPlan(travelPlan){
    console.log(travelPlan);
    this.setState((prevState) => {
      return {
        travelPlan: Object.assign({}, prevState.travelPlan, travelPlan)
      }
    })

    this.searchFlights(this.state.travelPlan);
  }

  render() {
    const { travelPlan, mobileActiveForm, resultFlights, loading } = this.state;

      // travelPlan: {
      //   bookingType: "return",
      //   origin: "PNQ",
      //   destination: "DEL",
      //   departureDate: "11-03-2017",
      //   returnDate: "13-03-2017",
      //   passengersCount: 1,
      //   minPrice: 0,
      //   maxPrice: 10000
      // },
    return (
      <div className="App">

        <Header activeForm={mobileActiveForm} handleToggle={this.toggleActiveForm} />

        <div className="page-container container">
          <div className="sidebar">
            <WidgetTravelPlan
                isActive={mobileActiveForm==="PlanForm"}
                handleSearch={this.updateTravelPlan} />

            <WidgetRefineSearch
                isActive={mobileActiveForm==="RefineForm"}
                handleRefine={this.updateTravelPlan} />
          </div>

          <div className="content">
            {
              loading &&
                <Loading />
            }
            {
              !loading && !resultFlights &&
                <div className="empty">
                  <h3>Enter your travel plan</h3>
                </div>
            }
            {
              !loading && resultFlights &&
                <div className="content-wrapper">
                  <TravelSummary travelPlan={travelPlan} />
                  <Flights flights={resultFlights} />
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
