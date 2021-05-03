/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* global HtmlService, DB, Catalog, SpreadsheetApp, generateId */

/** DB represents an object with a sheet and methods for read, write, update, delete, etc, on it
 *
 */
class DB {
  /**
   */
  constructor(sheet, model) {
    this.sheet = sheet;
    this.model = model;
  }

  /**
 * Generate and ID based on timestamp
 * @returns {string}
 */
  static generateId() {
    return new Date().getTime().toString(36);
  }

  /** Checks if data is not empty
   *
   * @param {Object} data
   */
  static isValid(data) {
    const dataValues = Object.values(data);
    const hasSomething = (value) => value !== '' || value !== null;
    const isValidData = dataValues.some(hasSomething);
    return isValidData;
  }

  /** Checks if a 2d array of values fits the current sheet.
   * If not, insert more rows.
   * @param {Array[]} values 2D Array of values
   * @param {Object} sheet Sheet where the values will be saved
   */
  static valuesFit(numRowsValues, sheet) {
    const numRowsSheet = sheet.getMaxRows();

    if (numRowsSheet < numRowsValues) {
      const numNewRows = 20;
      sheet.insertRows(numRowsSheet, numNewRows);
    }
  }

  /** Arrange the values of an object into an array according to the column order set by the model
 * @param {object} data
 * @returns {Array[]}
 */
  arrange(data) {
    const entry = [];
    if (DB.isValid(data)) {
      this.model.fields.forEach((item) => {
        if (item === '_ID') {
          if ('_ID' in data || data._ID) {
            entry.push(data[item]);
          } else {
            entry.push(DB.generateId());
          }
        } else {
          entry.push(data[item]);
        }
      });
    } else {
      throw new Error('Invalid data: is empty');
    }
    return [entry];
  }

  /** Return all the values of the sheet
  * @returns {array[]}
  */
  fetch() {
    return this.sheet.getDataRange().getValues();
  }

  /** Write on the specified sheet using the setValues method
   * If row and/or column not specified, set each to 1
   * @param {array[]} values
   * @param {number} row
   * @param {number} col
   * @returns {array[]}
   */
  write(values, row = 1, col = 1) {
    const numRows = values.length;
    const numCols = values[0].length;

    DB.valuesFit(numRows, this.sheet);

    this.sheet
      .getRange(row, col, numRows, numCols)
      .setValues(values);

    return this.fetch();
  }

  /** Clear the sheet
   * @returns void
   */
  clear() {
    this.sheet
      .getDataRange()
      .clearContent();
  }

  /** Insert new data on the next available row
   * @param {object} data
   * @returns {array[]}
   */
  insert(data) {
    const entry = this.arrange(data);
    const nextRow = this.sheet.getLastRow() + 1;

    return this.write(entry, nextRow);
  }

  /** Remove a set of entries of the sheet
   * @param {string[]} entryIds
   * @returns {array[]}
   */
  remove(entryIds) {
    const values = this.fetch();

    const newValues = values.filter((entry) => {
      const entryId = entry[0].toString();
      return entryIds.indexOf(entryId) === -1;
    });

    this.clear();

    return this.write(newValues);
  }

  /**
   * Remove one entry of the sheet
   * @param {String} entryId
   * @returns {array[]}
   */
  removeOne(entryId) {
    const values = this.fetch();

    const foundIndex = values.findIndex((entry) => entry[0].toString() === entryId);
    values.splice(foundIndex, 1);

    this.clear();
    return this.write(values);
  }

  /** Change one row of data of the sheet
   * @param {object} data
   * @returns {array[]}
   */
  update(data) {
    // Valid data to write on a sheet must be a 2d array
    const id = data._ID;
    const newValues = this.arrange(data);
    const values = this.fetch();

    // Get the index where the entry is in the values array
    // Add 1 to avoid the 0 index of the array and make it valid for the rows in a sheet
    const row = (values.findIndex((entry) => entry[0].toString() === id)) + 1;

    return this.write(newValues, row);
  }

  /**
   * Find several entries in a sheet
   * @param {Object} query: Object with two properties: field and keyword
   * @returns {array[]}
   */
  find(query) {
    const values = this.fetch();
    const { fields } = this.model;
    const index = fields.indexOf(query.field);
    const { keyword } = query;

    const isEqual = (entry) => entry[index].toString() === keyword.toString();

    const results = values.filter(isEqual);
    return results;
  }

  /**
   * Find one entry in a sheet
   * @param {Object} query: Object with two properties: field and keyword
   * @returns {Array}
   */
  findOne(query) {
    const values = this.fetch();
    const { fields } = this.model;
    const index = fields.indexOf(query.field);
    const { keyword } = query;

    const isEqual = (entry) => entry[index].toString() === keyword.toString();

    const foundIndex = values.findIndex(isEqual);
    return values[foundIndex];
  }
}
