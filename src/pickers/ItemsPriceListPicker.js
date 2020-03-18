import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";

import {
    formatMessage,
    SelectInput
} from "@openimis/fe-core";
import { fetchItemsPriceLists } from "../actions"

class ItemsPriceListPicker extends Component {
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
                this.props.fetchItemsPriceLists(this.props.region);
            }
            return true;
        }
        if (!_.isEqual(prevProps.district, this.props.district)) {
            if (!this.props.district) {
                this.setState({ districtOptions: [] })
            } else {
                this.props.fetchItemsPriceLists(this.props.district);
            }
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.setOptions({});
        this.props.fetchItemsPriceLists();
    }

    formatOption = (o) => { return { value: o, label: o.name } }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.nationalOptionFecthed && !_.isEqual(prevProps.fetchedItemsPricelists, this.props.fetchedItemsPricelists)) {
            this.setState({
                nationalOptionFecthed: true,
                nationalOptions: this.props.itemsPricelists.map(this.formatOption)
            })
            return
        }
        if (!this.setOptions(prevProps)) {
            if (!_.isEqual(prevProps.fetchedItemsPricelists, this.props.fetchedItemsPricelists)
                && !!this.props.fetchedItemsPricelists) {
                if (!!this.props.fetchedItemsPricelists.location.parent) {
                    this.setState({
                        districtOptions: this.props.itemsPricelists.map(this.formatOption)
                    })
                } else {
                    this.setState({
                        regionOptions: this.props.itemsPricelists.map(this.formatOption)
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
            module="medical_pricelist" label="itemsPricelist"
            options={options}
            name={name}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
        />
    }
}

const mapStateToProps = state => ({
    fetchedItemsPricelists: state.medical_pricelist.fetchedItemsPricelists,
    itemsPricelists: state.medical_pricelist.itemsPricelists,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchItemsPriceLists }, dispatch);
};


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ItemsPriceListPicker));