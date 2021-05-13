const settings = {
  data: {
    currentView: '',
    dbsLoaded: 0,
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
    notifications: '',
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
  load(settingsData) {
    this.data = { ...settingsData };
  },
};
