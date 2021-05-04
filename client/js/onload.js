// Prevent forms from reloading on submitting.
function preventFormSubmit() {
  const forms = document.querySelectorAll('form');
  for (let i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }
}

function copyObjectEntries(objReceives, objGives) {
  const entries = Object.entries(objGives);
  entries.forEach(([key, value]) => {
    objReceives[key] = value;
  });
}

function loadInitValues(data) {
  const {
    cashflow,
    portfolio,
    stock,
    suppliers,
    movements,
  } = data;

  // Cashflow section
  cashflowTable.setInputCallback(toggleToolButtons);
  cashflowTable.load(cashflow);
  cashflowPreloader.style.display = 'none';

  // Portfolio section
  portfolioTable.setInputCallback(toggleToolButtonsForPortfolio);
  portfolioTable.load(portfolio, { avoidColumns: [9, 11] });
  portfolioPreloader.style.display = 'none';

  portfolioStockTable.setInputCallback(inputToRefs);

  // Inventory section
  stockTable.setInputCallback(toggleToolButtonsForStock);
  stockTable.load(stock);
  stockPreloader.style.display = 'none';

  movementsTable.setInputCallback(toggleToolButtons);
  movementsTable.load(movements);
  movementsPreloader.style.display = 'none';

  suppliersTable.setInputCallback(toggleToolButtons);
  suppliersTable.load(suppliers);
  suppliersPreloader.style.display = 'none';

  // Update dbData
  copyObjectEntries(dbData, data);
  dbData.loaded = true;
}

window.addEventListener('load', () => {
  preventFormSubmit();
  switchView('dashboard'); //  <----------------- switch to the last view, by default it is dashboard-view
  fetchAll();
  M.AutoInit();
});
