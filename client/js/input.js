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
  const numChecked = smartTable.selectedCheckboxes.length;

  const addToPortfolioVisibility = (visible = false) => {
    if (visible && settings.salePortfolio) {
      actionAddToPortfolioItemBtn.style.display = 'inline-block';
      addToPortfolioToolBtn.style.display = 'block';
    } else {
      actionAddToPortfolioItemBtn.style.display = 'none';
      addToPortfolioToolBtn.style.display = 'none';
    }
  };

  const addToSalesVisibility = (visible = false) => {
    if (visible && settings.saleStock) {
      actionAddToSalesItemBtn.style.display = 'inline-block';
      addToSaleToolBtn.style.display = 'block';
    } else {
      actionAddToSalesItemBtn.style.display = 'none';
      addToSaleToolBtn.style.display = 'none';
    }
  };

  if (numChecked === 1) {
    actionAddToPurchasesItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'inline-block';
    actionDeleteBtn.style.display = 'inline-block';

    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'block';
    deleteToolBtn.style.display = 'block';
    addToPurchaseToolBtn.style.display = 'block';

    addToPortfolioVisibility(true);
    addToSalesVisibility(true);
  } else if (numChecked > 1) {
    actionAddToPurchasesItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'inline-block';

    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'block';
    addToPurchaseToolBtn.style.display = 'block';

    addToPortfolioVisibility(true);
    addToSalesVisibility(true);
  } else {
    actionAddToPurchasesItemBtn.style.display = 'none';
    actionMenuDivider.style.display = 'none';
    actionAddBtn.style.display = 'inline-block';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';

    addToolBtn.style.display = 'block';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'none';
    addToPurchaseToolBtn.style.display = 'none';

    addToPortfolioVisibility(false);
    addToSalesVisibility(false);
  }
}

function hasStock(rowId, qty) {
  const currentStockIndex = 10;
  const stockEntry = findOne(dbData.stock, { field: 'ROW_ID', keyword: rowId });
  return qty <= stockEntry[currentStockIndex];
}

function calcAmount(tableData, rowId, qty) {
  const entry = findOne(tableData, { field: 'ROW_ID', keyword: rowId });
  const quantityIndex = 1;
  const priceIndex = 3;
  const amountIndex = 4;

  // Change the amount and quantity values of the entry
  // These values must propagate to the original tableData and mutate it
  const amount = qty * entry[priceIndex];
  entry[amountIndex] = amount;
  entry[quantityIndex] = qty;

  return amount;
}

function showNoStockWarning() {
  M.toast({ html: 'No enough stock' });
}

function serialFormat(number) {
  let numberStr = number.toString();
  const howLong = numberStr.length;
  let numLeftZeros = 4;
  while (numLeftZeros >= howLong) {
    numberStr = `0${numberStr}`;
    numLeftZeros -= 1;
  }
  numberStr = `s${numberStr}`;
  return numberStr;
}

function invoiceCalc(numInputElem) {
  const quantity = numInputElem.value;

  const tableIndex = 0;
  const rowIdIndex = 1;

  const numInputElemIdArr = numInputElem.id.split('-');
  const rowId = numInputElemIdArr[rowIdIndex];
  const table = numInputElemIdArr[tableIndex];

  // Check if there's stock before doing anything else
  // Or if it is a "purchases matter" where the stock is not a problem
  if (hasStock(rowId, quantity) || table === 'purchases') {
    const amount = calcAmount(dbData[table], rowId, quantity);

    // Change the amount value
    const amountCell = document.getElementById(`${table}-${rowId}-amount`);
    amountCell.innerHTML = formatCurrency(amount.toString());

    // Sum the partial amounts and show the total
    const total = getColumnTotal(dbData[table], 'AMOUNT', 'all');
    document.getElementById(`${table}-new-item-total`).value = formatCurrency(total.toString());

    // Add the table of items to the metadescription text input (Not visible)
    const metadescription = { stockItems: dbData[table] };
    const metadescriptionStr = JSON.stringify(metadescription);
    document.getElementById(`${table}-new-item-metadescription`).value = metadescriptionStr;
  } else {
    showNoStockWarning();
  }
}

function processMetadescription(metadescription) {
  const metadescriptionObj = JSON.parse(metadescription);
  metaStockItemsTable.load(metadescriptionObj.stockItems, {
    inputType: 'number',
    inputValueColumn: 1,
    readOnly: true,
  });
}

