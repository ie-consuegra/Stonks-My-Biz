function fetchPortfolio() {
  google
    .script
    .run
    .withSuccessHandler(loadPortfolioValues)
    .fetchPortfolio();
}

function fetchCashflow() {
  google
    .script
    .run
    .withSuccessHandler(loadCashflowValues)
    .fetchCashflow();
}

function fetchStock() {
  google
    .script
    .run
    .withSuccessHandler(loadStockValues)
    .fetchStock();
}

function fetchMovements() {
  google
    .script
    .run
    .withSuccessHandler(loadMovementsValues)
    .fetchMovements();
}

function fetchSuppliers() {
  google
    .script
    .run
    .withSuccessHandler(loadSuppliersValues)
    .fetchSuppliers();
}

function submitNewPortfolio(formData) {
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertPortfolio(formData);
}

function submitNewSale(formData) {
  setPreloaderMessage(WORD.saving);
  startPreloader();
  const data = arrangeCashflowData(formData);
  updateAccountBalance(data.ACCOUNT, data.AMOUNT);

  // Register the issue (Only save data on db)
  registerMovement(data, 'SALE');

  // Register the change in stock
  registerStockChange(data, 'SALE');

  google
    .script
    .run
    .withSuccessHandler()
    .saveAppSettings(settings.data);

  // Save new sale
  google
    .script
    .run
    .withSuccessHandler(saleSubmitted)
    .insertSale(data);
}

function submitNewPurchase(formData) {
  setPreloaderMessage(WORD.saving);
  startPreloader();
  const data = arrangeCashflowData(formData);
  updateAccountBalance(data.ACCOUNT, data.AMOUNT);

  // Register the issue (Only save data on db)
  registerMovement(data, 'PURCHASE');

  // Register the change in stock
  registerStockChange(data, 'PURCHASE');

  google
    .script
    .run
    .withSuccessHandler(purchaseSubmitted)
    .insertPurchase(data);
}

function submitNewCashflow(formData) {
  setPreloaderMessage(WORD.saving);
  startPreloader();
  const data = arrangeCashflowData(formData);
  updateAccountBalance(data.ACCOUNT, data.AMOUNT);
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertCashflow(data);
}

function submitNewStock(formData) {
  setPreloaderMessage(WORD.saving);
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertStock(formData);
}

function submitNewMovement(formData) {
  setPreloaderMessage(WORD.saving);
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertMovement(formData);
}

function submitNewSupplier(formData) {
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertSupplier(formData);
}

function submitUpdatePortfolio(formData) {
  startPreloader();
  const data = arrangeCashflowData(formData);
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updatePortfolio(data);
}

function submitUpdateCashflow(formData) {
  setPreloaderMessage(WORD.updatingInformation);
  startPreloader();
  const data = arrangeCashflowData(formData);

  // Register the change in the appropiate account
  const amountDifference = cashflowUpdateAmountDifference(data.AMOUNT);
  updateAccountBalance(data.ACCOUNT, amountDifference.toString());

  // Submit data
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateCashflow(data);
}

function submitUpdateStock(formData) {
  setPreloaderMessage(WORD.updatingInformation);
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateStock(formData);
}

function submitUpdateMovement(formData) {
  setPreloaderMessage(WORD.updatingInformation);
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateMovement(formData);
}

function submitUpdateSupplier(formData) {
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateSupplier(formData);
}

// Fetch all necesary data
function fetchAll() {
  if (settings.salePortfolio) {
    fetchPortfolio();
  }
  fetchCashflow();
  fetchStock();
  fetchMovements();
  // Future feature
  // fetchSuppliers();
}

function deletePortfolio() {
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removePortfolio(portfolioTable.selectedRowIds);
}

function deleteCashflow() {
  setPreloaderMessage(WORD.deleting);
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeCashflow(cashflowTable.selectedRowIds);
}

function deleteStock() {
  setPreloaderMessage(WORD.deleting);
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeStock(stockTable.selectedRowIds);
}

function deleteMovement() {
  setPreloaderMessage(WORD.deleting);
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeMovement(movementsTable.selectedRowIds);
}

function deleteSuppliers() {
  startPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeSuppliers(suppliersTable.selectedRowIds);
}

function saveSettings() {
  setPreloaderMessage(WORD.saving);
  startPreloader();
  saveBusinessInfo();
  google
    .script
    .run
    .withSuccessHandler(settingsSaved)
    .saveAppSettings(settings.data);
}

// Only save settings.data where balance data is
function saveBalance() {
  google
    .script
    .run
    .withSuccessHandler()
    .saveAppSettings(settings.data);
}

function fetchSettings() {
  google
    .script
    .run
    .withSuccessHandler(settingsObtained)
    .getAppSettings();
}

function submitManyMovements(movements) {
  google
    .script
    .run
    .withSuccessHandler(reloadMovementsValues)
    .insertManyMovements(movements);
}

function submitManyStockUpdates(stockChange) {
  google
    .script
    .run
    .withSuccessHandler(reloadStockValues)
    .updateManyStock(stockChange);
}
