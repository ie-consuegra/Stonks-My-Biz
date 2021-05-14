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

  totals.inventoryCost = 0;
  totals.inventoryPrice = 0;

  // Remove array of titles (The first one)
  stock.shift();
  stock.forEach((entry) => {
    const code = entry[1];
    const item = entry[2];
    const minStock = entry[9];
    const currStock = entry[10];

    if (settings.data.stock.calcValue) {
      // Get total cost and price
      totals.inventoryCost += entry[7];
      totals.inventoryPrice += entry[8];
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

  settings.notifications = `${settings.notifications}${stockNotifications}`;
}

function dashboardComputations() {
  const incomeElem = document.getElementById('income');
  const outcomeElem = document.getElementById('outcome');
  const balanceElem = document.getElementById('balance');
  const notificationsElem = document.getElementById('notifications');

  // Cashflow totals
  totals.income = getColumnTotal(dbData.cashflow, 'INCOME');
  totals.outcome = getColumnTotal(dbData.cashflow, 'OUTCOME');

  totals.balance = totals.income - totals.outcome;

  // Pending: Format value according to the user preference
  incomeElem.innerHTML = `$ ${totals.income}`;
  outcomeElem.innerHTML = `$ ${totals.outcome}`;
  balanceElem.innerHTML = `Balance: $ ${totals.balance}`;

  processStockData();
  notificationsElem.innerHTML = settings.notifications;
}
