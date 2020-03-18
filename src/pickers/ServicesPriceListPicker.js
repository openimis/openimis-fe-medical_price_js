import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";

import {
    formatMessage,
    SelectInput
} from "@openimis/fe-core";
import { fetchServicesPriceLists } from "../actions"

class ServicesPriceListPicker extends Component {
    state = {
        baseOptions: [],
        nationalOptionFecthed: false,
        nationalOptions: [],
        regionOptions: [],
        districtOptions: [],
    }

    _nullOption = {
        value: null,
        label: formatMessage(this.props.intl, "medical_pricelist", this.props.nullLabel || "empty")
    }

    setOptions = (prevProps) => {
        if (prevProps.withNull !== this.props.withNull) {
            this.setState({ baseOptions: [this._nullOption] });
            return true;
        }
        if (!_.isEqual(prevProps.region, this.props.region)) {
            if (!this.props.region) {
                this.setState({ regionOptions: [] })
            } else {
                this.props.fetchServicesPriceLists(this.props.region);
            }
            return true;
        }
        if (!_.isEqual(prevProps.district, this.props.district)) {
            if (!this.props.district) {
                this.setState({ districtOptions: [] })
            } else {
                this.props.fetchServicesPriceLists(this.props.district);
            }
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.setOptions({});
        this.props.fetchServicesPriceLists();
    }

    formatOption = (o) => { return { value: o, label: o.name } }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.nationalOptionFecthed && !_.isEqual(prevProps.fetchedServicesPricelists, this.props.fetchedServicesPricelists)) {
            this.setState({
                nationalOptionFecthed: true,
                nationalOptions: this.props.servicesPricelists.map(this.formatOption)
            })
            return
        }
        if (!this.setOptions(prevProps)) {
            if (!_.isEqual(prevProps.fetchedServicesPricelists, this.props.fetchedServicesPricelists)
                && !!this.props.fetchedServicesPricelists) {
                if (!!this.props.fetchedServicesPricelists.location.parent) {
                    this.setState({
                        districtOptions: this.props.servicesPricelists.map(this.formatOption)
                    })
                } else {
                    this.setState({
                        regionOptions: this.props.servicesPricelists.map(this.formatOption)
                    })
                }
            }
        }
    }

    render() {
        const { name, value, onChange, readOnly } = this.props;
        let options = [
            ...this.state.baseOptions,
            ...this.state.nationalOptions,
            ...this.state.regionOptions,
            ...this.state.districtOptions,
        ];
        return <SelectInput
            module="medical_pricelist" label="servicesPricelist"
            options={options}
            name={name}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
        />
    }
}

const mapStateToProps = state => ({
    fetchedServicesPricelists: state.medical_pricelist.fetchedServicesPricelists,
    servicesPricelists: state.medical_pricelist.servicesPricelists,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchServicesPriceLists }, dispatch);
};


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ServicesPriceListPicker));