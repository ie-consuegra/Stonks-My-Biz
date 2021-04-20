function getTimestamp() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const timestamp = `${now.getDate()}/${month}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return timestamp;
}

function toDate(ddmmyyyy) {
  let date = ddmmyyyy.toString();

  // Check if the format is a valid date string
  // This is a temporary checker
  if (date.length >= 6) {
    const dateArr = date.split('/');
    const month = (dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1]);
    const day = (dateArr[0].length === 1 ? `0${dateArr[0]}` : dateArr[0]);

    date = `${dateArr[2]}-${month}-${day}`;
  }

  return date;
}
/**
* Class representing a table the user can interact with
*/
class SmartTable {
  /**
   * Create a table element where specified
   * @param {String} parentContainerId Id of the element where the table will be
   */
  constructor(parentContainerId) {
    const container = document.getElementById(parentContainerId);
    this.table = document.createElement('table');
    container.appendChild(this.table);
    this.addClickEventToCheckboxes = this.addClickEventToCheckboxes.bind(this);
    this.removeClickEventToCheckboxes = this.removeClickEventToCheckboxes.bind(this);
    // this.addClickEventToTableRows = this.addClickEventToTableRows.bind(this);
    // Initialize the values the table will contain
    this.values = [];
  }

  /**
   * Get a 2d array of data and arrange it on the table
   * @param {Array<Array>} values A 2d array of all the values the table will display/contain
   * @returns void
   */
  load(values) {
    // Copy values
    this.values = [...values];
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');

    // Initialize the array of checkboxes
    this.checkboxes = [];

    for (let i = 0; i < values.length; i += 1) {
      if (i === 0) {
        const theadRow = this.thead.insertRow();
        for (let j = 0; j < values[i].length; j += 1) {
          if (j === 0) {
            // Leave the first th blank, this is a column of checkboxes
            theadRow.innerHTML = '<th></th>';
          } else {
            theadRow.innerHTML = `${theadRow.innerHTML}<th>${values[i][j]}</th>`;
          }
        }
      } else {
        const tbodyRow = this.tbody.insertRow();
        for (let j = 0; j < values[i].length; j += 1) {
          const cell = tbodyRow.insertCell(j);
          if (j === 0) {
            // Insert a checkbox in the first cell of each row
            // Add row id value to each checkbox as its own id
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            const span = document.createElement('span');

            checkbox.setAttribute('type', 'checkbox');
            checkbox.id = values[i][j];
            label.appendChild(checkbox);
            label.appendChild(span);
            cell.appendChild(label);
            // Store each checkbox into an array
            this.checkboxes.push(checkbox);
          } else {
            cell.innerHTML = values[i][j];
          }
        }
      }
    }

    // Remove any content the table could contain before loading new data
    this.table.innerHTML = '';
    // Append thead and tbody
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    // Add classes to the table
    this.table.classList.add('striped');
  }

  /**
   * This callback is called when a checkbox is clicked
   * @callback action
   * @param {object} table The smartTable object
   */

  /**
   * Add an onclick event listener to each checkbox
   * @param {action} action
   */
  addClickEventToCheckboxes(action) {
    this.checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', () => {
        action(this);
      });
    });
  }

  /**
   * Remove onclick event listener to each checkbox
   * @param {action} action
   */
  removeClickEventToCheckboxes(action) {
    this.checkboxes.forEach((checkbox) => {
      checkbox.removeEventListener('click', () => {
        action(this);
      });
    });
  }

  /**
   * Add an onclick event listener to each table row
   * @param {action} action
   */
  addClickEventToTableRows(action) {
    this.tableRows = Array.from(this.tbody.childNodes);
    this.tableRows.forEach((tableRow) => {
      tableRow.addEventListener('click', (e) => {
        action(e);
      });
    });
  }

  /**
   * Return an array of checked checkboxes
   */
  get selectedCheckboxes() {
    return this.checkboxes.filter((checkbox) => checkbox.checked === true);
  }

  /**
   * Return an array of checked checkboxes ids
   */
  get selectedIds() {
    const ids = this.selectedCheckboxes.map((checkbox) => checkbox.id.toString());
    return ids;
  }
}
const appConfig = {
  currentView: '',
  set view(viewName) {
    if (viewName !== undefined) {
      this.currentView = viewName;
    }
  },
  get view() {
    return this.currentView;
  },
};
// Action button container
const actionButton = document.getElementById('action-button');

// "Smart tables"
const stockTable = new SmartTable('stock-table-container');
const receiptsAndIssuesTable = new SmartTable('receipts-and-issues-table-container');
const suppliersTable = new SmartTable('suppliers-table-container');

const stockPreloader = document.getElementById('stock-preloader');
const receiptsAndIssuesPreloader = document.getElementById('receipts-and-issues-preloader');
const suppliersPreloader = document.getElementById('suppliers-preloader');

const classesForActiveLink = ['indigo', 'lighten-5', 'indigo-text', 'text-darken-4'];
const classesForActiveIcon = ['indigo-text', 'text-darken-4'];
function setActiveView(view) {
  const appViews = document.querySelector('#views').childNodes;
  appViews.forEach((node) => {
    if (node.nodeName.toLowerCase() === 'div') {
      node.style.display = 'none';
    }
  });
  const activeView = document.getElementById(view);
  activeView.style.display = 'block';
  return false; // Avoid reloading the page
}

function setActiveLink(linkId) {
  const link = document.getElementById(linkId);
  const [icon] = link.children;
  link.classList.add(...classesForActiveLink);
  icon.classList.add(...classesForActiveIcon);
}

function setInactiveLink(linkId) {
  const link = document.getElementById(linkId);
  const [icon] = link.children;
  link.classList.remove(...classesForActiveLink);
  icon.classList.remove(...classesForActiveIcon);
}

function switchView(view) {
  const viewDivId = `${view}-view`;
  const viewLinkId = `${view}-link`;

  setActiveView(viewDivId);

  if (appConfig.view) {
    const lastViewLinkId = `${appConfig.view}-link`;
    setInactiveLink(lastViewLinkId);
  }
  setActiveLink(viewLinkId);

  appConfig.view = view;
}

function switchSubView(subView) {
  const { view } = appConfig;
  const viewDivId = `${subView}-${view}-view`;
  setActiveView(viewDivId);
}
function loadStock(values) {
  stockTable.load(values);
  stockTable.addClickEventToCheckboxes(toggleItemsVisibility);
  document.getElementById('stock-preloader').style.display = 'none';
  M.AutoInit();
}

function loadReceiptAndIssue(values) {
  receiptAndIssueTable.load(values);
  receiptAndIssueTable.addClickEventToCheckboxes(toggleItemsVisibility);
  document.getElementById('receipt-and-issue-preloader').style.display = 'none';
  M.AutoInit();
}

function reloadStock(values) {
  stockTable.removeClickEventToCheckboxes(toggleItemsVisibility);
  stockTable.load(values);
  stockTable.addClickEventToCheckboxes(toggleItemsVisibility);
}

function stockUpdateSuccess(values) {
  viewSwitcher('stock-view');
  reloadStock(values);
  document.getElementById('new-product-form').reset();
  toggleItemsVisibility(stockTable);
}

function removedSuccess(values) {
  reloadStock(values);
  toggleItemsVisibility(stockTable);
}

function newProductSubmitted(values) {
  viewSwitcher('stock-view');
  reloadStock(values);
  document.getElementById('new-product-form').reset();
  toggleItemsVisibility(stockTable);
}
function removeEntries() {
  google
    .script
    .run
    .withSuccessHandler(removedSuccess)
    .cashflowRemove(stockTable.selectedIds);
}

function stockFetch() {
  google
    .script
    .run
    .withSuccessHandler(loadStock)
    .stockFetch();
}

function fetchReceiptAndIssue() {
  google
    .script
    .run
    .withSuccessHandler(loadReceiptAndIssue)
    .getReceiptAndIssueData();
}

function submitNewProduct(formData) {
  google
    .script
    .run
    .withSuccessHandler(newProductSubmitted)
    .stockInsert(formData);
}

function updateStock(formData) {
  const packet = {
    meta: 'stock',
    data: { ...formData },
  };
  google
    .script
    .run
    .withSuccessHandler(stockUpdateSuccess)
    .update(packet);
}

// Fetch all necesary data
function fetchAll() {
  google
    .script
    .run
    .withSuccessHandler(loadInitValues)
    .fetchAllInventoryValues();
}
/**
* Hide/Show items according to the number of selected entries
*/
function toggleItemsVisibility(smartTable) {
  const editBtn = document.getElementById('editBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  const numChecked = smartTable.selectedCheckboxes.length;

  if (numChecked === 1) {
    editBtn.style.display = 'inline-block';
    deleteBtn.style.display = 'inline-block';
  } else if (numChecked > 1) {
    editBtn.style.display = 'none';
    deleteBtn.style.display = 'inline-block';
  } else {
    editBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
  }
}

function editEntry() {
  const id = stockTable.selectedCheckboxes[0].id.toString();

  const selectedEntry = stockTable.values.find((entry) => entry[0].toString() === id);

  document.getElementById('UPDID').value = id;
  document.getElementById('UPDDAY').value = selectedEntry[1];
  document.getElementById('UPDINCOME').value = selectedEntry[2];
  document.getElementById('UPDOUTCOME').value = selectedEntry[3];

  viewSwitcher('edit-product-view');
}

const editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click', editEntry);


document.getElementById('deleteBtn').addEventListener('click', () => {
  removeEntries();
});

document.getElementById('addBtn').addEventListener('click', () => {
  viewSwitcher('submit-new-product-view');
});
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

window.addEventListener('load', () => {
  preventFormSubmit();
  switchView('dashboard'); //  <----------------- switch to the last view, by default it is dashboard-view
  fetchAll();
  M.AutoInit();
});
const today = new Date();
// const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const dayNum = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const formattedDayNum = (dayNum < 10) ? `0${dayNum}` : `${dayNum}`;
const formattedMonth = (month < 10) ? `0${month}` : `${month}`;
const formattedDate = `${formattedDayNum}/${formattedMonth}/${year}`;

// datepicker settings
document.addEventListener('DOMContentLoaded', () => {
  const allDatePickers = Array.from(document.querySelectorAll('input[date]'));
  const options = {
    format: 'dd/mm/yyyy',
    i18n: {
      cancel: 'cancelar',
      done: 'Aceptar',
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      setDefaultDate: true,
      defaultDate: today,
    },
  };
  allDatePickers.forEach((datepicker) => {
    datepicker.value = formattedDate;
    M.Datepicker.init(datepicker, options);
  });
});
