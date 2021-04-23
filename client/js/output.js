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
    case 'cashflow':
      cashflowTable.reload(values);
      break;
    case 'stock':
      stockTable.reload(values);
      break;
    case 'receipts-and-issues':
      receiptsAndIssuesTable.reload(values);
      break;
    case 'suppliers':
      suppliersTable.reload(values);
      break;
    default:
      break;
  }
}

function removeSuccess(values) {
  reloadOnTable(values);
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
}

function updateSubmitted(values) {
  const { view } = appConfig;
  switchView(view);
  reloadOnTable(values);
  resetForm('update');
}
