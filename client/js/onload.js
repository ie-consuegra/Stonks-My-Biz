// Prevent forms from reloading on submitting.
function preventFormSubmit() {
  const forms = document.querySelectorAll('form');
  for (let i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }
}

function loadInitValues(data) {
  const {
    cashflow,
    stock,
    suppliers,
    receiptsAndIssues,
  } = data;

  // Cashflow section
  cashflowTable.setToggleToolButtonsFunction(toggleToolButtons);
  cashflowTable.load(cashflow);
  cashflowPreloader.style.display = 'none';

  const sales = cashflowTable.getFilteredValuesBy({ field: 'CONCEPT', keyword: 'sale' });
  const purchases = cashflowTable.getFilteredValuesBy({ field: 'CONCEPT', keyword: 'purchase' });

  salesTable.setToggleToolButtonsFunction(toggleToolButtons);
  salesTable.load(sales);
  salesPreloader.style.display = 'none';

  purchasesTable.setToggleToolButtonsFunction(toggleToolButtons);
  purchasesTable.load(purchases);
  purchasesPreloader.style.display = 'none';

  // Inventory section
  stockTable.setToggleToolButtonsFunction(toggleToolButtons);
  stockTable.load(stock);
  stockPreloader.style.display = 'none';

  receiptsAndIssuesTable.setToggleToolButtonsFunction(toggleToolButtons);
  receiptsAndIssuesTable.load(receiptsAndIssues);
  receiptsAndIssuesPreloader.style.display = 'none';

  suppliersTable.setToggleToolButtonsFunction(toggleToolButtons);
  suppliersTable.load(suppliers);
  suppliersPreloader.style.display = 'none';
}

window.addEventListener('load', () => {
  preventFormSubmit();
  switchView('dashboard'); //  <----------------- switch to the last view, by default it is dashboard-view
  fetchAll();
  M.AutoInit();
});
