function loadStock(values) {
  stockTable.load(values);
  stockTable.addClickEventToCheckboxes(toggleToolButtons);
  M.AutoInit();
}

function loadMovement(values) {
  movementTable.load(values);
  movementTable.addClickEventToCheckboxes(toggleToolButtons);
  M.AutoInit();
}

function reloadOnTable(values) {
  switch (settings.view) {
    case 'portfolio':
      portfolioTable.reload(values);
      portfolioStockTable.reset();
      dbData.portfolio = values;
      break;
    case 'cashflow':
      cashflowTable.reload(values);
      dbData.cashflow = values;
      break;
    case 'stock':
      stockTable.reload(values);
      dbData.stock = values;
      break;
    case 'movements':
      movementsTable.reload(values);
      dbData.movements = values;
      break;
    case 'suppliers':
      suppliersTable.reload(values);
      dbData.movements = values;
      break;
    default:
      break;
  }
}

function removeSuccess(values) {
  reloadOnTable(values);
  hidePreloader();
}

function resetForm(formType) {
  const formId = `${formType}-${settings.view}-form`;
  document.getElementById(formId).reset();
}

function newSubmitted(values) {
  const { view } = settings;
  switchView(view);
  reloadOnTable(values);
  resetForm('add');
  hidePreloader();
}

function updateSubmitted(values) {
  const { view } = settings;
  switchView(view);
  reloadOnTable(values);
  resetForm('update');
  hidePreloader();
}

function saleSubmitted(values) {
  dbData.cashflow = values;
  cashflowTable.reload(values);
  hidePreloader();
}

function purchaseSubmitted(values) {
  dbData.cashflow = values;
  cashflowTable.reload(values);
  hidePreloader();
}

function settingsSaved() {
  hidePreloader();
}
