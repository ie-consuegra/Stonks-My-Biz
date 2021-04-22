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
    this.checkboxes = [];
  }

  setToggleToolButtonsFunction(callback) {
    this.toggleToolButtons = callback;
  }

  /**
   * Get a 2d array of data and arrange it on the table
   * @param {Array<Array>} values A 2d array of all the values the table will display/contain
   * @returns void
   */
  load(values) {
    // Initialize this.checkboxes
    this.checkboxes = [];
    // Copy values
    this.values = [...values];
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');

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
    // If there are values, not only the column titles, add clickEventListeners to checkboxes
    if (values.length > 1) {
      this.addClickEventToCheckboxes();
      this.toggleToolButtons(this);
    }
  }

  reload(values) {
    this.removeClickEventToCheckboxes();
    this.load(values);
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
  addClickEventToCheckboxes() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', () => {
        this.toggleToolButtons(this);
      });
    });
  }

  /**
   * Remove onclick event listener to each checkbox
   * @param {action} action
   */
  removeClickEventToCheckboxes() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.removeEventListener('click', () => {
        this.toggleToolButtons(this);
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
