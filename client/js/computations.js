function getBalance(values) {
  const income = getColumnTotal(values, 'INCOME');
  const outcome = getColumnTotal(values, 'OUTCOME');

  const balance = income - outcome;
  return balance;
}

function dashboardComputations() {
  const incomeElem = document.getElementById('income');
  const outcomeElem = document.getElementById('outcome');
  const balanceElem = document.getElementById('balance');

  // Cashflow totals
  appConfig.data.income = getColumnTotal(dbData.cashflow, 'INCOME');
  appConfig.data.outcome = getColumnTotal(dbData.cashflow, 'OUTCOME');

  appConfig.data.balance = appConfig.data.income - appConfig.data.outcome;

  // Pending: Format value according to the user preference
  incomeElem.innerHTML = `$ ${appConfig.data.income}`;
  outcomeElem.innerHTML = `$ ${appConfig.data.outcome}`;
  balanceElem.innerHTML = `Balance: $ ${appConfig.data.balance}`;
}
