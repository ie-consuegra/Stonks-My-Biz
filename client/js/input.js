/**
* Hide/Show items according to the number of selected entries
*/
function toggleToolButtons(smartTable) {
  actionAddToPortfolioItemBtn.style.display = 'none';
  actionAddToSalesItemBtn.style.display = 'none';
  actionAddToPurchasesItemBtn.style.display = 'none';
  actionMenuDivider.style.display = 'none';

  addToPortfolioToolBtn.style.display = 'none';
  addToPurchaseToolBtn.style.display = 'none';
  addToSaleToolBtn.style.display = 'none';

  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'inline-block';
    actionDeleteBtn.style.display = 'inline-block';
    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'block';
    deleteToolBtn.style.display = 'block';
  } else if (numChecked > 1) {
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'inline-block';
    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'block';
  } else {
    actionAddBtn.style.display = 'inline-block';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';
    addToolBtn.style.display = 'block';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'none';
  }
}

function toggleToolButtonsForPortfolio(smartTable) {
  actionAddToPortfolioItemBtn.style.display = 'none';
  actionAddToPurchasesItemBtn.style.display = 'none';

  addToPortfolioToolBtn.style.display = 'none';
  addToPurchaseToolBtn.style.display = 'none';

  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    actionAddToSalesItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'block';
    actionDeleteBtn.style.display = 'inline-block';
    addToSaleToolBtn.style.display = 'block';
    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'block';
    deleteToolBtn.style.display = 'block';
  } else if (numChecked > 1) {
    actionAddToSalesItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'inline-block';
    addToSaleToolBtn.style.display = 'block';
    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'block';
  } else {
    actionAddToSalesItemBtn.style.display = 'none';
    actionMenuDivider.style.display = 'none';
    actionAddBtn.style.display = 'inline-block';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';
    addToSaleToolBtn.style.display = 'none';
    addToolBtn.style.display = 'block';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'none';
  }
}

function toggleToolButtonsForStock(smartTable) {
  actionAddToSalesItemBtn.style.display = 'none';
  addToSaleToolBtn.style.display = 'none';

  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    actionAddToPurchasesItemBtn.style.display = 'inline-block';
    actionAddToPortfolioItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'inline-block';
    actionDeleteBtn.style.display = 'inline-block';

    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'block';
    deleteToolBtn.style.display = 'block';
    addToPortfolioToolBtn.style.display = 'block';
    addToPurchaseToolBtn.style.display = 'block';
  } else if (numChecked > 1) {
    actionAddToPurchasesItemBtn.style.display = 'inline-block';
    actionAddToPortfolioItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'inline-block';

    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'block';
    addToPortfolioToolBtn.style.display = 'block';
    addToPurchaseToolBtn.style.display = 'block';
  } else {
    actionAddToPurchasesItemBtn.style.display = 'none';
    actionAddToPortfolioItemBtn.style.display = 'none';
    actionMenuDivider.style.display = 'none';
    actionAddBtn.style.display = 'inline-block';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';

    addToolBtn.style.display = 'block';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'none';
    addToPortfolioToolBtn.style.display = 'none';
    addToPurchaseToolBtn.style.display = 'none';
  }
}

function loadInUpdateForm(data) {
  const { view } = settings;
  const dataKeysArr = Object.entries(data);
  dataKeysArr.forEach(([key, value]) => {
    const field = key === '_ID' ? 'id' : key.toLowerCase();
    const elemId = `${view}-update-item-${field}`;
    if (document.getElementById(elemId)) {
      // Check if the value must be formatted
      const inputElem = document.getElementById(elemId);
      if (Array.from(inputElem.classList).indexOf('currency-input') !== -1) {
        const { decimalSeparator, cents } = settings.data.preferences;
        inputElem.value = formatNumber(value.toString(), decimalSeparator, 2, cents);
      } else {
        inputElem.value = value;
      }
    }
  });
}

function loadInForm() {
  const { view } = settings;
  let table;

  switch (view) {
    case 'portfolio':
      table = portfolioTable;
      break;
    case 'cashflow':
      table = cashflowTable;
      break;
    case 'stock':
      table = stockTable;
      break;
    case 'movements':
      table = movementsTable;
      break;
    case 'suppliers':
      table = suppliersTable;
      break;
    default:
      break;
  }

  const entryId = table.selectedCheckboxes[0].id.toString();

  const selectedEntry = table.values.find((entry) => entry[0].toString() === entryId);

  const fields = dbData[view][0];
  const data = {};
  selectedEntry.forEach((value, index) => {
    const field = fields[index];
    data[field] = value;
  });

  loadInUpdateForm(data);
}

function addToPortfolioItem() {
  const selectedStockCheckboxes = stockTable.selectedCheckboxes;
  const selectedStockIds = selectedStockCheckboxes.map((checkbox) => checkbox.id.toString());
  const values = selectedStockIds.map((ref) => {
    const query = { field: '_ID', keyword: ref };
    return findOne(dbData.stock, query);
  });
  values.unshift([]); // The equivalent to the title row
  portfolioStockTable.load(values, { inputType: 'number', avoidColumns: [1, 3, 5, 6, 8, 9, 10, 11] });
}

function actionAddToPortfolioItem() {
  addToPortfolioItem();
  switchView('portfolio');
  switchSubView('add');
}

