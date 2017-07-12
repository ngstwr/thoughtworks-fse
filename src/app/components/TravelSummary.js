import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TravelSummary = props => {
  const isReturnTrip = props.travelPlan.bookingType === 'return';

  return (
    <div className="travel-summary">
      <h2 className="origin-destination">
        {props.travelPlan.origin.name}
        <span className="separator"> &gt; </span>
        {props.travelPlan.destination.name}
        {
          isReturnTrip &&
            <span>
              <span className="separator"> &gt; </span>
              {props.travelPlan.origin.name}
            </span>
        }
      </h2>
      <div className="depart-return">
        <div className="depart-date">
          <label>Depart: </label>
          <p>{props.travelPlan.departureDate}</p>
        </div>
        {
          isReturnTrip &&
            <div className="return-date">
              <label>Return: </label>
              <p>{props.travelPlan.returnDate}</p>
            </div>
        }
      </div>
    </div>
  )
}

TravelSummary.propTypes = {
  travelPlan: PropTypes.object.isRequired
}

export default TravelSummary;
