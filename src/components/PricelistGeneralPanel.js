import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import { FormPanel, withHistory, combine, withModulesManager, TextInput, PublishedComponent } from "@openimis/fe-core";

const styles = (theme) => ({
  item: theme.paper.item,
});

class PricelistGeneralPanel extends FormPanel {
  onRegionChange = (value) => {
    this.updateAttribute("location", value);
  };
  onDistrictChange = (value) => {
    this.updateAttribute("location", value ?? this.props.edited.location?.parent);
  };

  render() {
    const { classes, readOnly, edited } = this.props;
    const region = edited.location?.parent ?? edited.location;
    const district = edited.location?.parent ? edited.location : null;
    return (
      <>
        <Grid container>
          <Grid item xs={4} className={classes.item}>
            <TextInput
              module={"medical_pricelist"}
              label={"medical_pricelist.name"}
              onChange={(v) => this.updateAttribute("name", v)}
              required
              readOnly={readOnly}
              value={edited?.name ?? ""}
            />
          </Grid>
          <Grid item xs={3} className={classes.item}>
            <PublishedComponent
              pubRef="location.RegionPicker"
              value={region}
              required
              readOnly={readOnly}
              withNull={true}
              onChange={this.onRegionChange}
            />
          </Grid>
          <Grid item xs={3} className={classes.item}>
            <PublishedComponent
              region={region}
              value={district}
              pubRef="location.DistrictPicker"
              withNull={true}
              readOnly={readOnly}
              onChange={this.onDistrictChange}
            />
          </Grid>
          <Grid item xs={2} className={classes.item}>
            <PublishedComponent
              pubRef="core.DatePicker"
              value={edited?.pricelistDate}
              required
              readOnly={readOnly}
              module="medical_pricelist"
              label="medical_pricelist.pricelist_date"
              onChange={(v) => this.updateAttribute("pricelistDate", v)}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

const enhance = combine(withHistory, withModulesManager, withTheme, withStyles(styles));

export default enhance(PricelistGeneralPanel);
