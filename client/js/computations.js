function formatCurrency(num) {
  let formattedCurrency = '';
  if (num) {
    const integerSign = (Number(num) < 0 ? '-' : '');
    const { currency, decimalSeparator, cents } = settings.data.preferences;
    const formattedNumber = formatNumber(num, decimalSeparator, 2, cents);
    formattedCurrency = `${currency}${integerSign}${formattedNumber}`;
  }
  return formattedCurrency;
}

/**
 * Transform a number (string) with thousands and decimal separators into a parsable string
 * @param {String} numStr Number in string form
 * @returns String Number in string form parsable by JavaScript into a number
 */
function makeParsable(numStr) {
  const { decimalSeparator } = settings.data.preferences;
  return makeParsableToNum(numStr, decimalSeparator);
}

function processStockData() {
  const stock = [...dbData.stock];
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

  settings.notifications = ''; // Reset notifications
  settings.notifications = `${settings.notifications}${stockNotifications}`;
}

/**
 * Get the total balance by adding each account amount
 * @returns Number, Total of the balances of the accounts
 */
function getBalance() {
  const { balance } = settings.data;
  let totalBalance = 0;
  if (balance.length >= 1) {
    balance.forEach((account) => {
      totalBalance += Number(account.balance);
    });
  }
  return totalBalance;
}

function dashboardComputations() {
  const incomeElem = document.getElementById('income');
  const outcomeElem = document.getElementById('outcome');
  const currentMonthBalance = document.getElementById('current-month-balance');
  const balanceElem = document.getElementById('balance');
  const notificationsElem = document.getElementById('notifications');

  // Cashflow totals
  totals.income = getColumnTotal(dbData.cashflow, 'AMOUNT', 'positive');
  totals.outcome = getColumnTotal(dbData.cashflow, 'AMOUNT', 'negative') * -1;

  totals.balance = totals.income - totals.outcome;

  // Format total values according to user preferences
  const formattedIncome = formatCurrency(totals.income.toString());
  const formattedOutcome = formatCurrency(totals.outcome.toString());
  const formattedTotal = formatCurrency(totals.balance.toString());
  const formattedBalance = formatCurrency(getBalance().toString());

  incomeElem.innerHTML = formattedIncome;
  outcomeElem.innerHTML = formattedOutcome;
  currentMonthBalance.innerHTML = formattedTotal;
  balanceElem.innerHTML = `Balance: ${formattedBalance}`;

  processStockData();
  notificationsElem.innerHTML = settings.notifications;
}
