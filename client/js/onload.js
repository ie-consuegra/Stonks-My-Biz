// Prevent forms from reloading on submitting.
function preventFormSubmit() {
  const forms = document.querySelectorAll('form');
  for (let i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }
}

function startPreloader() {
  preloader.style.display = 'block';
  document.getElementById('preloader-spinner-container').style.display = 'block';
  document.getElementById('preloader-done-container').style.display = 'none';
}

function endPreloader(time = 600, successful = 'true', message = '') {
  if (successful) {
    document.getElementById('preloader-spinner-container').style.display = 'none';
    document.getElementById('preloader-done-container').style.display = 'block';
    document.getElementById('preloader-result-icon').innerText = 'done';
    if (message) {
      setPreloaderMessage(message);
    } else {
      setPreloaderMessage('Done!');
    }
  } else {
    document.getElementById('preloader-spinner-container').style.display = 'none';
    document.getElementById('preloader-done-container').style.display = 'block';
    document.getElementById('preloader-result-icon').innerText = 'error';
    if (message) {
      setPreloaderMessage(message);
    } else {
      setPreloaderMessage('There was an error.');
    }
  }
  if (time === 0) {
    preloader.style.display = 'none';
  } else {
    setTimeout(() => {
      preloader.style.display = 'none';
    }, time);
  }
}

function copyObjectEntries(objReceives, objGives) {
  const entries = Object.entries(objGives);
  entries.forEach(([key, value]) => {
    objReceives[key] = value;
  });
}

function setupSalesAndPurchasesTable() {
  salesPortfolioTable.addFormatter([3, 4], formatCurrency);
  salesPortfolioTable.setInputCallback(invoiceCalc);
  purchasesStockTable.addFormatter([3, 4], formatCurrency);
  purchasesStockTable.setInputCallback(invoiceCalc);

  // Add formatters to the table in update cashflow that loads
  // stock items in sales and purchases.
  metaStockItemsTable.addFormatter([3, 4], formatCurrency);
}

function setLoadedDB() {
  settings.dbsLoaded += 1;
  // Check if all databases are loaded
  // 3 Databases: Cashflow, stock and 'receipts and issues'
  // const numOfDbs = settings.salePortfolio ? 5 : 4; (future feature)
  const numOfDbs = 3;
  if (settings.dbsLoaded >= numOfDbs) {
    dbData.loaded = true;
    M.AutoInit(); // Initialize Materialize when everything's loaded
    initDatepickers(); // Initialize datepickers
    dashboardComputations(); // Use the data to show info on the dashboard
    setupSalesAndPurchasesTable();
    endPreloader(0);
  }
}

function loadCashflowValues(values) {
  cashflowTable.setInputCallback(toggleToolButtons);
  cashflowTable.addFormatter([4], formatCurrency);
  cashflowTable.load(values, { avoidColumns: [6] });

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
  // Don't show fields connected to future features: description and supplier
  stockTable.load(values, { avoidColumns: [3, 11] });

  dbData.stock = values;
  setLoadedDB();
}

function reloadStockValues(values) {
  stockTable.load(values);
  dbData.stock = values;
}

function loadMovementsValues(values) {
  movementsTable.setInputCallback(toggleToolButtons);
  movementsTable.load(values);

  dbData.movements = values;
  setLoadedDB();
}

function reloadMovementsValues(values) {
  movementsTable.load(values);
  dbData.movements = values;
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
  const { sales } = settingsData;

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

    // Make visible/invisible the buttons in sales view
    // Check the appropiate radio input in settings view > sales
    if (sales.loadFromStock === true && sales.loadFromPortfolio === false) {
      document.getElementById('stock-only').checked = true;
      document.getElementById('sales-go-stock-btn').style.display = 'block';
      document.getElementById('sales-go-portfolio-btn').style.display = 'none';
    } else if (sales.loadFromStock && sales.loadFromPortfolio) {
      document.getElementById('stock-and-portfolio').checked = true;
      document.getElementById('sales-go-stock-btn').style.display = 'block';
      document.getElementById('sales-go-portfolio-btn').style.display = 'block';
    } else {
      document.getElementById('portfolio-only').checked = true;
      document.getElementById('sales-go-stock-btn').style.display = 'none';
      document.getElementById('sales-go-portfolio-btn').style.display = 'block';
    }
  });

  // Load preferences
  document.getElementById('currency').value = preferences.currency;
  selectOption(document.getElementById('date-format'), preferences.dateFormat);
  selectOption(document.getElementById('decimal-separator'), preferences.decimalSeparator);
  selectOption(document.getElementById('cents'), preferences.cents.toString());
}

function defineCurrencyInputs() {
  const currencyInputs = document.querySelectorAll('.currency-input');

  const { decimalSeparator, cents } = settings.data.preferences;

  const numberFormatterWhenInputting = (num) => formatNumber(num, decimalSeparator, 2);
  const numberFormatterWhenLeaving = (num) => formatNumber(num, decimalSeparator, 2, cents);

  for (let index = 0; index < currencyInputs.length; index += 1) {
    const input = currencyInputs[index];

    input.addEventListener('keyup', () => {
      const { value } = input;
      input.value = numberFormatterWhenInputting(value);
    });

    input.addEventListener('blur', () => {
      const { value } = input;
      input.value = numberFormatterWhenLeaving(value);
    });
  }
}

function settingsObtained(settingsData) {
  if (isEmpty(settingsData)) {
    // Mandatory: User has to configure the app
    fetchAll(); // Attention to this line
    switchView('settings');
    loadSettingValuesInInputs(settings.data);
  } else {
    settings.load(settingsData);
    // The app loaded the number of the last sale, so increase it
    increaseSaleSerial();
    loadSettingValuesInInputs(settingsData);
    updateSettingsFormatExamples();
    displayAccountForms();
    loadAccounts();
    fetchAll();
    switchView('dashboard'); //  <----------------- switch to the last view, by default it is dashboard-view
  }

  defineCurrencyInputs();

  // Show links to the portfolio view if set by user
  if (settings.salePortfolio) {
    const portfolioLiElem = document.getElementById('portfolio-li');
    const salesGoPorfolioBtn = document.getElementById('sales-go-portfolio-btn');

    portfolioLiElem.style.display = 'list-item';
    salesGoPorfolioBtn.style.display = 'block';
  }
}

window.addEventListener('load', () => {
  preventFormSubmit();
  startPreloader();
  setPreloaderMessage(WORD.loading);
  fetchSettings();
});
