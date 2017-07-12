import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Widget.css';

class WidgetTravelPlan extends Component {
  constructor(props) {
    super();

    this.state = {
        bookingType: "return",
        origin: "PNQ",
        destination: "DEL",
        departureDate: "11-03-2017",
        returnDate: "13-03-2017",
        passengersCount: 1
    }

    this.toggleBookingType = this.toggleBookingType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleBookingType(type, event) {
    this.setState(() => {
      return {
        bookingType: type
      }
    });
  }

  handleChange(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleSearch(this.state);
  }

  render() {
    const isReturn = this.state.bookingType === "return";

    return (
      <div className={"widget travel-plan-widget" + (this.props.isActive ? " show" : "")}>
        <form className="widget-body" onSubmit={this.handleSubmit.bind(this)}>
          <div className="button-tabs">
            <button type="button" className={"btn btn-tab" + (isReturn ? "":" active")} onClick={this.toggleBookingType.bind(this, "oneway")}>One way</button>
            <button type="button" className={"btn btn-tab" + (isReturn ? " active":"")} onClick={this.toggleBookingType.bind(this, "return")}>Return</button>
          </div>
          <div className="form-elements">
            <div className="form-element">
              <label>Enter Origin City</label>
              <input type="text" value={this.state.origin} placeholder="Enter Origin City"
                      onChange={this.handleChange.bind(this, 'origin')} />
            </div>
            <div className="form-element">
              <label>Enter Destination City</label>
              <input type="text" value={this.state.destination} placeholder="Enter Destination City"
                      onChange={this.handleChange.bind(this, 'destination')} />
            </div>
            <div className="form-element">
              <label>Departure Date</label>
              <input type="date" value={this.state.departureDate} placeholder="Departure Date"
                      onChange={this.handleChange.bind(this, 'departureDate')} />
            </div>
            {
              isReturn &&
              <div className="form-element">
                <label>Return Date</label>
                <input type="date" value={this.state.returnDate} placeholder="Return Date"
                        onChange={this.handleChange.bind(this, 'returnDate')} />
              </div>
            }
            <div className="form-element">
              <label>Passengers</label>
              <input type="number" value={this.state.passengersCount} placeholder="Passengers"
                      onChange={this.handleChange.bind(this, 'passengersCount')} />
            </div>

            <button type="submit" className="btn btn-search">Search Flights</button>
          </div>
        </form>
      </div>
    )
  }
}

WidgetTravelPlan.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired
}

WidgetTravelPlan.defaultProps = {
  isActive: false
}

export default WidgetTravelPlan;
