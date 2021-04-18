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

// STOCK database "creation/connection"
const stockSchema = ['CODE', 'PRODUCT', 'CATEGORY', 'UNIT', 'PRICE', 'MINIMUM', 'STOCK', 'SUPPLIER'];
const stockModel = DBS.createModelFrom('stock', stockSchema);
const stockDBS = new DBS(stockModel, stonksApp.getFolder);

// RECEIPTS AND ISSUES database "creation/connection"
const receiptsAndIssuesSchema = ['DATE', 'CODE', 'PRODUCT', 'CATEGORY', 'DESCRIPTION', 'MOVEMENT'];
const receiptsAndIssuesModel = DBS.createModelFrom('receiptsnissues', receiptsAndIssuesSchema);
const receiptsAndIssuesDBS = new DBS(receiptsAndIssuesModel, stonksApp.getFolder);

// SUPPLIERS database "creation/connection"
const suppliersSchema = ['NAME', 'IDENTIFICATION', 'TELEPHONE', 'CELLPHONE', 'EMAIL', 'ADDRESS', 'CITY', 'OTHER'];
const suppliersModel = DBS.createModelFrom('suppliers', suppliersSchema);
const suppliersDBS = new DBS(suppliersModel, stonksApp.getFolder);

// database functions
function fetchAllInventoryValues() {
  const data = {
    stock: stockDBS.use().fetch(),
    receiptsAndIssues: receiptsAndIssuesDBS.use().fetch(),
    suppliers: suppliersDBS.use().fetch(),
  };

  return data;
}

function fetchFrom({ meta }) {
  let values;
  switch (meta) {
    case 'stock':
      values = stockDBS.use().fetch();
      break;
    case 'suppliers':
      values = suppliersDBS.use().fetch();
      break;
    case 'receiptsandissues':
      values = receiptsAndIssuesDBS.use().fetch();
      break;
    default:
      throw new Error('Wrong or null meta property');
  }
  return values;
}

function update({ data, meta }) {
  let values;
  switch (meta) {
    case 'stock':
      values = stockDBS.use().update(data);
      break;
    case 'receiptsandissues':
      values = receiptsAndIssuesDBS.use().update(data);
      break;
    case 'suppliers':
      values = suppliersDBS.use().update(data);
      break;
    default:
      throw new Error('Wrong or null meta property');
  }
  return values;
}

/*
const dateFields = ['DAY'];
const dateFormat = 'dd/MM/yyyy';
 */
