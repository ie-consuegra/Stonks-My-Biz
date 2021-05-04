function stockFetch() {
  google
    .script
    .run
    .withSuccessHandler(loadStock)
    .stockFetch();
}

function fetchMovement() {
  google
    .script
    .run
    .withSuccessHandler(loadMovement)
    .getMovementData();
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
  google
    .script
    .run
    .withSuccessHandler(loadInitValues)
    .fetchAllDBValues();
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
