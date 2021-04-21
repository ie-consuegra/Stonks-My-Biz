function loadStock(values) {
  stockTable.load(values);
  stockTable.addClickEventToCheckboxes(toggleToolButtons);
  document.getElementById('stock-preloader').style.display = 'none';
  M.AutoInit();
}

function loadReceiptAndIssue(values) {
  receiptAndIssueTable.load(values);
  receiptAndIssueTable.addClickEventToCheckboxes(toggleToolButtons);
  document.getElementById('receipt-and-issue-preloader').style.display = 'none';
  M.AutoInit();
}

function reloadOnTable(values) {
  switch (appConfig.view) {
    case 'stock':
      stockTable.removeClickEventToCheckboxes(toggleToolButtons);
      stockTable.load(values);
      stockTable.addClickEventToCheckboxes(toggleToolButtons);
      break;
    case 'receipts-and-issues':
      receiptsAndIssuesTable.removeClickEventToCheckboxes(toggleToolButtons);
      receiptsAndIssuesTable.load(values);
      receiptsAndIssuesTable.addClickEventToCheckboxes(toggleToolButtons);
      break;
    case 'suppliers':
      suppliersTable.removeClickEventToCheckboxes(toggleToolButtons);
      suppliersTable.load(values);
      suppliersTable.addClickEventToCheckboxes(toggleToolButtons);
      break;
    default:
      break;
  }
}

function removedSuccess(values) {
  reloadStock(values);
  toggleToolButtons(stockTable);
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
  switch (view) {
    case 'stock':
      toggleToolButtons(stockTable);
      break;
    case 'receipts-and-issues':
      toggleToolButtons(receiptsAndIssuesTable);
      break;
    case 'suppliers':
      toggleToolButtons(suppliersTable);
      break;
    default:
      break;
  }
}

function updateSubmitted(values) {
  const { view } = appConfig;
  switchView(view);
  reloadOnTable(values);
  resetForm('update');
  switch (view) {
    case 'stock':
      toggleToolButtons(stockTable);
      break;
    case 'receipts-and-issues':
      toggleToolButtons(receiptsAndIssuesTable);
      break;
    case 'suppliers':
      toggleToolButtons(suppliersTable);
      break;
    default:
      break;
  }
}
