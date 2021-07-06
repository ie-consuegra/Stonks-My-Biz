/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Folder Manager: Object with the methods to manage
 * the folder structure of any Ecliptic App
 */
const stonksApp = {
  // Properties
  // catalog name is catalog + underscore to avoid any confusion with database catalogs
  catalogName: 'folderCatalog_',
  appsFolder: 'Stonks Apps',
  catalog: {},
  STONKS_APPS_SPREADSHEET_NAME: 'STONKS',
  STONKS_APPS_SHEET_NAME: 'APPS',
  name: '',
  version: '',
  /*
  Other properties: catalog, stonksAppsFolder
  */
  // Methods
  createStonksAppsFolder() {
    this.stonksAppsFolder = DriveApp
      .createFolder(this.appsFolder);
  },

  getStonksAppsFolder() {
    const folders = DriveApp.getFoldersByName(this.appsFolder);
    if (folders.hasNext()) {
      this.stonksAppsFolder = folders.next();
    } else {
      this.createStonksAppsFolder();
    }
  },

  createCatalog() {
    this.getStonksAppsFolder();
    const eclipticFolderAppsId = this.stonksAppsFolder.getId();

    this.catalog.stonksAppsFolder = eclipticFolderAppsId;
    const catalogString = JSON.stringify(this.catalog);

    PropertiesService
      .getScriptProperties()
      .setProperty(this.catalogName, catalogString);
  },

  getCatalog() {
    const catalogJSON = PropertiesService
      .getScriptProperties()
      .getProperty(this.catalogName);

    if (catalogJSON) {
      this.catalog = JSON.parse(catalogJSON);
    } else {
      this.createCatalog();
    }
  },

  updateCatalog(folder) {
    const folderName = folder.getName();
    const folderId = folder.getId();
    this.catalog[folderName] = folderId;

    const catalogJSON = JSON.stringify(this.catalog);
    PropertiesService
      .getScriptProperties()
      .setProperty(this.catalogName, catalogJSON);
  },

  createAppFolder(folderName) {
    this.appFolder = this
      .stonksAppsFolder
      .createFolder(folderName);

    return this.appFolder;
  },

  setAppFolder() {
    if (this.name) {
      const folderName = this.name;
      if (!this.appFolder) {
        this.getCatalog();

        if (this.catalog[folderName]) {
          const appFolderId = this.catalog[folderName];
          this.appFolder = DriveApp.getFolderById(appFolderId);
        } else {
          const folder = this.createAppFolder(folderName);
          this.updateCatalog(folder);
        }
      } else {
        throw new Error('App Folder has been set yet');
      }
    } else {
      throw new Error('No appName has been defined');
    }
  },

  setAppsDB() {
    const appsDBSchema = ['APPNAME', 'CATALOG'];
    const appsDBModel = DBS.createModelFrom('apps', appsDBSchema);

    this.appsDB = new DBS(appsDBModel, this.stonksAppsFolder, false);
  },

  get getFolder() {
    if (!this.appFolder) {
      throw new Error('A folder for the app files has not been set');
    }
    return this.appFolder;
  },

  get getName() {
    return this.name;
  },

  get getVersion() {
    return this.version;
  },

  setSubFolder(folderName) {
    //
  },

  setPublicFolder(folderName) {
    //
  },

  /**
   * @param {string} name
   */
  set setName(name) {
    this.name = name;
  },

  /**
  * @param {string} version
  */
  set setVersion(version) {
    this.version = version;
  },

  /** Get app settings stored in Script Properties
   *
   */
  getAppSettings() { // Pending: Return settings; create a loadAppSettings() to do this instead
    const configStr = PropertiesService
      .getScriptProperties()
      .getProperty('APP_SETTINGS') || '';

    if (configStr) {
      this.settings = { ...JSON.parse(configStr) };
    } else {
      this.settings = {};
    }
  },

  /** Set app settings, store in Script Properties
 *
 */
  setAppSettings(configStr) {
    if (configStr) { // Pending: Set a better check here
      PropertiesService
        .getScriptProperties()
        .setProperty('APP_SETTINGS', configStr);
    }
  },

  /**
   * Shorthand to get a script property value
   * @param {String} propertyName Name of the Script Property
   * @returns String The property value
   */
  getProperty(propertyName) {
    return PropertiesService
      .getScriptProperties()
      .getProperty(propertyName);
  },

  /**
   * Shorthand to set or change the value of a script property
   * @param {String} propertyName Name of the Script Property
   * @param {String} value Value of the Script Property
   */
  setProperty(propertyName, value) {
    PropertiesService
      .getScriptProperties()
      .setProperty(propertyName, value);
  },

  /**
   * Look for the app name passed as argument in the stonks app db
   * and returns the backup data as object
   * @param {String} appName Name of the app to lookup
   * @returns {Object} If there's a backup returns an object, else undefined
   */
  getBackupData(appName) {
    const appBackupEntry = this.appsDB
      .use(this.STONKS_APPS_SHEET_NAME, this.STONKS_APPS_SPREADSHEET_NAME)
      .findOne({ field: 'CATALOG', keyword: appName });

    let backupData;
    if (appBackupEntry) {
      // 0-Index is the name of the app
      // 1-index is the backup data
      backupData = JSON.parse(appBackupEntry[1]);
    }
    return backupData;
  },

  deleteScriptProperties() {
    PropertiesService
      .getScriptProperties()
      .deleteAllProperties();
  },

  /**
   * Take the data stored in the apps backup spreadsheet
   * and save it as script properties
   * @returns {Boolean} Restore was successful
   */
  restoreBackup() {
    let restoreSuccessful = false;
    if (this.name) {
      const appBackupDataObj = this.getBackupData(this.name);
      if (appBackupDataObj) {
        const appBackupDataArr = Object.entries(appBackupDataObj);

        // Delete all script properties
        this.deleteScriptProperties();

        // Set the new properties
        appBackupDataArr.forEach((propertyName, propertyValue) => {
          const value = JSON.stringify(propertyValue);
          PropertiesService
            .getScriptProperties()
            .setProperty(propertyName, value);
        });

        restoreSuccessful = true;
      }
    }
    return restoreSuccessful;
  },

  backupScriptProperties() {
    const appsDBData = this.appsDB
      .use(this.STONKS_APPS_SHEET_NAME, this.STONKS_APPS_SPREADSHEET_NAME)
      .fetch();

    const appBackupEntryIndex = appsDBData.findIndex((entry) => entry[0] === this.name);

    const scriptProperties = PropertiesService
      .getScriptProperties()
      .getProperties();

    const scriptPropertiesStr = JSON.stringify(scriptProperties);

    if (appBackupEntryIndex !== -1) {
      appsDBData[appBackupEntryIndex] = [this.name, scriptPropertiesStr];
    } else {
      appsDBData.push([this.name, scriptPropertiesStr]);
    }

    this.appsDB
      .use(this.STONKS_APPS_SHEET_NAME, this.STONKS_APPS_SPREADSHEET_NAME)
      .write(appsDBData);
  },

  init() {
    this.setAppFolder();
    this.getAppSettings();
    this.setAppsDB();
  },
};
