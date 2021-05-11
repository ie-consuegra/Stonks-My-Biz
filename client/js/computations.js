function getBalance(values) {
  const income = getColumnTotal(values, 'INCOME');
  const outcome = getColumnTotal(values, 'OUTCOME');

  const balance = income - outcome;
  return balance;
}

function processStockData() {
  const { stock } = dbData;
  let stockNotifications = '';
  const depletedTitle = '<p><strong>Depleted stock</strong></p>';
  const minimumTitle = '<p><strong>Stock below minimum</strong></p>';
  let depletedStock = '';
  let minimumStock = '';

  appConfig.data.inventoryCost = 0;
  appConfig.data.inventoryPrice = 0;

  // Remove array of titles (The first one)
  stock.shift();
  stock.forEach((entry) => {
    const code = entry[1];
    const item = entry[2];
    const minStock = entry[9];
    const currStock = entry[10];

    if (appConfig.stock.calcValue) {
      // Get total cost and price
      appConfig.data.inventoryCost += entry[7];
      appConfig.data.inventoryPrice += entry[8];
    }

    if (currStock <= minStock) {
      if (currStock === 0) {
        const note = `<li>(${code}) ${item}</li>`;
        depletedStock = `${depletedStock}${note}`;
      } else {
        const note = `<li>(${code}) ${item}: <strong>${currStock}</strong></li>`;
        minimumStock = `${minimumStock}${note}`;
      }
    }
  });

  stockNotifications = '';

  if (!depletedStock) {
    depletedStock = '<p>---</p>';
  }
  if (!minimumStock) {
    minimumStock = '<p>---</p>';
  }

  stockNotifications = `${depletedTitle}${depletedStock}<br>${minimumTitle}${minimumStock}`;

  appConfig.notifications = `${appConfig.notifications}${stockNotifications}`;
}

function dashboardComputations() {
  const incomeElem = document.getElementById('income');
  const outcomeElem = document.getElementById('outcome');
  const balanceElem = document.getElementById('balance');
  const notificationsElem = document.getElementById('notifications');

  // Cashflow totals
  appConfig.data.income = getColumnTotal(dbData.cashflow, 'INCOME');
  appConfig.data.outcome = getColumnTotal(dbData.cashflow, 'OUTCOME');

  appConfig.data.balance = appConfig.data.income - appConfig.data.outcome;

  // Pending: Format value according to the user preference
  incomeElem.innerHTML = `$ ${appConfig.data.income}`;
  outcomeElem.innerHTML = `$ ${appConfig.data.outcome}`;
  balanceElem.innerHTML = `Balance: $ ${appConfig.data.balance}`;

  processStockData();
  notificationsElem.innerHTML = appConfig.notifications;
}
