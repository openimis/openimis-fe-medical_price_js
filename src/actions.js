import { graphql, formatQuery, formatPageQuery, decodeId } from "@openimis/fe-core";

export function fetchPriceLists(servicesPricelist, itemsPricelist) {
    let filters = []
    let projections = []
    if (!servicesPricelist && !itemsPricelist) {
        // nothing to do
        return dispatch => { }
    }
    if (!!servicesPricelist) {
        filters.push(`servicesPricelistId: ${decodeId(servicesPricelist.id)}`);
        projections.push("services{id,priceOverrule}");
    }
    if (!!itemsPricelist) {
        filters.push(`itemsPricelistId: ${decodeId(itemsPricelist.id)}`);
        projections.push("items{id,priceOverrule}");
    }
    let payload = formatQuery("pricelists",
        filters, projections
    );
    return graphql(payload, 'MEDICAL_PRICELIST_LOAD', {
        servicesPricelist: !!servicesPricelist && servicesPricelist.id,
        itemsPricelist: !!itemsPricelist && itemsPricelist.id
    });
}

export function fetchServicesPriceLists(location) {
    let filters = null
    if (!!location) {
        filters = [`location_Uuid:"${location.uuid}"`]
    }
    let projections = ["id", "uuid", "name"]
    let payload = formatPageQuery("servicesPricelists",
        filters, projections
    );
    return graphql(payload, 'MEDICAL_LOCATION_SERVICES_PRICELIST', { location });
}

export function fetchItemsPriceLists(location) {
    let filters = null
    if (!!location) {
        filters = [`location_Uuid:"${location.uuid}"`]
    }
    let projections = ["id", "uuid", "name"]
    let payload = formatPageQuery("itemsPricelists",
        filters, projections
    );
    return graphql(payload, 'MEDICAL_LOCATION_ITEMS_PRICELIST', { location });
}