function addToSalesItem() {
  const selectedPortfolioCheckboxes = portfolioTable.selectedCheckboxes;
  const selectedIds = selectedPortfolioCheckboxes.map((checkbox) => checkbox.id.toString());
  const values = selectedIds.map((ref) => {
    const query = { field: '_ID', keyword: ref };
    return findOne(dbData.portfolio, query);
  });
  values.unshift([]); // The equivalent to the title row
  salesPortfolioTable.load(values, { inputType: 'number', avoidColumns: [1, 3, 4, 5, 6, 7, 9, 10, 11] });
}

function actionAddToSalesItem() {
  addToSalesItem();
  switchView('sales');
}

function addToPurchasesItem() {
  const selectedStockCheckboxes = stockTable.selectedCheckboxes;
  const selectedStockIds = selectedStockCheckboxes.map((checkbox) => checkbox.id.toString());
  const values = selectedStockIds.map((ref) => {
    const query = { field: '_ID', keyword: ref };
    return findOne(dbData.stock, query);
  });
  values.unshift([]); // The equivalent to the title row
  purchasesStockTable.load(values, { inputType: 'number', avoidColumns: [1, 3, 4, 5, 6, 8, 9, 10, 11] });
}

function actionAddToPurchasesItem() {
  addToPurchasesItem();
  switchView('purchases');
}

function actionAdd() {
  switchSubView('add');
}

function actionUpdate() {
  loadInForm();
  switchSubView('update');
}

function actionDelete() {
  // Show dialog asking if sure to delete
  M.Modal.getInstance(deleteModal).open();
}

function actionDeleteContinue() {
  switch (settings.view) {
    case 'portfolio':
      deletePortfolio();
      break;
    case 'cashflow':
      deleteCashflow();
      break;
    case 'stock':
      deleteStock();
      break;
    case 'movements':
      deleteMovement();
      break;
    case 'suppliers':
      deleteSuppliers();
      break;
    default:
      break;
  }
}

function arrangeCashflowData(formElement) {
  const data = {};
  const formInputs = formElement.elements;

  data.DATE = formInputs.DATE.value;
  data.CONCEPT = formInputs.CONCEPT.value;
  data.DETAILS = formInputs.DETAILS.value;

  data.AMOUNT = '';

  switch (data.CONCEPT) {
    case 'income':
      data.AMOUNT = makeParsable(formInputs.AMOUNT.value);
      break;
    case 'outcome':
    case 'expense':
      data.AMOUNT = `-${makeParsable(formInputs.AMOUNT.value)}`;
      break;
    default:
      break;
  }
  return data;
}

function goToStock() {
  switchView('stock');
}

function goToPortfolio() {
  switchView('portfolio');
}

function inputToRefs(inputElem) {
  if (inputElem.value !== '') {
    const inputText = document.getElementById('portfolio-new-item-stockrefs');
    let valuesObj = {};

    if (inputText.value) {
      valuesObj = { ...JSON.parse(inputText.value) };
      valuesObj[inputElem.id] = inputElem.value;
    } else {
      valuesObj[inputElem.id] = inputElem.value;
    }
    inputText.value = JSON.stringify(valuesObj);
  }
}

// CHANGES IN SETTINGS VIEW INPUTS
function changeDateFormatExample(format) {
  const dateFormatExample = document.getElementById('date-format-example');
  const today = new Date();
  dateFormatExample.innerHTML = formatDate(today, format);
}

function changeCurrencyExample(currSymbol) {
  const currencyExample = document.getElementById('currency-example');
  currencyExample.innerHTML = `${currSymbol}123`;
}

function changeDecimalSeparatorExample(decSeparator) {
  const decimalExample = document.getElementById('decimal-example');
  const thousandsSeparator = (decSeparator === ',' ? '.' : ',');
  decimalExample.innerHTML = `1${thousandsSeparator}120${decSeparator}50`;
}

function changeCentsExample(cents) {
  const centsExample = document.getElementById('cents-example');
  const { decimalSeparator } = settings.data.preferences;
  let example = '';
  if (cents) {
    example = `325${decimalSeparator}00`;
  } else {
    example = '325';
  }
  centsExample.innerHTML = example;
}

function updateSettingsFormatExamples() {
  const { preferences } = settings.data;
  changeDateFormatExample(preferences.dateFormat);
  changeCurrencyExample(preferences.currency);
  changeDecimalSeparatorExample(preferences.decimalSeparator);
  changeCentsExample(preferences.cents);
}

function setDateFormat(selectElem) {
  const format = selectElem.value;
  changeDateFormatExample(format);
  settings.setDateFormat(format);
}

function setCurrency(inputElem) {
  const currency = inputElem.value;
  changeCurrencyExample(currency);
  settings.setCurrency(currency);
}

function setDecimalSeparator(selectElem) {
  const decSeparator = selectElem.value;
  changeDecimalSeparatorExample(decSeparator);
  settings.setDecimalSeparator(decSeparator);
}

function setCents(selectElem) {
  const cents = (selectElem.value === 'true');
  changeCentsExample(cents);
  settings.setCents(cents);
}

function setAutoPortfolio(checkboxElem) {
  settings.setAutoPortfolio(checkboxElem.checked);
}

/**
 * Save the information of the business in the settings object global variable
 */
function saveBusinessInfo() {
  const { company } = settings.data;

  const companyEntries = Object.entries(company);
  companyEntries.forEach(([key, value]) => {
    if (key === 'ids') {
      const idEntries = Object.keys(value);
      idEntries.forEach((k) => {
        settings.data.company.ids[k].name = document.getElementById(`business-${k}`).value;
        settings.data.company.ids[k].number = document.getElementById(`business-${k}-number`).value;
      });
    } else {
      settings.data.company[key] = document.getElementById(`business-${key}`).value;
    }
  });
}
