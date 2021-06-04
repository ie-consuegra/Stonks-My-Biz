/**
 * Formats or translates the given input
 * @callback formatter
 * @param {String} value
 * @returns {String} Formatted string
 */

/**
* Class representing a table the user can interact with
*/
class SmartTable {
  /**
   * Create a table element where specified
   * @param {String} parentContainerId Id of the element where the table will be
   * @param {Array} type Type of table defined by an array of classes
   */
  constructor(parentContainerId, tableName, type = ['striped']) {
    const container = document.getElementById(parentContainerId);
    this.table = document.createElement('table');
    container.appendChild(this.table);
    this.tableName = tableName;
    this.addClickEventToCheckboxes = this.addClickEventToCheckboxes.bind(this);
    this.removeClickEventToCheckboxes = this.removeClickEventToCheckboxes.bind(this);
    // this.addClickEventToTableRows = this.addClickEventToTableRows.bind(this);
    // striped table is default
    this.type = type;
    this.checkboxes = [];
    this.numberInputs = [];
    this.formatters = [];
    this.fields = []; // Original column titles
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
  load(values, options) {
    // Avoid rewriting this.options
    if (!this.options) {
      this.options = { ...options };
    }
    // Set default inputType
    if (!this.options.inputType) {
      this.options.inputType = 'checkbox';
    }

    if (this.options.inputValueColumn) {
      // Don't show this column, add to avoidColumns
      if (this.options.avoidColumns) {
        this.options.avoidColumns.push(this.options.inputValueColumn);
      } else {
        this.options.avoidColumns = [this.options.inputValueColumn];
      }
    }
    // Initialize this.checkboxes
    this.checkboxes = [];
    // Copy values
    const valuesDuplicate = [...values];
    // Get the fields (original column titles) located at the 0 index of values
    [this.fields] = valuesDuplicate;
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');

    for (let i = 0; i < valuesDuplicate.length; i += 1) {
      if (i === 0) { // If it's the first row create the thead
        const theadRow = this.thead.insertRow();
        if (this.titles) {
          this.titles.forEach((title) => {
            theadRow.innerHTML = `${theadRow.innerHTML}<th>${title}</th>`;
          });
        } else {
          valuesDuplicate[i].forEach((title, colIndex) => {
            if (colIndex === 0) {
              // Leave the first th blank to avoid showing the ROW_ID column title
              theadRow.innerHTML = '<th></th>';
            }
            theadRow.innerHTML = `${theadRow.innerHTML}<th>${title}</th>`;
          });
        }
      } else {
        const tbodyRow = this.tbody.insertRow();
        let tableColumnIndex = 0;
        let rowId = '';
        for (let j = 0; j < valuesDuplicate[i].length; j += 1) {
          if (this.options.avoidColumns) {
            if (this.options.avoidColumns.indexOf(j) === -1) {
              const cell = tbodyRow.insertCell(tableColumnIndex);
              if (j === 0) {
                rowId = valuesDuplicate[i][j];
                let element;
                switch (this.options.inputType) {
                  case 'checkbox':
                    element = this.createCheckbox(rowId);
                    break;
                  case 'number':
                    element = this.createNumberInput(rowId);
                    break;
                  default:
                    element = this.createCheckbox(rowId);
                    break;
                }
                // Add a value to the element
                // Only applies to number inputs (momentarily)
                if (this.options.inputValueColumn) {
                  element.value = valuesDuplicate[i][this.options.inputValueColumn];
                }
                cell.appendChild(element);
              } else if (this.formatters[j]) {
                const value = valuesDuplicate[i][j].toString();
                cell.innerHTML = this.formatters[j](value);
              } else {
                cell.innerHTML = valuesDuplicate[i][j];
              }
              this.setElementId(cell, rowId, this.fields[j]);
              tableColumnIndex += 1;
            }
          } else {
            const cell = tbodyRow.insertCell(j);
            if (j === 0) {
              let element;
              rowId = valuesDuplicate[i][j];
              switch (this.options.inputType) {
                case 'checkbox':
                  element = this.createCheckbox(valuesDuplicate[i][j]);
                  break;
                case 'number':
                  element = this.createNumberInput(valuesDuplicate[i][j]);
                  break;
                default:
                  element = this.createCheckbox(valuesDuplicate[i][j]);
                  break;
              }
              cell.appendChild(element);
            } else if (this.formatters[j]) {
              const value = valuesDuplicate[i][j].toString();
              cell.innerHTML = this.formatters[j](value);
            } else {
              cell.innerHTML = valuesDuplicate[i][j];
            }
            this.setElementId(cell, rowId, this.fields[j]);
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
    if (valuesDuplicate.length > 1) {
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
    if (this.options.inputType === 'checkbox') {
      this.removeClickEventToCheckboxes();
    }
    if (this.options.inputType === 'number') {
      this.removeInputEventToNumberInputs();
    }
    this.load(values, this.options);
  }

  /**
   * Store the options passed as argument
   * @param {Object} options Configuration options for the table
   * @returns {Object} SmartTable for chaining
   */
  setOptions(options) {
    this.options = { ...options };
    return this;
  }

  /**
   * Generate a checkbox element
   * @param {String} id The id the element will have
   * @returns {Object} Checkbox element as required by materialize to work
   */
  createCheckbox(rowId) {
    // Insert a checkbox in the first cell of each row
    // Add row id value to each checkbox as its own id
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = `${this.tableName}-${rowId}-checkbox`;
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
  createNumberInput(rowId) {
    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('class', 'small-input');
    if (this.options.readOnly) { numberInput.readOnly = true; }
    numberInput.id = `${this.tableName}-${rowId}-numInput`;

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
    if (this.inputCallback) {
      this.checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
          this.inputCallback(this);
        });
      });
    }
  }

  /**
   * Remove onclick event listener to each checkbox
   * @param {action} action
   */
  removeClickEventToCheckboxes() {
    if (this.inputCallback) {
      this.checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('click', () => {
          this.inputCallback(this);
        });
      });
    }
  }

  /**
   * Add an onclick event listener to each checkbox
   * @param {action} action
   */
  addInputEventToNumberInputs() {
    if (this.inputCallback) {
      this.numberInputs.forEach((numberInput) => {
        numberInput.addEventListener('input', () => {
          this.inputCallback(numberInput);
        });
      });
    }
  }

  /**
 * Remove oninput event listener to each number input
 * @param {action} action
 */
  removeInputEventToNumberInputs() {
    if (this.inputCallback) {
      this.numberInputs.forEach((numberInput) => {
        numberInput.removeEventListener('input', () => {
          this.inputCallback(this);
        });
      });
    }
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
   * Add a formatter function to the corresponding index
   * Formatter is used when loading values to the table
   * @param {Array} indices Positions where the formatter will be called
   * @param {formatter} formatter
   */
  addFormatter(indices, formatter) {
    indices.forEach((formatterIndex) => {
      this.formatters[formatterIndex] = formatter;
    });
  }

  /**
   * Return an array of checked checkboxes
   */
  get selectedCheckboxes() {
    return this.checkboxes.filter((checkbox) => checkbox.checked === true);
  }

  /**
   * Return an array of the row ids according to those selected by user
   */
  get selectedRowIds() {
    const rowIds = this.selectedCheckboxes.map((checkbox) => {
      const checkboxId = checkbox.id.toString();
      const idArr = checkboxId.split('-');
      const rowIdIndex = 1;
      return idArr[rowIdIndex];
    });
    return rowIds;
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

  /**
   * Deselect all checkboxes
   */
  uncheckAll() {
    this.selectedCheckboxes.forEach((selectedCheckbox) => {
      selectedCheckbox.checked = false;
    });
  }

  /**
   * Take an HTML element and assign it an id based on other identification
   * values to avoid id repetition through the DOM
   * @param {Object} elem HTML Element
   * @param {String} rowId rowID
   * @param {String} field Field (orig. column title)
   */
  setElementId(elem, rowId, field) {
    const elemId = `${this.tableName}-${rowId}-${field}`.toLowerCase();
    elem.id = elemId;
  }
}
