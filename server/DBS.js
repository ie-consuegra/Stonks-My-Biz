/* eslint-disable no-unused-vars */
/* global HtmlService, DriveApp, DB, DBS, SpreadsheetApp, arrange, PropertiesService, generateId */
/*
Catalog is an object that contains a pair of values for each spreadsheet created:
its name and an its id.
Directories are stored as script properties in JSON form.
*/

/** DBS contains and handles the references to the spreadsheets used as databases
 *
 */
class DBS {
  /**
   * @param {Object} model: Object with two properties, name (string) and fields (array)
   * @param {Object} parentFolder: Folder instance where locate the db files
   * @param {boolean} useCatalog: Specify whether dbs must use a catalog or not, true is default
   */
  constructor(model, parentFolder, useCatalog = true) {
    this.model = model;
    this.model.fields.unshift('_ID'); // Add the _ID column
    this.parentFolder = parentFolder;
    this.useCatalog = useCatalog;
  }

  /** Model receive two params:
 * name of type of database and the fields it uses.
 * @param {String} name Name of the type of database
 * @param {String[]} fields Array with the name of the columns of the db
 * @returns {Object}
 */
  static createModelFrom(name, fields) {
    // Check if the args are valid
    if (name && fields) {
      if (typeof name !== 'string' || !Array.isArray(fields)) {
        throw new TypeError('Invalid args: At least one of the arguments is empty or is not a valid variable type');
      }
    }
    return { name, fields };
  }

  /** Get the catalog and save it in this.catalog
   *
   */
  getCatalog() {
    const catalogName = `${this.model.name}Catalog`;
    const catalogJSON = PropertiesService.getScriptProperties().getProperty(catalogName);
    if (catalogJSON) {
      this.catalog = JSON.parse(catalogJSON);
    } else { // If the property does not exist, create it
      this.catalog = this.createCatalog();
    }
  }

  /** Create a new Catalog Script Property
   *
   * @returns {Object}: Catalog
   */
  createCatalog() { // Refactor all the new code for God's sake
    const { name } = this.model;
    const catalogName = `${name}Catalog`;
    const firstDB = this.createSheet();
    const spreadsheetId = firstDB.getParent().getId();

    // Create the catalog object and save it as a script property
    const catalog = {};
    catalog[name] = spreadsheetId;
    const catalogString = JSON.stringify(catalog);
    PropertiesService.getScriptProperties().setProperty(catalogName, catalogString);
    return { ...catalog };
  }

  /** Save changes into the catalog script property
   * @param {String} ssName
   * @param {String} ssId
   */
  updateCatalog(ssName, ssId) {
    const catalogName = `${this.model.name}Catalog`;
    const catalogJSON = PropertiesService.getScriptProperties().getProperty(catalogName);
    const catalog = JSON.parse(catalogJSON);

    // Insert the new values
    catalog[ssName] = ssId;

    // Update/Set the property with the new values
    const catalogString = JSON.stringify(catalog);
    PropertiesService
      .getScriptProperties()
      .setProperty(catalogName, catalogString);
  }

  /** Move a spreadsheet to the specified folder
   * in this.parentFolder
   * @param {Object} spreadsheet: The spreadsheet to move to
   * @returns {Object}: The new spreadsheet
   */
  moveToParentFolder(spreadsheet) {
    const ssId = spreadsheet.getId();
    const ssFile = DriveApp.getFileById(ssId);
    ssFile.moveTo(this.parentFolder);
  }

  /**
   * Gives format to the sheet based on the model
   */
  formatSheet(sheet) {
    // Get the number of unusable columns and delete them
    const { fields } = this.model;
    const numMaxCols = sheet.getMaxColumns();
    const fieldsLength = fields.length;
    const numUnusableCols = numMaxCols - fieldsLength;

    sheet.deleteColumns(fieldsLength, numUnusableCols);

    // Write the column titles
    const titleRange = sheet.getRange(1, 1, 1, fieldsLength);
    titleRange.setValues([fields]);
  }

  /**
   * Create a new sheet based on the model object
   * @returns {Object}: The sheet just created
   */
  createSheet(sheetName, spreadsheet) {
    let sheet;
    if (spreadsheet) {
      if (sheetName) {
        sheet = spreadsheet.insertSheet(sheetName);
      } else {
        const { name } = this.model;
        sheet = spreadsheet.insertSheet(name);
      }
    } else {
      const { name } = this.model;
      const ss = this.createSpreadsheet(name);
      if (sheetName) {
        sheet = ss.getSheetByName(sheetName);
      } else {
        const firstSheetIndex = 0;
        sheet = ss.getSheets()[firstSheetIndex];
        sheet.setName(name);
      }
    }
    this.formatSheet(sheet);
    return sheet;
  }

