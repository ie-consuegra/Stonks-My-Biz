/**
* Hide/Show items according to the number of selected entries
*/
function toggleToolButtons(smartTable) {
  actionAddToPortfolioItemBtn.style.display = 'none';
  actionAddToSalesItemBtn.style.display = 'none';
  actionAddToPurchasesItemBtn.style.display = 'none';
  actionMenuDivider.style.display = 'none';
  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'inline-block';
    actionDeleteBtn.style.display = 'inline-block';
  } else if (numChecked > 1) {
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'inline-block';
  } else {
    actionAddBtn.style.display = 'inline-block';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';
  }
}

function toggleToolButtonsForPortfolio(smartTable) {
  actionAddToPortfolioItemBtn.style.display = 'none';
  actionAddToPurchasesItemBtn.style.display = 'none';
  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    actionAddToSalesItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'block';
    actionDeleteBtn.style.display = 'inline-block';
  } else if (numChecked > 1) {
    actionAddToSalesItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'inline-block';
  } else {
    actionAddToSalesItemBtn.style.display = 'none';
    actionMenuDivider.style.display = 'none';
    actionAddBtn.style.display = 'inline-block';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';
  }
}

function toggleToolButtonsForStock(smartTable) {
  actionAddToSalesItemBtn.style.display = 'none';
  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    actionAddToPurchasesItemBtn.style.display = 'inline-block';
    actionAddToPortfolioItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'inline-block';
    actionDeleteBtn.style.display = 'inline-block';
  } else if (numChecked > 1) {
    actionAddToPurchasesItemBtn.style.display = 'inline-block';
    actionAddToPortfolioItemBtn.style.display = 'inline-block';
    actionMenuDivider.style.display = 'block';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'inline-block';
  } else {
    actionAddToPurchasesItemBtn.style.display = 'none';
    actionAddToPortfolioItemBtn.style.display = 'none';
    actionMenuDivider.style.display = 'none';
    actionAddBtn.style.display = 'inline-block';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';
  }
}

function loadInUpdateForm(data) {
  const { view } = appConfig;
  const dataKeysArr = Object.entries(data);
  dataKeysArr.forEach(([key, value]) => {
    const field = key === '_ID' ? 'id' : key.toLowerCase();
    const elemId = `${view}-update-item-${field}`;
    if (document.getElementById(elemId)) {
      document.getElementById(elemId).value = value;
    }
  });
}

function loadInForm() {
  const { view } = appConfig;
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
    case 'receipts-and-issues':
      table = receiptsAndIssuesTable;
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
  switch (appConfig.view) {
    case 'stock':
      deleteStock();
      break;
    case 'receipts-and-issues':
      deleteReceiptsAndIssues();
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
  const formInputs = formElement.children;

  data.DATE = formInputs[0].value;

  /* For getting the value of the selected option, I use the Materialize way,
  that is to say, to get an instance of the element and use the getSelectedValues() method
  */
  const addCashflowConceptSelect = document.getElementById('add-cashflow-concept-select');
  const selectInstance = M.FormSelect.getInstance(addCashflowConceptSelect);
  [selectValue] = selectInstance.getSelectedValues();
  data.CONCEPT = selectValue;

  data.DETAILS = formInputs[2].value;
  switch (data.CONCEPT) {
    case 'income':
      data.INCOME = formInputs[3].value;
      data.OUTCOME = 0;
      break;
    case 'outcome':
    case 'expense':
      data.INCOME = 0;
      data.OUTCOME = formInputs[3].value;
      break;
    default:
      break;
  }
  data.BALANCE = 0; // Number generated by a computation
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
