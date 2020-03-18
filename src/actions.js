import { graphql, formatQuery, formatPageQuery, decodeId } from "@openimis/fe-core";

export function fetchPriceLists(hf) {
    let filters = []
    let projections = []
    if (!hf.servicesPricelist && !hf.itemsPricelist) {
        //nothing to do...
        return dispatch => { }
    }
    if (!!hf.servicesPricelist) {
        filters.push(`servicesPricelistId: ${decodeId(hf.servicesPricelist.id)}`);
        projections.push("services{id,priceOverrule}");
    }
    if (!!hf.itemsPricelist) {
        filters.push(`itemsPricelistId: ${decodeId(hf.itemsPricelist.id)}`);
        projections.push("items{id,priceOverrule}");
    }
    let payload = formatQuery("pricelists",
        filters, projections
    );
    return graphql(payload, 'MEDICAL_PRICELIST_LOAD');
}

export function fetchServicesPriceLists(location) {
    let filters = [`${!!location ? `location_Uuid:"${location.uuid}"` : "location_Isnull: true"}`]
    let projections = ["id", "uuid", "name"]
    let payload = formatPageQuery("servicesPricelists",
        filters, projections
    );
    return graphql(payload, 'MEDICAL_LOCATION_SERVICES_PRICELIST', { location });
}

export function fetchItemsPriceLists(location) {
    let filters = [`${!!location ? `location_Uuid:"${location.uuid}"` : "location_Isnull: true"}`]
    let projections = ["id", "uuid", "name"]
    let payload = formatPageQuery("itemsPricelists",
        filters, projections
    );
    return graphql(payload, 'MEDICAL_LOCATION_ITEMS_PRICELIST', { location });
}