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
        fetchingServicesPricelists: false,
        fetchedServicesPricelists: false,
        servicesPricelists: [],
        errorServicesPricelists: null,
        fetchingItemssPricelists: false,
        fetchedItemsPricelists: false,
        itemsPricelists: [],
        errorItemsPricelists: null,
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
        case 'MEDICAL_LOCATION_SERVICES_PRICELIST_REQ':
            return {
                ...state,
                fetchingServicesPricelists: true,
                fetchedServicesPricelists: false,
                servicesPricelists: [],
                errorServicesPricelists: null,
            };
        case 'MEDICAL_LOCATION_SERVICES_PRICELIST_RESP':
            return {
                ...state,
                fetchingServicesPricelists: false,
                fetchedServicesPricelists: action.meta,
                servicesPricelists: parseData(action.payload.data.servicesPricelists),
                errorServicesPricelists: formatGraphQLError(action.payload)
            };
        case 'MEDICAL_LOCATION_SERVICES_PRICELIST_ERR':
            return {
                ...state,
                fetchingServicesPricelists: false,
                errorServicesPricelists: formatServerError(action.payload)
            };
        case 'MEDICAL_LOCATION_ITEMS_PRICELIST_REQ':
            return {
                ...state,
                fetchingItemsPricelists: true,
                fetchedItemsPricelists: false,
                itemsPricelists: [],
                errorItemsPricelists: null,
            };
        case 'MEDICAL_LOCATION_ITEMS_PRICELIST_RESP':
            return {
                ...state,
                fetchingItemsPricelists: false,
                fetchedItemsPricelists: action.meta,
                itemsPricelists: parseData(action.payload.data.itemsPricelists),
                errorItemsPricelists: formatGraphQLError(action.payload)
            };
        case 'MEDICAL_LOCATION_ITEMS_PRICELIST_ERR':
            return {
                ...state,
                fetchingItemsPricelists: false,
                errorItemsPricelists: formatServerError(action.payload)
            };
        default:
            return state;
    }
}

export default reducer;
