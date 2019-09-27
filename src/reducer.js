import { parseData, formatServerError, formatGraphQLError } from '@openimis/fe-core';

function arrayToMap(arr) {
    return arr.reduce((map, a) => { map[a.id] = a.priceOverrule; return map }, {});
}

function reducer(
    state = {
        fetchingPrice: null,
        fetchingPricelist: false,
        fetchedPricelist: false,
        pricelist: {},
        errorPricelist: null,
    },
    action,
) {
    switch (action.type) {
        case 'CLAIM_EDIT_HEALTH_FACILITY_SET':
            return {
                ...state,
                fetchingPrice: action.payload,
                fetchingPricelist: false,
                fetchedPricelist: false,
                pricelist: {},
                errorPricelist: null,
            };
        case 'MEDICAL_PRICELIST_LOAD_REQ':
            return {
                ...state,
                fetchingPricelist: true,
                fetchedPricelist: false,
                pricelist: {},
                errorPricelist: null,
            };
        case 'MEDICAL_PRICELIST_LOAD_RESP':
            return {
                ...state,
                fetchingPricelist: false,
                fetchedPricelist: true,         
                pricelist: {
                    services: arrayToMap(action.payload.data.pricelists.services),
                    items: arrayToMap(action.payload.data.pricelists.items)
                },
                errorPricelist: formatGraphQLError(action.payload)
            };
        case 'MEDICAL_PRICELIST_LOAD_ERR':
            return {
                ...state,
                fetchingPricelist: false,
                errorPricelist: formatServerError(action.payload)
            };
        default:
            return state;
    }
}

export default reducer;
