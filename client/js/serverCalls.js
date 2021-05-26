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
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertPortfolio(formData);
}

function submitNewSale(formData) {
  showPreloader();
  const data = arrangeCashflowData(formData);
  google
    .script
    .run
    .withSuccessHandler(saleSubmitted)
    .insertSale(data);
}

function submitNewPurchase(formData) {
  showPreloader();
  const data = arrangeCashflowData(formData);
  google
    .script
    .run
    .withSuccessHandler(purchaseSubmitted)
    .insertPurchase(data);
}

function submitNewCashflow(formData) {
  showPreloader();
  const data = arrangeCashflowData(formData);
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertCashflow(data);
}

function submitNewStock(formData) {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertStock(formData);
}

function submitNewMovement(formData) {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertMovement(formData);
}

function submitNewSupplier(formData) {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertSupplier(formData);
}

function submitUpdatePortfolio(formData) {
  showPreloader();
  const data = arrangeCashflowData(formData);
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updatePortfolio(data);
}

function submitUpdateCashflow(formData) {
  showPreloader();
  const data = arrangeCashflowData(formData);
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateCashflow(data);
}

function submitUpdateStock(formData) {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateStock(formData);
}

function submitUpdateMovement(formData) {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateMovement(formData);
}

function submitUpdateSupplier(formData) {
  showPreloader();
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
  fetchSuppliers();
}

function deletePortfolio() {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removePortfolio(portfolioTable.selectedIds);
}

function deleteCashflow() {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeCashflow(cashflowTable.selectedIds);
}

function deleteStock() {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeStock(stockTable.selectedIds);
}

function deleteMovement() {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeMovement(movementsTable.selectedIds);
}

function deleteSuppliers() {
  showPreloader();
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeSuppliers(suppliersTable.selectedIds);
}

function saveSettings() {
  showPreloader();
  saveBusinessInfo();
  google
    .script
    .run
    .withSuccessHandler(settingsSaved)
    .saveAppSettings(settings.data);
}

function fetchSettings() {
  google
    .script
    .run
    .withSuccessHandler(settingsObtained)
    .getAppSettings();
}
