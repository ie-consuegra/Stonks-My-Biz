/**
 * Set the text the preloader popup will display to the user
 * @param {String} message Text to display on the preloader popup
 */
function setPreloaderMessage(message) {
  const loaderMessageElem = document.getElementById('loader-message');
  loaderMessageElem.innerText = message;
}

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
  endPreloader();
  dashboardComputations();
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
  endPreloader();
  dashboardComputations();
}

function updateSubmitted(values) {
  const { view } = settings;
  switchView(view);
  reloadOnTable(values);
  resetForm('update');
  endPreloader();
  dashboardComputations();
}

function saleSubmitted(values) {
  increaseSaleSerial();

  // Update cashflow data
  dbData.cashflow = values;
  cashflowTable.reload(values);

  // Reset sale form values
  document.getElementById('add-sales-form').reset();
  salesPortfolioTable.reset();

  // Uncheck the selected items
  stockTable.uncheckAll();

  // Reload default values: sale serial number and date
  loadSaleSerial();
  loadDateIn('sales-new-item-date');
  // Reinitialize Materialize input labels
  M.updateTextFields();

  endPreloader();
  dashboardComputations();
}

function purchaseSubmitted(values) {
  // Update cashflow data
  dbData.cashflow = values;
  cashflowTable.reload(values);

  // Reset purchase form values
  document.getElementById('add-purchases-form').reset();
  purchasesStockTable.reset();

  // Uncheck the selected items
  stockTable.uncheckAll();

  // Reload default value: date
  loadDateIn('purchases-new-item-date');
  // Reinitialize Materialize input labels
  M.updateTextFields();

  endPreloader();
  dashboardComputations();
}

function settingsSaved() {
  endPreloader(10000, true, WORD.reloadPage);
}