function loadInUpdateForm(data) {
  const { view } = settings;
  const dataKeysArr = Object.entries(data);
  dataKeysArr.forEach(([key, value]) => {
    const field = key === 'ROW_ID' ? 'id' : key.toLowerCase();
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
    if (key === 'METADESCRIPTION') {
      if (value) {
        processMetadescription(value);
      } else {
        metaStockItemsTable.reset();
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

  const [entryId] = table.selectedRowIds;

  const selectedEntry = dbData[view].find((entry) => entry[0].toString() === entryId);

  const fields = dbData[view][0];
  const data = {};
  selectedEntry.forEach((value, index) => {
    const field = fields[index];
    data[field] = value;
  });

  loadInUpdateForm(data);
}

/** Get an array of row ids and values and returns the entries that match the set of row ids
 * @param {Array} selectedRowIds Set of row ids to look up
 * @param {Array} requiredColumns Indexes and default values to filter out not required columns
 * @param {Array[]} data Values where entries will be extracted
 * @param {String[]} fields Fields (headers) the new table (2d array) will have
 * @returns {Array[]}
 */
function getSelectedEntries(selectedRowIds, requiredColumns, data, fields) {
  const values = selectedRowIds.map((rowId) => {
    const query = { field: 'ROW_ID', keyword: rowId };
    const selectedEntry = findOne(data, query);
    const resultValues = requiredColumns.map((reqIndex) => {
      if (typeof reqIndex === 'object') {
        return reqIndex.defaultValue;
      }
      return selectedEntry[reqIndex];
    });
    return resultValues;
  });

  if (fields) {
    values.unshift(fields);
  }
  return values;
}

function addToPortfolioItem() {
  const values = getSelectedEntries(stockTable.selectedRowIds, dbData.stock, true);
  portfolioStockTable.load(values, { inputType: 'number', avoidColumns: [1, 3, 5, 6, 8, 9, 10, 11] });
}

function actionAddToPortfolioItem() {
  addToPortfolioItem();
  switchView('portfolio');
  switchSubView('add');
}

function addToSalesItem() {
  /*  Logic to process items selected from portfolio and/or stock tables
  let selectedStock = [];
  let selectedPortfolio = [];

  if (settings.view === 'portfolio') {
    selectedPortfolio = getSelectedEntries(portfolioTable.selectedRowIds, dbData.portfolio, true);
    if (settings.saleStock) {
      selectedStock = getSelectedEntries(stockTable.selectedRowIds, dbData.stock, true);
    }
  } else if (settings.view === 'stock') {
    selectedStock = getSelectedEntries(stockTable.selectedRowIds, dbData.stock, true);
    if (settings.salePortfolio) {
      selectedPortfolio = getSelectedEntries(portfolioTable.selectedRowIds, dbData.portfolio, true);
    }
  } else {
    throw new Error('The items from this view cannot be loaded');
  }
  */
  const requiredColumns = [0, { defaultValue: 0 }, 2, 8, { defaultValue: 0 }];
  const fields = ['ROW_ID', 'QUANTITY', 'ITEM', 'PRICE', 'AMOUNT'];
  const { selectedRowIds } = stockTable;
  const values = getSelectedEntries(selectedRowIds, requiredColumns, dbData.stock, fields);
  // const values = [...selectedPortfolio, ...selectedStock];
  salesPortfolioTable.load(values, { inputType: 'number', inputValueColumn: 1 });
  dbData.sales = values;
}

function actionAddToSalesItem() {
  addToSalesItem();
  switchView('sales');
}

function addToPurchasesItem() {
  const requiredColumns = [0, { defaultValue: 0 }, 2, 7, { defaultValue: 0 }];
  const { selectedRowIds } = stockTable;
  const fields = ['ROW_ID', 'QUANTITY', 'ITEM', 'PRICE', 'AMOUNT'];
  const values = getSelectedEntries(selectedRowIds, requiredColumns, dbData.stock, fields);
  purchasesStockTable.load(values, { inputType: 'number', inputValueColumn: 1 });
  dbData.purchases = values;
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

/**
 * Update the value of the accounts
 * @param {String} accountName Name of the account
 * @param {String} amount Value as a string
 */
function updateAccountBalance(accountName, amount) {
  const { balance } = settings.data;
  if (balance.length >= 1) {
    balance.forEach((account) => {
      if (account.name === accountName) {
        account.balance = Number(account.balance) + Number(amount);
      }
    });
  }
  // Save data server side
  saveBalance();
}

function arrangeCashflowData(formElement) {
  const data = {};
  const formInputs = formElement.elements;

  data.DATE = formInputs.DATE.value;
  data.CONCEPT = formInputs.CONCEPT.value;
  data.DETAILS = formInputs.DETAILS.value;
  data.METADESCRIPTION = formInputs.METADESCRIPTION.value;
  data.ACCOUNT = formInputs.ACCOUNT.value;

  data.AMOUNT = '';

  if (formInputs.ROW_ID) {
    data.ROW_ID = formInputs.ROW_ID.value;
  }

  switch (data.CONCEPT) {
    case 'income':
    case 'sale':
      data.AMOUNT = makeParsable(formInputs.AMOUNT.value);
      break;
    case 'purchase':
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

/**
 * Substract the value passed as argument to the amount found
 * in the selected entry of the cashflow table
 * @param {String} newAmount New amount value as string
 * @returns Number
 */
function cashflowUpdateAmountDifference(newAmount) {
  const [entryId] = cashflowTable.selectedRowIds;

  const selectedEntry = dbData.cashflow.find((entry) => entry[0].toString() === entryId);

  const amountIndex = 4;
  const oldAmount = selectedEntry[amountIndex];
  const amountDifference = Number(newAmount) - Number(oldAmount);
  return amountDifference;
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

function setSaleItemSource(radioInputElem) {
  if (radioInputElem.checked) {
    switch (radioInputElem.id) {
      case 'stock-only':
        settings.data.sales.loadFromStock = true;
        settings.data.sales.loadFromPortfolio = false;
        break;
      case 'stock-and-portfolio':
        settings.data.sales.loadFromStock = true;
        settings.data.sales.loadFromPortfolio = true;
        break;
      case 'portfolio-only':
        settings.data.sales.loadFromStock = false;
        settings.data.sales.loadFromPortfolio = true;
        break;
      default:
        break;
    }
  }
}

// Account functions: load, create, delete, transfer
// Initialize the select elements (Materialize method)
function initAccountSelects() {
  const accountSelects = document.querySelectorAll('.account-select');
  M.FormSelect.init(accountSelects);
}

function displayAccountForms() {
  if (settings.data.balance.length > 1) {
    document.getElementById('transfer-accounts-container').style.display = 'block';
    document.getElementById('delete-accounts-container').style.display = 'block';
  } else {
    document.getElementById('transfer-accounts-container').style.display = 'none';
    document.getElementById('delete-accounts-container').style.display = 'none';
  }
}

function loadAccountsToTransfer() {
  if (settings.data.balance.length > 1) {
    const fromSelectElem = document.getElementById('from-account-select');
    const accountSelected = fromSelectElem.value;
    const selectElemTo = document.getElementById('to-account-select');
    selectElemTo.innerHTML = ''; // Remove option elements

    // Add new option elements
    settings.data.balance.forEach((account) => {
      if (account.name !== accountSelected) {
        const option = document.createElement('option');
        option.value = account.name;
        option.innerText = account.name;
        selectElemTo.appendChild(option);
      }
    });
    initAccountSelects();
  }
}

function loadAccountBalance() {
  const selectElem = document.getElementById('accounts-select');
  const selectedAccount = selectElem.value;
  const accountObj = settings.data.balance.find((account) => account.name === selectedAccount);
  document.getElementById('accounts-balance').value = formatCurrency(accountObj.balance.toString());
}

function addOptions(selectElem) {
  settings.data.balance.forEach((account) => {
    const option = document.createElement('option');
    option.value = account.name;
    option.innerText = account.name;
    selectElem.appendChild(option);
  });
}

function loadAccounts() {
  const allAccountSelects = document.querySelectorAll('.all-accounts');

  allAccountSelects.forEach((selectElem) => {
    selectElem.innerHTML = '';
    addOptions(selectElem);
  });

  loadAccountsToTransfer();
  loadAccountBalance();

  // Initialize the select elements
  initAccountSelects();
}

function createAccount() {
  const newAccountElem = document.getElementById('new-account-name');
  const initBalanceElem = document.getElementById('new-account-balance');
  const name = newAccountElem.value;
  const balance = makeParsable(initBalanceElem.value);

  if (name && balance) {
    const account = {
      name,
      balance,
    };

    // Save in settings global variable
    settings.data.balance.push(account);

    // Reset input elements
    newAccountElem.value = '';
    initBalanceElem.value = '';

    // Display account related forms if apply
    displayAccountForms();

    loadAccounts();
    endPreloader(3000, true, 'Account created, press "Save changes" to apply');
  }
}

function deleteAccount() {
  const accountSelect = document.getElementById('accounts-select');
  const accountToDelete = accountSelect.value;

  if (settings.data.balance.length > 1) {
    // Filter out the selected account and store the new array
    const newAccountsArr = settings.data.balance.filter((accnt) => accnt.name !== accountToDelete);
    settings.data.balance = newAccountsArr;

    loadAccounts(); // Reload accounts on each select element

    // Display account related forms if apply
    displayAccountForms();

    startPreloader();
    endPreloader(3000, true, 'Account removed, press "Save changes" to apply');
  } else {
    startPreloader();
    endPreloader(3000, false, 'There must be at least one account');
  }
}

function transferToAccount() {
  const fromAccount = document.getElementById('from-account-select').value;
  const toAccount = document.getElementById('to-account-select').value;
  const amountStr = makeParsable(document.getElementById('transfer-amount').value);
  const amount = Number(amountStr);

  let fromAccountBalance = 0;
  let toAccountBalance = 0;

  settings.data.balance.forEach((account) => {
    if (account.name === fromAccount) {
      fromAccountBalance = Number(account.balance);
    }

    if (account.name === toAccount) {
      toAccountBalance = Number(account.balance);
    }
  });

  if (amount > fromAccountBalance) {
    startPreloader();
    endPreloader(3000, false, 'This amount is higher than the account balance');
  } else {
    fromAccountBalance -= amount;
    toAccountBalance += amount;

    settings.data.balance.forEach((account) => {
      if (account.name === fromAccount) {
        account.balance = fromAccountBalance;
      }

      if (account.name === toAccount) {
        account.balance = toAccountBalance;
      }
    });
    startPreloader();
    endPreloader(3000, true, 'Done! press "Save changes" to apply');
  }
}
