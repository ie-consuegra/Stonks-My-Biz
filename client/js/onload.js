/* eslint-disable no-undef */
// Prevent forms from reloading on submitting.
function preventFormSubmit() {
  const forms = document.querySelectorAll('form');
  for (let i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }
}

function loadInitValues({ stock, suppliers, receiptsAndIssues }) {
  stockTable.load(stock);
  stockPreloader.style.display = 'none';

  receiptsAndIssuesTable.load(receiptsAndIssues);
  receiptsAndIssuesPreloader.style.display = 'none';

  suppliersTable.load(suppliers);
  suppliersPreloader.style.display = 'none';
}

// Fetch all necesary data
function fetchAll() {
  google
    .script
    .run
    .withSuccessHandler(loadInitValues)
    .fetchAllInventoryValues();
}

window.addEventListener('load', () => {
  preventFormSubmit();
  fetchAll();
  M.AutoInit();
  viewSwitcher('dashboard-view'); //  <----------------- switch to the last view, by default it is dashboard-view
});
