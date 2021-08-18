import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import { fetchItemsPriceLists } from "../actions";
import PriceListPicker from "./PriceListPicker";

class ItemsPriceListPicker extends Component {
  render() {
    const { name, value, onChange, readOnly, region, district } = this.props;
    return (
      <PriceListPicker
        label="itemsPricelist"
        fetchPriceLists={this.props.fetchItemsPriceLists}
        parseKey="itemsPricelists"
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        region={region}
        district={district}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchItemsPriceLists }, dispatch);
};

export default injectIntl(connect(null, mapDispatchToProps)(ItemsPriceListPicker));
