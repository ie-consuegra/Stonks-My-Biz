/** Contains the vocabulary used by the app.
 * To set the language, deconstruct the appropiate lang[languageCode] into it.
 * Where languageCode could be: 'es', 'pt' or 'en' for Spanish, Portuguese or English respectively.
 */
const terms = { ...lang.es }; // Spanish
const settings = {
  dbsLoaded: 0,
  currentView: '',
  notifications: '',
  // Data contains info that must be stored in server
  data: {
    preferences: {
      dateFormat: 'dd/MM/yyyy',
      currency: '$',
      cents: true,
      decimalSeparator: ',',
    },
    company: {
      name: '',
      phones: '',
      address: '',
      website: '',
      extras: '',
      ids: {
        id1: { name: '', number: '' },
        id2: { name: '', number: '' },
        id3: { name: '', number: '' },
      },
    },
    sales: {
      serial: 1,
      loadFromStock: true,
      loadFromPortfolio: false,
    },
    stock: {
      calcValue: false,
    },
  },
  set view(viewName) {
    if (viewName !== undefined) {
      this.data.currentView = viewName;
    }
  },
  get view() {
    return this.data.currentView;
  },
  setDateFormat(format) {
    this.data.preferences.dateFormat = format;
  },
  setCurrency(currSymbol) {
    this.data.preferences.currency = currSymbol;
  },
  setDecimalSeparator(decSeparator) {
    this.data.preferences.decimalSeparator = decSeparator;
  },
  setCents(useCents) {
    this.data.preferences.cents = useCents;
  },
  setAutoPortfolio(loadStock) {
    this.data.portfolio.loadStock = loadStock;
  },
  load(settingsData) {
    this.data = { ...settingsData };
  },
  get salePortfolio() {
    return this.data.sales.loadFromPortfolio;
  },
  get saleStock() {
    return this.data.sales.loadFromStock;
  },
};
