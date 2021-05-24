/*

Schema will be a child class of Map (examples below), right now is a simple array
const bookingSchema = new Schema(
  [service, { type: 'string', required: true }],
  [price, { type: 'number', required: false}],
  [date, { type: 'date', required: true}]
  [peopleList, { type: 'DBRef', link: {ssId, sheet, _id} }]
)

const inventorySchema = new Schema(
  [product_code, { type: 'string', required: false}],
  [product, { type: 'string', required: true}],
  [existing_stocks, { type: 'number', required: true}],
  [minimum_stocks, { type: 'number', required: true }],
  [stocks_difference, { type: 'formula', formula: 'existing_stocks - minimum_stocks'}]
);

const Booking = new Model('employee', employeeSchema);

*/
// Initializing a stonks app
stonksApp.setName = 'My Biz';
stonksApp.setVersion = '0.0.0';
stonksApp.init();

// CASHFLOW database "creation/connection"
const cashflowSchema = ['DATE', 'CONCEPT', 'DETAILS', 'AMOUNT'];
const cashflowModel = DBS.createModelFrom('cashflow', cashflowSchema);
const cashflowDBS = new DBS(cashflowModel, stonksApp.getFolder);

// PORTFOLIO database "creation/connection"
const portfolioSchema = ['CODE', 'ITEM', 'DESCRIPTION', 'UNIT', 'TYPE', 'CATEGORY', 'COST', 'PRICE', 'MINIMUM', 'STOCK', 'STOCKREFS'];
const portfolioModel = DBS.createModelFrom('portfolio', portfolioSchema);
const portfolioDBS = new DBS(portfolioModel, stonksApp.getFolder);

// STOCK database "creation/connection"
const stockSchema = ['CODE', 'ITEM', 'DESCRIPTION', 'UNIT', 'TYPE', 'CATEGORY', 'COST', 'PRICE', 'MINIMUM', 'STOCK', 'SUPPLIER'];
const stockModel = DBS.createModelFrom('stock', stockSchema);
const stockDBS = new DBS(stockModel, stonksApp.getFolder);

// RECEIPTS AND ISSUES database "creation/connection"
const movementsSchema = ['DATE', 'CODE', 'PRODUCT', 'CATEGORY', 'DESCRIPTION', 'MOVEMENT'];
const movementsModel = DBS.createModelFrom('receiptsnissues', movementsSchema);
const movementsDBS = new DBS(movementsModel, stonksApp.getFolder);

// SUPPLIERS database "creation/connection"
const suppliersSchema = ['NAME', 'IDENTIFICATION', 'TELEPHONE', 'CELLPHONE', 'EMAIL', 'ADDRESS', 'CITY', 'OTHER'];
const suppliersModel = DBS.createModelFrom('suppliers', suppliersSchema);
const suppliersDBS = new DBS(suppliersModel, stonksApp.getFolder);

// Variables for format dates function
const dateField = ['DATE'];
const format = (stonksApp.settings.preferences ? stonksApp.settings.preferences.dateFormat : 'dd/MM/yyyy');
const datesFormatter = createDatesFormatter(formatDates, dateField, format);

// database functions
function fetchPortfolio() {
  const values = portfolioDBS.use().fetch();
  return values;
}

function fetchCashflow() {
  const values = cashflowDBS.use().fetch();
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function fetchStock() {
  const values = stockDBS.use().fetch();
  return values;
}

function fetchMovements() {
  const values = movementsDBS.use().fetch();
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function fetchSuppliers() {
  const values = suppliersDBS.use().fetch();
  return values;
}

function fetchFrom({ meta }) {
  let values;
  switch (meta) {
    case 'cashflow':
      values = datesFormatter(cashflowDBS.use().fetch());
      break;
    case 'portfolio':
      values = portfolioDBS.use().fetch();
      break;
    case 'stock':
      values = stockDBS.use().fetch();
      break;
    case 'suppliers':
      values = suppliersDBS.use().fetch();
      break;
    case 'movements':
      values = datesFormatter(movementsDBS.use().fetch());
      break;
    default:
      throw new Error('Wrong or null meta property');
  }
  return values;
}

function insertPortfolio(data) {
  const values = portfolioDBS.use().insert(data);
  return values;
}

function insertSale(data) {
  const values = cashflowDBS.use().insert(data);
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function insertPurchase(data) {
  const values = cashflowDBS.use().insert(data);
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function insertCashflow(data) {
  const values = cashflowDBS.use().insert(data);
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function insertStock(data) {
  const values = stockDBS.use().insert(data);
  return values;
}

function insertMovement(data) {
  const values = movementsDBS.use().insert(data);
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function insertSupplier(data) {
  const values = suppliersDBS.use().insert(data);
  return values;
}

function updatePortfolio(data) {
  const values = portfolioDBS.use().update(data);
  return values;
}

function updateCashflow(data) {
  const values = cashflowDBS.use().update(data);
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function updateStock(data) {
  const values = stockDBS.use().update(data);
  return values;
}

function updateMovement(data) {
  const values = movementsDBS.use().update(data);
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function updateSupplier(data) {
  const values = suppliersDBS.use().update(data);
  return values;
}

function removePortfolio(entryIds) {
  const values = portfolioDBS.use().remove(entryIds);
  return values;
}

function removeCashflow(entryIds) {
  const values = cashflowDBS.use().remove(entryIds);
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function removeStock(entryIds) {
  const values = stockDBS.use().remove(entryIds);
  return values;
}

function removeMovement(entryIds) {
  const values = movementsDBS.use().remove(entryIds);
  const formattedValues = datesFormatter(values);
  return formattedValues;
}

function removeSuppliers(entryIds) {
  const values = suppliersDBS.use().remove(entryIds);
  return values;
}

function saveAppSettings(settingsData) {
  const configStr = JSON.stringify(settingsData);
  PropertiesService
    .getScriptProperties()
    .setProperty('APP_SETTINGS', configStr);

  // Reload settings
  stonksApp.getAppSettings();
}

function getAppSettings() {
  return stonksApp.settings;
}
