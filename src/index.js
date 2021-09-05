import messages_en from "./translations/en.json";
import reducer from "./reducer";
import PriceListLoader from "./components/PriceListLoader";
import ServicesPriceListPicker from "./pickers/ServicesPriceListPicker";
import ItemsPriceListPicker from "./pickers/ItemsPriceListPicker";

const DEFAULT_CONFIG = {
  "translations": [{ key: 'en', messages: messages_en }],
  "reducers": [{ key: 'medical_pricelist', reducer }],
  "refs": [
    { key: "medical_pricelist.ServicesPriceListPicker", ref: ServicesPriceListPicker },
    { key: "medical_pricelist.ServicesPriceListPicker.projection", ref: ["id"] },
    { key: "medical_pricelist.ItemsPriceListPicker", ref: ItemsPriceListPicker },
    { key: "medical_pricelist.ItemsPriceListPicker.projection", ref: ["id"] },

  ],
  "core.Boot": [PriceListLoader],
}

export const MedicalPriceListModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}
