import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import { fetchServicesPriceLists } from "../actions"
import PriceListPicker from "./PriceListPicker";

class ServicesPriceListPicker extends Component {
    render() {
        const { name, value, onChange, readOnly, region, district } = this.props;
        return <PriceListPicker
            label="servicesPricelist"
            fetchPriceLists={this.props.fetchServicesPriceLists}
            name={name}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
            region={region}
            district={district}
        />
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchServicesPriceLists }, dispatch);
};


export default injectIntl(connect(null, mapDispatchToProps)(ServicesPriceListPicker));
