function removeEntries() {
  google
    .script
    .run
    .withSuccessHandler(removedSuccess)
    .cashflowRemove(stockTable.selectedIds);
}

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

function submitNewProduct(formData) {
  google
    .script
    .run
    .withSuccessHandler(newProductSubmitted)
    .stockInsert(formData);
}

function updateStock(formData) {
  const packet = {
    meta: 'stock',
    data: { ...formData },
  };
  google
    .script
    .run
    .withSuccessHandler(stockUpdateSuccess)
    .update(packet);
}

// Fetch all necesary data
function fetchAll() {
  google
    .script
    .run
    .withSuccessHandler(loadInitValues)
    .fetchAllInventoryValues();
}
