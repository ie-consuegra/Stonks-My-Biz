function loadStock(values) {
  stockTable.load(values);
  stockTable.addClickEventToCheckboxes(toggleToolButtons);
  document.getElementById('stock-preloader').style.display = 'none';
  M.AutoInit();
}

function loadMovement(values) {
  movementTable.load(values);
  movementTable.addClickEventToCheckboxes(toggleToolButtons);
  document.getElementById('movement-preloader').style.display = 'none';
  M.AutoInit();
}

function reloadOnTable(values) {
  switch (appConfig.view) {
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
}

function resetForm(formType) {
  const formId = `${formType}-${appConfig.view}-form`;
  document.getElementById(formId).reset();
}

function newSubmitted(values) {
  const { view } = appConfig;
  switchView(view);
  reloadOnTable(values);
  resetForm('add');
}

function updateSubmitted(values) {
  const { view } = appConfig;
  switchView(view);
  reloadOnTable(values);
  resetForm('update');
}

function saleSubmitted(values) {
  dbData.cashflow = values;
  cashflowTable.reload(values);
}

function purchaseSubmitted(values) {
  dbData.cashflow = values;
  cashflowTable.reload(values);
}
