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
    case 'receipts-and-issues':
      receiptsAndIssuesTable.reload(values);
      dbData.receiptsAndIssues = values;
      break;
    case 'suppliers':
      suppliersTable.reload(values);
      dbData.receiptsAndIssues = values;
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

function saleSubmitted(values) {
  dbData.cashflow = values;
  cashflowTable.reload(values);
}

function purchaseSubmitted(values) {
  dbData.cashflow = values;
  cashflowTable.reload(values);
}
