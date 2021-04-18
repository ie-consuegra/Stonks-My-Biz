function loadStock(values) {
  stockTable.load(values);
  stockTable.addClickEventToCheckboxes(toggleItemsVisibility);
  document.getElementById('stock-preloader').style.display = 'none';
  M.AutoInit();
}

function loadReceiptAndIssue(values) {
  receiptAndIssueTable.load(values);
  receiptAndIssueTable.addClickEventToCheckboxes(toggleItemsVisibility);
  document.getElementById('receipt-and-issue-preloader').style.display = 'none';
  M.AutoInit();
}

function reloadStock(values) {
  stockTable.removeClickEventToCheckboxes(toggleItemsVisibility);
  stockTable.load(values);
  stockTable.addClickEventToCheckboxes(toggleItemsVisibility);
}

function stockUpdateSuccess(values) {
  viewSwitcher('stock-view');
  reloadStock(values);
  document.getElementById('new-product-form').reset();
  toggleItemsVisibility(stockTable);
}

function removedSuccess(values) {
  reloadStock(values);
  toggleItemsVisibility(stockTable);
}

function newProductSubmitted(values) {
  viewSwitcher('stock-view');
  reloadStock(values);
  document.getElementById('new-product-form').reset();
  toggleItemsVisibility(stockTable);
}
