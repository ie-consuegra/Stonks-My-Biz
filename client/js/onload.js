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
  cashflowTable.addFormatter([4, 5, 6], formatCurrency);
  cashflowTable.load(values);

  dbData.cashflow = values;
  setLoadedDB();
}

function loadPortfolioValues(values) {
  portfolioTable.setInputCallback(toggleToolButtonsForPortfolio);
  portfolioTable.addFormatter([7, 8], formatCurrency);
  portfolioTable.load(values, { avoidColumns: [9, 11] });

  portfolioStockTable.setInputCallback(inputToRefs);

  dbData.portfolio = values;
  setLoadedDB();
}

function loadStockValues(values) {
  stockTable.setInputCallback(toggleToolButtonsForStock);
  stockTable.addFormatter([7, 8], formatCurrency);
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

function loadSettingValuesInInputs(settingsData) {
  const { company } = settingsData;
  const { preferences } = settingsData;

  const companyEntries = Object.entries(company);
  companyEntries.forEach(([key, value]) => {
    if (key === 'ids') {
      const idEntries = Object.entries(value);
      idEntries.forEach(([k, val]) => {
        document.getElementById(`business-${k}`).value = val.name;
        document.getElementById(`business-${k}-number`).value = val.number;
      });
    } else {
      document.getElementById(`business-${key}`).value = value;
    }
  });

  // Load preferences
  document.getElementById('currency').value = preferences.currency;
  selectOption(document.getElementById('date-format'), preferences.dateFormat);
  selectOption(document.getElementById('decimal-separator'), preferences.decimalSeparator);
  selectOption(document.getElementById('cents'), preferences.cents.toString());
}

function settingsObtained(settingsData) {
  if (isEmpty(settingsData)) {
    // Mandatory: User has to configure the app
    fetchAll(); // Attention to this line
    switchView('settings');
    loadSettingValuesInInputs(settings.data);
  } else {
    settings.load(settingsData);
    loadSettingValuesInInputs(settingsData);
    updateSettingsFormatExamples();
    fetchAll();
    switchView('dashboard'); //  <----------------- switch to the last view, by default it is dashboard-view
  }
}

window.addEventListener('load', () => {
  preventFormSubmit();
  showPreloader();
  fetchSettings();
});
