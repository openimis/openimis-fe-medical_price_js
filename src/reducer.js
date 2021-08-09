import { formatServerError, formatGraphQLError } from "@openimis/fe-core";

function arrayToMap(arr) {
  return arr.reduce((map, a) => {
    map[a.id] = a.p;
    return map;
  }, {});
}

function reducer(
  state = {
    fetchingPrice: null,
    fetchingPricelist: false,
    fetchedPricelist: false,
    servicesPricelists: {},
    itemsPricelists: {},
    errorPricelist: null,
  },
  action
) {
  switch (action.type) {
    case "CLAIM_EDIT_HEALTH_FACILITY_SET":
      return {
        ...state,
        fetchingPrice: action.payload,
        fetchingPricelist: false,
        fetchedPricelist: false,
        pricelist: {},
        errorPricelist: null,
      };
    case "MEDICAL_PRICELIST_LOAD_REQ":
      return {
        ...state,
        fetchingPricelist: true,
        fetchedPricelist: false,
        pricelist: {},
        errorPricelist: null,
      };
    case "MEDICAL_PRICELIST_LOAD_RESP":
      let itemsPricelists = { ...state.itemsPricelists };
      if (!!action.meta.itemsPricelist) {
        itemsPricelists[action.meta.itemsPricelist] = arrayToMap(action.payload.data.pricelists.items);
      }
      let servicesPricelists = { ...state.servicesPricelists };
      if (!!action.meta.servicesPricelist) {
        servicesPricelists[action.meta.servicesPricelist] = arrayToMap(action.payload.data.pricelists.services);
      }
      return {
        ...state,
        fetchingPricelist: false,
        fetchedPricelist: true,
        itemsPricelists,
        servicesPricelists,
        errorPricelist: formatGraphQLError(action.payload),
      };
    case "MEDICAL_PRICELIST_LOAD_ERR":
      return {
        ...state,
        fetchingPricelist: false,
        errorPricelist: formatServerError(action.payload),
      };
    default:
      return state;
  }
}

export default reducer;
