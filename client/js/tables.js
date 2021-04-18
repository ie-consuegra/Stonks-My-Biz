/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const stockTable = new SmartTable('stock-table-container');
const receiptsAndIssuesTable = new SmartTable('receipts-and-issues-table-container');
const suppliersTable = new SmartTable('suppliers-table-container');

const stockPreloader = document.getElementById('stock-preloader');
const receiptsAndIssuesPreloader = document.getElementById('receipts-and-issues-preloader');
const suppliersPreloader = document.getElementById('suppliers-preloader');
/**
* Hide/Show items according to the number of selected entries
*/
function toggleItemsVisibility(smartTable) {
  const editBtn = document.getElementById('editBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    editBtn.style.display = 'inline-block';
    deleteBtn.style.display = 'inline-block';
  } else if (numChecked > 1) {
    editBtn.style.display = 'none';
    deleteBtn.style.display = 'inline-block';
  } else {
    editBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
  }
}

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

// ---
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

function removeEntries() {
  google
    .script
    .run
    .withSuccessHandler(removedSuccess)
    .cashflowRemove(stockTable.selectedIds);
}

const editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click', editEntry);

function toDate(ddmmyyyy) {
  let date = ddmmyyyy.toString();

  // Check if the format is a valid date string
  // This is a temporary checker
  if (date.length >= 6) {
    const dateArr = date.split('/');
    const month = (dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1]);
    const day = (dateArr[0].length === 1 ? `0${dateArr[0]}` : dateArr[0]);

    date = `${dateArr[2]}-${month}-${day}`;
  }

  return date;
}

function editEntry() {
  const id = stockTable.selectedCheckboxes[0].id.toString();

  const selectedEntry = stockTable.values.find((entry) => entry[0].toString() === id);

  document.getElementById('UPDID').value = id;
  document.getElementById('UPDDAY').value = selectedEntry[1];
  document.getElementById('UPDINCOME').value = selectedEntry[2];
  document.getElementById('UPDOUTCOME').value = selectedEntry[3];

  viewSwitcher('edit-product-view');
}

document.getElementById('deleteBtn').addEventListener('click', () => {
  removeEntries();
});

document.getElementById('addBtn').addEventListener('click', () => {
  viewSwitcher('submit-new-product-view');
});
