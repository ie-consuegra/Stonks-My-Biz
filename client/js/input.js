/**
* Hide/Show items according to the number of selected entries
*/
function toggleToolButtons(smartTable) {
  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'inline-block';
    actionDeleteBtn.style.display = 'inline-block';
  } else if (numChecked > 1) {
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'inline-block';
  } else {
    actionAddBtn.style.display = 'inline-block';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';
  }
}

function loadInForm() {
  const { view } = appConfig;
  let table;
  const formId = `update-${view}-form`;
  const formElem = document.getElementById(formId);
  const formInputs = formElem.children;

  switch (view) {
    case 'stock':
      table = stockTable;
      break;
    case 'receipts-and-issues':
      table = receiptsAndIssuesTable;
      break;
    case 'suppliers':
      table = suppliersTable;
      break;
    default:
      break;
  }

  const entryId = table.selectedCheckboxes[0].id.toString();

  const selectedEntry = table.values.find((entry) => entry[0].toString() === entryId);

  selectedEntry.forEach((field, index) => {
    formInputs[index].value = field;
  });
}

function actionAdd() {
  switchSubView('add');
}

function actionUpdate() {
  loadInForm();
  switchSubView('update');
}

function actionDelete() {
  // Show dialog asking if sure to delete
  M.Modal.getInstance(deleteModal).open();
}

function actionDeleteContinue() {
  // Delete selected stuff
}
