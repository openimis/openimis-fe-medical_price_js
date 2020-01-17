import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPriceLists } from "../actions";
import _ from "lodash";

class PriceListLoader extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevProps.fetchingPrice, this.props.fetchingPrice)) {
            this.props.fetchPriceLists(this.props.fetchingPrice);
        }
    }
    render() {
        return null;
    }
}

const mapStateToProps = state => ({
    fetchingPrice: state.medical_pricelist.fetchingPrice,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchPriceLists }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(PriceListLoader);