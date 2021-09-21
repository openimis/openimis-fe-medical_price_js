import React, { useCallback, useState } from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { Tab as TabIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { useTranslations, ConfirmDialog, Searcher, withModulesManager } from "@openimis/fe-core";
import PricelistsFilters from "./PricelistsFilters";
const isRowDisabled = (_, row) => Boolean(row.validityTo);
const isRowLocked = () => false;

const formatLocation = (location) => {
  return location ? `${location.code} - ${location.name}` : "";
};

const HEADERS = [
  "medical_pricelist.name",
  "medical_pricelist.pricelist_date",
  "medical_pricelist.region",
  "medical_pricelist.district",
  "medical_pricelist.valid_from",
  "medical_pricelist.valid_to",
  "",
];
const ALIGNS = HEADERS.map((_, i) => i === HEADERS.length - 1 && "right");

const getAligns = () => ALIGNS;
const getHeaders = () => HEADERS;

const PricelistsSearcher = (props) => {
  const {
    pageInfo,
    items,
    isFetching,
    isFetched,
    cacheFiltersKey,
    canDelete,
    onDelete,
    modulesManager,
    onDoubleClick,
    onFiltersChange,
  } = props;
  const [confirmPricelistToDelete, setPricelistToDelete] = useState(null);
  const [resetKey, setResetKey] = useState();
  const { formatMessage, formatMessageWithValues, formatDateFromISO } = useTranslations(
    "medical_pricelist",
    modulesManager
  );

  const onDeleteConfirm = (isConfirmed) => {
    if (isConfirmed) {
      onDelete(confirmPricelistToDelete);
      setResetKey(Date.now());
    }
    setPricelistToDelete(null);
  };

  const itemFormatters = useCallback(
    () => [
      (pricelist) => pricelist.name,
      (pricelist) => formatDateFromISO(pricelist.pricelistDate),
      (pricelist) => formatLocation(pricelist.location?.parent || pricelist.location),
      (pricelist) => formatLocation(pricelist.location?.parent ? pricelist.location : null),
      (pricelist) => formatDateFromISO(pricelist.validityFrom),
      (pricelist) => formatDateFromISO(pricelist.validityTo),
      (pricelist) => (
        <>
          <Tooltip title={formatMessage("openNewTab")}>
            <IconButton onClick={() => onDoubleClick(pricelist, true)}>
              <TabIcon />
            </IconButton>
          </Tooltip>
          {canDelete(pricelist) && (
            <Tooltip title={formatMessage("deletePricelistTooltip")}>
              <IconButton onClick={() => setPricelistToDelete(pricelist)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    ],
    []
  );
  const filtersToQueryParams = useCallback((state) => {
    const params = Object.keys(state.filters)
      .filter((contrib) => !!state.filters[contrib].filter)
      .map((contrib) => state.filters[contrib].filter);
    params.push(`first: ${state.pageSize}`);
    if (state.afterCursor) {
      params.push(`after: "${state.afterCursor}"`);
    }
    if (state.beforeCursor) {
      params.push(`before: "${state.beforeCursor}"`);
    }
    return params;
  }, []);
  return (
    <>
      {confirmPricelistToDelete && (
        <ConfirmDialog
          confirm={{
            title: formatMessage("deletePricelistDialog.title"),
            message: formatMessageWithValues("deletePricelistDialog.message", { name: confirmPricelistToDelete.name }),
          }}
          onConfirm={onDeleteConfirm}
        />
      )}
      <Searcher
        key={resetKey}
        module="medical_pricelist"
        FilterPane={PricelistsFilters}
        cacheFiltersKey={cacheFiltersKey}
        items={items}
        itemsPageInfo={pageInfo}
        fetchingItems={isFetching}
        fetchedItems={isFetched}
        errorItems={null}
        tableTitle={formatMessageWithValues("pricelistsSearcher.table.title", {
          count: pageInfo.totalCount ?? 0,
        })}
        fetch={onFiltersChange}
        rowDisabled={isRowDisabled}
        rowLocked={isRowLocked}
        headers={getHeaders}
        aligns={getAligns}
        itemFormatters={itemFormatters}
        rowIdentifier={(r) => r.uuid}
        filtersToQueryParams={filtersToQueryParams}
        onDoubleClick={onDoubleClick}
      />
    </>
  );
};

export default withModulesManager(PricelistsSearcher);
