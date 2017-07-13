import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import './Widget.css';

class WidgetRefineSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minPrice: props.refinePriceRange.minPrice,
      maxPrice: props.refinePriceRange.maxPrice,
      selectedPriceRange: {
        min: props.refinePriceRange.minPrice,
        max: props.refinePriceRange.maxPrice
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!Object.is(this.props.refinePriceRange, nextProps.refinePriceRange)) {
      this.setState({
        minPrice: nextProps.refinePriceRange.minPrice,
        maxPrice: nextProps.refinePriceRange.maxPrice,
        selectedPriceRange: {
          min: nextProps.refinePriceRange.minPrice,
          max: nextProps.refinePriceRange.maxPrice
        }
      });
    }
  }

  render() {
    return (
      <div className={"widget refine-search-widget" + (this.props.isActive ? " show" : "")}>
        <div className="widget-body">
          <h3 className="widget-title">Refine Flight Search</h3>
          <div className="form-elements">
            <div className="form-element">
              <label>Select Price Range (INR)</label>
              <div className="input-range-container">
                <InputRange
                    minValue={this.state.minPrice}
                    maxValue={this.state.maxPrice}
                    step={100}
                    value={this.state.selectedPriceRange}
                    onChange={value => this.setState({ selectedPriceRange: value })}
                    onChangeComplete={this.props.handleRefine.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

WidgetRefineSearch.propTypes = {
  isActive: PropTypes.bool.isRequired,
  refinePriceRange: PropTypes.object.isRequired,
  handleRefine: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired
}

WidgetRefineSearch.defaultProps = {
  isActive: false,
  refinePriceRange: {
    minPrice: 0,
    maxPrice: 50000
  }
}

export default WidgetRefineSearch;
