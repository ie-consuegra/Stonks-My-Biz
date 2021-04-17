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
    const appsDBSchema = ['app name', 'id', 'shared catalog'];
    const appsDBModel = new Model('apps', appsDBSchema);

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

  init() {
    this.setAppFolder();
    // this.setAppsDB();
  },
};
