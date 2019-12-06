import { graphql, formatQuery, decodeId } from "@openimis/fe-core";

export function fetchPriceList(hf) {
    let filters = []
    let projections = []

    if (!hf.servicePricelist && !hf.itemPricelist) {
        //nothing to do...
        return dispatch => {}
    }
    if (!!hf.servicePricelist) {
        filters.push(`servicePricelistId: ${decodeId(hf.servicePricelist.id)}`);
        projections.push("services{id,priceOverrule}");
    }
    if (!!hf.itemPricelist) {
        filters.push(`itemPricelistId: ${decodeId(hf.itemPricelist.id)}`);
        projections.push("items{id,priceOverrule}");
    }
    let payload = formatQuery("pricelists",
        filters, projections
    );
    return graphql(payload, 'MEDICAL_PRICELIST_LOAD');
}