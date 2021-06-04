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

function increaseSaleSerial() {
  settings.data.sales.serial += 1;
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
  increaseSaleSerial();

  // Update cashflow data
  dbData.cashflow = values;
  cashflowTable.reload(values);

  // Reset sale form values
  document.getElementById('add-sales-form').reset();
  salesPortfolioTable.reset();

  // Reload default values: sale serial number and date
  loadSaleSerial();
  loadDateIn('sales-new-item-date');
  // Reinitialize Materialize input labels
  M.updateTextFields();

  hidePreloader();
}

function purchaseSubmitted(values) {
  // Update cashflow data
  dbData.cashflow = values;
  cashflowTable.reload(values);

  // Reset purchase form values
  document.getElementById('add-purchases-form').reset();
  purchasesStockTable.reset();

  // Reload default value: date
  loadDateIn('purchases-new-item-date');
  // Reinitialize Materialize input labels
  M.updateTextFields();

  hidePreloader();
}

function settingsSaved() {
  hidePreloader();
}
