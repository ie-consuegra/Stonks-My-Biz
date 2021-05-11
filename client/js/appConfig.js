const appConfig = {
  currentView: '',
  dbsLoaded: 0,
  dateFormat: '',
  currency: '',
  decimalSeparator: '',
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
  data: {
    income: 0,
    outcome: 0,
    balance: 0,
    inventoryCost: 0, // Total purchase value
    inventoryPrice: 0, // Total sale value
  },
  notifications: '',
  set view(viewName) {
    if (viewName !== undefined) {
      this.currentView = viewName;
    }
  },
  get view() {
    return this.currentView;
  },
};
