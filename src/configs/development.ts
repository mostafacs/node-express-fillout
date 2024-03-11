export default {
  "env": {
    "doc": "The application environment.",
    "format": ["production", "development", "test"],
    "default": "development",
    "env": "NODE_ENV"
  },
  "fillout-api-url": {
    "doc": "Fallout Api URL",
    "format": "String",
    "default": "https://api.fillout.com",
    "env": "fill_out_api_url"
  },
  "fillout-api-key": {
    "doc": "Fallout Api Key",
    "format": "String",
    "default": "sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912",
    "env": "fill_out_api_key"
  },
  "port": {
    "doc": "",
    "format": "Number",
    "default": "4000",
    "env": "port"
  }
};