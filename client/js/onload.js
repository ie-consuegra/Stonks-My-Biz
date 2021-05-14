// Prevent forms from reloading on submitting.
function preventFormSubmit() {
  const forms = document.querySelectorAll('form');
  for (let i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }
}

function showPreloader() {
  preloader.style.display = 'block';
}

function hidePreloader() {
  preloader.style.display = 'none';
}

function copyObjectEntries(objReceives, objGives) {
  const entries = Object.entries(objGives);
  entries.forEach(([key, value]) => {
    objReceives[key] = value;
  });
}

function setLoadedDB() {
  settings.dbsLoaded += 1;
  // Check if there are enough databases
  // loaded to let use the app
  if (settings.dbsLoaded >= 5) {
    dbData.loaded = true;
    M.AutoInit(); // Initialize Materialize when everything's loaded
    initDatepickers(); // Initialize datepickers
    dashboardComputations(); // Use the data to show info on the dashboard
    hidePreloader();
  }
}

function loadCashflowValues(values) {
  cashflowTable.setInputCallback(toggleToolButtons);
  cashflowTable.load(values);

  dbData.cashflow = values;
  setLoadedDB();
}

function loadPortfolioValues(values) {
  portfolioTable.setInputCallback(toggleToolButtonsForPortfolio);
  portfolioTable.load(values, { avoidColumns: [9, 11] });

  portfolioStockTable.setInputCallback(inputToRefs);

  dbData.portfolio = values;
  setLoadedDB();
}

function loadStockValues(values) {
  stockTable.setInputCallback(toggleToolButtonsForStock);
  stockTable.load(values);

  dbData.stock = values;
  setLoadedDB();
}

function loadMovementsValues(values) {
  movementsTable.setInputCallback(toggleToolButtons);
  movementsTable.load(values);

  dbData.movements = values;
  setLoadedDB();
}

function loadSuppliersValues(values) {
  suppliersTable.setInputCallback(toggleToolButtons);
  suppliersTable.load(values);

  dbData.suppliers = values;
  setLoadedDB();
}

function settingsObtained(settingsData) {
  if (isEmpty(settingsData)) {
    // Mandatory: User has to configure the app
    fetchAll(); // Attention to this line
    switchView('settings');
  } else {
    settings.load(settingsData);
    fetchAll();
    switchView('dashboard'); //  <----------------- switch to the last view, by default it is dashboard-view
  }
}

window.addEventListener('load', () => {
  preventFormSubmit();
  showPreloader();
  fetchSettings();
});
