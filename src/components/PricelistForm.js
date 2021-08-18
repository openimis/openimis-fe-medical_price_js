import React from "react";
import { combine, withHistory, withModulesManager, Form } from "@openimis/fe-core";
import PricelistGeneralPanel from "./PricelistGeneralPanel";
import PricelistDetailsPanel from "./PricelistDetailsPanel";
import ReplayIcon from "@material-ui/icons/Replay";

const PricelistForm = (props) => {
  const { readOnly, onBack, onSave, onReset, pricelist, onChange, fetchDetails, details } = props;
  const canSave = () => pricelist.name && pricelist.location && pricelist.pricelistDate;
  return (
    <>
      <Form
        module="medical_pricelist"
        title={pricelist.uuid ? "medical_pricelist.pricelistForm.title" : "medical_pricelist.pricelistForm.emptyTitle"}
        titleParams={{ label: pricelist.name ?? "" }}
        readOnly={readOnly || pricelist.validityTo}
        edited={pricelist}
        edited_id={pricelist.uuid}
        HeadPanel={PricelistGeneralPanel}
        Panels={[PricelistDetailsPanel]}
        save={onSave}
        back={onBack}
        canSave={canSave}
        onEditedChanged={onChange}
        details={details}
        fetchDetails={fetchDetails}
        actions={[
          {
            doIt: onReset,
            icon: <ReplayIcon />,
            onlyIfDirty: !readOnly,
          },
        ]}
      />
    </>
  );
};

const enhance = combine(withHistory, withModulesManager);
export default enhance(PricelistForm);
