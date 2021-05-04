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
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertPortfolio(formData);
}

function submitNewSale(formData) {
  google
    .script
    .run
    .withSuccessHandler(saleSubmitted)
    .insertSale(formData);
}

function submitNewPurchase(formData) {
  google
    .script
    .run
    .withSuccessHandler(purchaseSubmitted)
    .insertPurchase(formData);
}

function submitNewCashflow(formData) {
  const data = arrangeCashflowData(formData);
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertCashflow(data);
}

function submitNewStock(formData) {
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertStock(formData);
}

function submitNewMovement(formData) {
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertMovement(formData);
}

function submitNewSupplier(formData) {
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertSupplier(formData);
}

function submitUpdatePortfolio(formData) {
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updatePortfolio(formData);
}

function submitUpdateCashflow(formData) {
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateCashflow(formData);
}

function submitUpdateStock(formData) {
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateStock(formData);
}

function submitUpdateMovement(formData) {
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateMovement(formData);
}

function submitUpdateSupplier(formData) {
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateSupplier(formData);
}

// Fetch all necesary data
function fetchAll() {
  fetchPortfolio();
  fetchCashflow();
  fetchStock();
  fetchMovements();
  fetchSuppliers();
}

function deletePortfolio() {
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removePortfolio(portfolioTable.selectedIds);
}

function deleteCashflow() {
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeCashflow(cashflowTable.selectedIds);
}

function deleteStock() {
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeStock(stockTable.selectedIds);
}

function deleteMovement() {
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeMovement(movementsTable.selectedIds);
}

function deleteSuppliers() {
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeSuppliers(suppliersTable.selectedIds);
}
