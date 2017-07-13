import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import AirportAPI from '../../apis/Airport';

import 'react-select/dist/react-select.css';
import './Widget.css';

class WidgetTravelPlan extends Component {
  constructor(props) {
    super();

    this.state = {
        bookingType: "return",
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        passengersCount: 1,
        searchErrors: {}
    }

    this.toggleBookingType = this.toggleBookingType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearErrorMessages = this.clearErrorMessages.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.renderSelectedValue = this.renderSelectedValue.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  toggleBookingType(type, event) {
    this.setState(() => {
      return {
        bookingType: type
      }
    });
    if(type !== 'return'){
      this.clearErrorMessages('returnDate');
    }
  }

  clearErrorMessages(field){
    this.setState((prevState) => {
      let searchErrorsUpdated = prevState.searchErrors;
      delete searchErrorsUpdated[field];

      if(Object.keys(searchErrorsUpdated).length === 1 && searchErrorsUpdated.hasOwnProperty("overall")){
        searchErrorsUpdated = {};
      }

      return {
        searchErrors: searchErrorsUpdated
      };
    });
  }

  handleSelectChange(field, selectedValue) {
    let object = {};
    object[field] = selectedValue;
    this.setState(object);
    this.clearErrorMessages(field);
  }

  handleChange(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
    this.clearErrorMessages(field);
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({ searchErrors: {} });
    const updatedPlan = {
      bookingType: this.state.bookingType,
      origin: this.state.origin,
      destination: this.state.destination,
      departureDate: this.state.departureDate,
      returnDate: this.state.returnDate,
      passengersCount: this.state.passengersCount,
    };
    if(this.validateForm(updatedPlan)){
      this.props.toggleForm('PlanForm');
      this.props.handleSearch(updatedPlan);
    }else{
      this.setState((prevState) => {
        let searchErrorsUpdated = prevState.searchErrors;
        searchErrorsUpdated.overall = 'Please enter your travel plan';
        return {
          searchErrors: searchErrorsUpdated
        };
      });
    }
  }

  validateForm(planObj){
    let errorsObj = {};

    if(!planObj.origin){
      errorsObj.origin = 'Select your departure city'
    }

    if(!planObj.destination){
      errorsObj.destination = 'Select your destination city'
    }

    if(!planObj.departureDate){
      errorsObj.departureDate = 'Select your departure date'
    }

    if(planObj.bookingType === 'return' && !planObj.returnDate){
      errorsObj.returnDate = 'Select your return date'
    }

    if(!planObj.passengersCount || planObj.passengersCount < 1){
      errorsObj.passengersCount = 'Enter number of passengers'
    }

    this.setState({ searchErrors: errorsObj });
    return Object.keys(errorsObj).length === 0 && errorsObj.constructor === Object;
  }

  getOptions(input) {
    return AirportAPI.fetchAirports(input)
      .then((response) => {
        return { options: response };
      });
  }

  renderSelectedValue(selectedValue){
    return `${selectedValue.city}, ${selectedValue.country} (${selectedValue.code})`;
  }

  render() {
    const isReturn = this.state.bookingType === "return",
          originCode = this.state.origin? this.state.origin.code : '',
          destinationCode = this.state.destination? this.state.destination.code : '';
    let searchErrors = this.state.searchErrors;

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
              <Select.Async
                  name="origin-city"
                  autoBlur={true}
                  labelKey="city"
                  valueKey="code"
                  placeholder="Enter Origin City"
                  loadOptions={this.getOptions.bind(this)}
                  value={originCode}
                  valueRenderer={this.renderSelectedValue.bind(this)}
                  onChange={this.handleSelectChange.bind(this, 'origin')} />
              { searchErrors.origin && <p className="error-label">{searchErrors.origin}</p> }
            </div>
            <div className="form-element">
              <label>Enter Destination City</label>
              <Select.Async
                  name="destination-city"
                  autoBlur={true}
                  labelKey="city"
                  valueKey="code"
                  placeholder="Enter Destination City"
                  loadOptions={this.getOptions.bind(this)}
                  value={destinationCode}
                  valueRenderer={this.renderSelectedValue.bind(this)}
                  onChange={this.handleSelectChange.bind(this, 'destination')} />
              { searchErrors.destination && <p className="error-label">{searchErrors.destination}</p> }
            </div>
            <div className="form-element">
              <label>Departure Date</label>
              <input type="date" value={this.state.departureDate} placeholder="Departure Date"
                      onChange={this.handleChange.bind(this, 'departureDate')} />
              { searchErrors.departureDate && <p className="error-label">{searchErrors.departureDate}</p> }
            </div>
            {
              isReturn &&
              <div className="form-element">
                <label>Return Date</label>
                <input type="date"
                        min={this.state.departureDate}
                        value={this.state.returnDate}
                        placeholder="Return Date"
                        onChange={this.handleChange.bind(this, 'returnDate')} />
                { searchErrors.returnDate && <p className="error-label">{searchErrors.returnDate}</p> }
              </div>
            }
            <div className="form-element">
              <label>Passengers</label>
              <input type="number"
                      min={1}
                      max={20}
                      value={this.state.passengersCount}
                      placeholder="Passengers"
                      onChange={this.handleChange.bind(this, 'passengersCount')} />
              { searchErrors.passengersCount && <p className="error-label">{searchErrors.passengersCount}</p> }
            </div>

            {
              searchErrors.overall &&
                <div className="overall-error-label">
                  <p>{searchErrors.overall}</p>
                </div>
            }

            <button type="submit" className="btn btn-search">Search Flights</button>
          </div>
        </form>
      </div>
    )
  }
}

WidgetTravelPlan.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired
}

WidgetTravelPlan.defaultProps = {
  isActive: false
}

export default WidgetTravelPlan;
