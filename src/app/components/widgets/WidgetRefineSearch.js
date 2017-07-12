import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Widget.css';

class WidgetRefineSearch extends Component {
  constructor(props) {
    super();

    this.state = {
      minPrice: 0,
      maxPrice: 10000
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
    this.props.handleRefine(this.state);
  }

  render() {
    return (
      <div className={"widget refine-search-widget" + (this.props.isActive ? " show" : "")}>
        <div className="widget-body">
          <h3>Refine Flight Search</h3>
          <div className="form-element">
            <label>Minimum Price</label>
            <input type="number" value={this.state.minPrice}
                    min="0" max={this.state.maxPrice}
                    placeholder="Enter Minimum Price"
                    onChange={this.handleChange.bind(this, 'minPrice')} />
          </div>
          <div className="form-element">
            <label>Maximum Price</label>
            <input type="number" value={this.state.maxPrice}
                    min={this.state.minPrice} max="10000"
                    placeholder="Enter Maximum Price"
                    onChange={this.handleChange.bind(this, 'maxPrice')} />
          </div>
        </div>
      </div>
    )
  }
}

WidgetRefineSearch.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleRefine: PropTypes.func.isRequired
}

WidgetRefineSearch.defaultProps = {
  isActive: false
}

export default WidgetRefineSearch;
