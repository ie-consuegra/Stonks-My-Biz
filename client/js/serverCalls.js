function stockFetch() {
  google
    .script
    .run
    .withSuccessHandler(loadStock)
    .stockFetch();
}

function fetchReceiptAndIssue() {
  google
    .script
    .run
    .withSuccessHandler(loadReceiptAndIssue)
    .getReceiptAndIssueData();
}

function submitNewPortfolio(formData) {
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertPortfolio(formData);
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

function submitNewReceiptAndIssue(formData) {
  google
    .script
    .run
    .withSuccessHandler(newSubmitted)
    .insertReceiptAndIssue(formData);
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

function submitUpdateReceiptAndIssue(formData) {
  google
    .script
    .run
    .withSuccessHandler(updateSubmitted)
    .updateReceiptAndIssue(formData);
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

function deleteReceiptsAndIssues() {
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeReceiptsAndIssues(receiptsAndIssuesTable.selectedIds);
}

function deleteSuppliers() {
  google
    .script
    .run
    .withSuccessHandler(removeSuccess)
    .removeSuppliers(suppliersTable.selectedIds);
}
