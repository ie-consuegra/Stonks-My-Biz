const settings = {
  dbsLoaded: 0,
  currentView: '',
  notifications: '',
  // Data contains info that must be stored in server
  data: {
    preferences: {
      dateFormat: '',
      currency: '',
      decimalSeparator: '',
    },
    company: {
      name: '',
      phones: '',
      address: '',
      website: '',
      extraInfo: '',
      ids: {},
    },
    portfolio: {
      loadStock: false,
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
  load(settingsData) {
    this.data = { ...settingsData };
  },
};