  /**
   * Create a spreadsheet with the name send as param or the model name if no param is sent
   * @returns {Object}: The recent created spreadsheet
   */
  createSpreadsheet(ssName) {
    let name = '';
    if (ssName) {
      name = ssName;
    } else {
      name = this.model.name;
    }

    const ss = SpreadsheetApp.create(name);
    this.moveToParentFolder(ss);
    return ss;
  }

  /** Open the spreadsheet and get the sheet used as db
  * If the sheet does not exist create a new one with the specified name
  * Returns a db object
  * @param {string} sheetName: Name of the sheet, optional
  * @param {string} ssName: Name of the spreadsheet, optional
  * @returns {object}: Database object
  */
  use(sheetName, ssName) {
    let ssId = '';
    let dbName = '';

    if (this.useCatalog) {
      this.getCatalog(); // Update current catalog

      // Define spreadsheet to use
      let ss = {}; // The spreadsheet object
      if (!ssName) {
        const firstElement = 0;
        ssId = Object.values(this.catalog)[firstElement];
        ss = SpreadsheetApp.openById(ssId);
      } else if (this.catalog[ssName]) { // Check if there's a registry on catalog
        ssId = this.catalog[ssName];
        ss = SpreadsheetApp.openById(ssId);
      } else {
        ss = this.createSpreadsheet(ssName);
        ssId = ss.getId();
        this.updateCatalog(ssName, ssId);
      }

      let sheet = {}; // The sheet object
      const sheets = ss.getSheets();
      const names = sheets.map((sheetObj) => sheetObj.getName()); // Array of sheet names
      if (sheetName) {
        if (names.indexOf(sheetName) === -1) {
          sheet = this.createSheet(sheetName, ss);
        } else {
          sheet = ss.getSheetByName(sheetName);
        }
      } else {
        const firstSheetIndex = 0;
        sheet = sheets[firstSheetIndex];
      }
      dbName = sheet.getName();

      if (!(dbName in this)) {
        this.add(dbName, sheet);
      }
    } else if (arguments.length === 2) {
      // When useCatalog is false, sheetName and ssName
      // args are mandatory
      const files = this
        .parentFolder
        .getFilesByName(ssName);

      if (files.hasNext()) {
        const file = files.next();
        const ss = SpreadsheetApp.openById(file.getId());
        const sheet = ss.getSheetByName(sheetName);
        this.add(sheetName, sheet);
      } else {
        const ss = SpreadsheetApp.create(ssName);
        const sheet = ss.getSheets()[0];
        sheet.setName(sheetName);
        this.add(sheetName, sheet);
      }
      dbName = sheetName;
    } else {
      throw new Error('Missing sheet and spreadsheet names args, both are mandatory if useCatalog is false.');
    }
    return this[dbName];
  }

  /** Add a database object to the DBS
   *
   * @param {String} dbName
   * @param {Object} sheet
   */
  add(dbName, sheet) {
    if (sheet) {
      this[dbName] = new DB(sheet, this.model);
    } else {
      throw new Error('Undefined or null sheet argument.');
    }
  }

  /**
   * Creates a copy of a sheet in a new spreadsheet
   * @param {String} sheetName Name of the sheet to be cloned
   * @param {String} ssName Name of the spreadsheet where the sheet is
   * @returns {Object} Sheet: Copy of the sheet used as db
   */
  clone(sheetName, ssName) {
    this.getCatalog(); // Update the catalog
    let sheet;
    let ssId = '';
    if (ssName) {
      if (this.catalog[ssName]) {
        ssId = this.catalog[ssName];
      } else {
        throw new Error('No spreadsheet with such name was found');
      }
    } else {
      [ssId] = Object.values(this.catalog);
    }

    if (sheetName) {
      if (this[sheetName]) {
        sheet = this[sheetName].sheet;
      } else {
        const ss = SpreadsheetApp.openById(ssId);
        sheet = ss.getSheetByName(ssName);
        if (!sheet) throw new Error('No sheet with such name was found');
      }
    } else {
      const ss = SpreadsheetApp.openById(ssId);
      [sheet] = ss.getSheets();
    }

    // Copy the old sheet into a new Spreadsheet
    const newSsName = sheet.getName();
    const newSs = SpreadsheetApp.create(newSsName);
    const newSheet = sheet.copyTo(newSs);

    return newSheet;
  }
}
