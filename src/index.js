import React from "react";
import messages_en from "./translations/en.json";
import reducer from "./reducer";
import PriceListLoader from "./components/PriceListLoader";

const DEFAULT_CONFIG = {
  "translations": [{ key: 'en', messages: messages_en }],
  "reducers": [{ key: 'medical_pricelist', reducer }],
  "core.Boot": [PriceListLoader],
}

export const MedicalPriceListModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}
