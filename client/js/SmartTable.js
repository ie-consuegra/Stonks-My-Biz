/**
* Class representing a table the user can interact with
*/
class SmartTable {
  /**
   * Create a table element where specified
   * @param {String} parentContainerId Id of the element where the table will be
   * @param {Array} type Type of table defined by an array of classes
   */
  constructor(parentContainerId, type) {
    const container = document.getElementById(parentContainerId);
    this.table = document.createElement('table');
    container.appendChild(this.table);
    this.addClickEventToCheckboxes = this.addClickEventToCheckboxes.bind(this);
    this.removeClickEventToCheckboxes = this.removeClickEventToCheckboxes.bind(this);
    // this.addClickEventToTableRows = this.addClickEventToTableRows.bind(this);
    // striped table is default
    this.type = type || ['striped'];
    // Initialize the values the table will contain
    this.values = [];
    this.checkboxes = [];
    this.numberInputs = [];
  }

  setInputCallback(callback) {
    this.inputCallback = callback;
  }

  /**
   * Get a 2d array of data and arrange it on the table
   * @param {Array<Array>} values A 2d array of all the values the table will display/contain
   * @param {Object} options { inputType: 'checkbox or number', avoidColumns: [index, index] }
   * @returns void
   */
  load(values, options = { inputType: 'checkbox' }) {
    // Initialize this.checkboxes
    this.checkboxes = [];
    // Copy values
    this.options = { ...options };
    this.values = [...values];
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');

    for (let i = 0; i < values.length; i += 1) {
      if (i === 0) { // If it's the first row create the thead
        const theadRow = this.thead.insertRow();
        if (this.titles) {
          this.titles.forEach((title) => {
            theadRow.innerHTML = `${theadRow.innerHTML}<th>${title}</th>`;
          });
        } else {
          values[i].forEach((title, colIndex) => {
            if (colIndex === 0) {
              // Leave the first th blank to avoid showing the _ID column title
              theadRow.innerHTML = '<th></th>';
            }
            theadRow.innerHTML = `${theadRow.innerHTML}<th>${title}</th>`;
          });
        }
      } else {
        const tbodyRow = this.tbody.insertRow();
        let tableColumnIndex = 0;
        for (let j = 0; j < values[i].length; j += 1) {
          if (this.options.avoidColumns) {
            if (this.options.avoidColumns.indexOf(j) === -1) {
              const cell = tbodyRow.insertCell(tableColumnIndex);
              if (j === 0) {
                let element;
                switch (this.options.inputType) {
                  case 'checkbox':
                    element = this.createCheckbox(values[i][j]);
                    break;
                  case 'number':
                    element = this.createNumberInput(values[i][j]);
                    break;
                  default:
                    element = this.createCheckbox(values[i][j]);
                    break;
                }
                cell.appendChild(element);
              } else {
                cell.innerHTML = values[i][j];
              }
              tableColumnIndex += 1;
            }
          } else {
            const cell = tbodyRow.insertCell(j);
            if (j === 0) {
              let element;
              switch (this.options.inputType) {
                case 'checkbox':
                  element = this.createCheckbox(values[i][j]);
                  break;
                case 'number':
                  element = this.createNumberInput(values[i][j]);
                  break;
                default:
                  element = this.createCheckbox(values[i][j]);
                  break;
              }
              cell.appendChild(element);
            } else {
              cell.innerHTML = values[i][j];
            }
          }
        }
      }
    }

    // Remove any content the table could contain before loading new data
    this.reset();
    // Append thead and tbody
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    // Add classes to the table
    this.table.classList.add(this.type);
    // If there are values, not only the column titles
    // add clickEventListeners to checkboxes or number inputs
    if (values.length > 1) {
      if (this.options.inputType === 'checkbox') {
        this.addClickEventToCheckboxes();
        this.inputCallback(this);
      }
      if (this.options.inputType === 'number') {
        this.addInputEventToNumberInputs();
        // this.inputCallback(this);
      }
    }
  }

  reload(values) {
    this.removeClickEventToCheckboxes();
    this.load(values, this.options);
  }

  /**
   * Generate a checkbox element
   * @param {String} id The id the element will have
   * @returns {Object} Checkbox element as required by materialize to work
   */
  createCheckbox(id) {
    // Insert a checkbox in the first cell of each row
    // Add row id value to each checkbox as its own id
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = id;
    label.appendChild(checkbox);
    label.appendChild(span);
    // Store each checkbox into an array
    this.checkboxes.push(checkbox);
    return label;
  }

  /**
   * Generate an input[number] element
   * @param {String} id The id the element will have
   * @return {Object} A number input element
   */
  createNumberInput(id) {
    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('class', 'small-input');
    numberInput.id = id;

    this.numberInputs.push(numberInput);
    return numberInput;
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
        this.inputCallback(this);
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
        this.inputCallback(this);
      });
    });
  }

  /**
   * Add an onclick event listener to each checkbox
   * @param {action} action
   */
  addInputEventToNumberInputs() {
    this.numberInputs.forEach((numberInput) => {
      numberInput.addEventListener('input', () => {
        this.inputCallback(numberInput);
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

  /** Set the titles the columns of the table will have
   * these titles will replace those received from the db when loading values
   * @param {Array} titlesArr Set of titles the columns will have
   */
  setTitles(titlesArr) {
    this.titles = titlesArr;
  }

  reset() {
    this.table.innerHTML = '';
  }
}
