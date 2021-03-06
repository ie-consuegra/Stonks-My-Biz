// Main nav
const mainNav = document.getElementById('main-nav');
// Search
const searchForm = document.getElementById('search-form');
// Sidenav
const mobileNav = document.getElementById('nav-mobile');
// Action button container and items
const actionButton = document.getElementById('action-button');
const actionAddToSalesItemBtn = document.getElementById('add-portfolio-to-sales-item-btn');
const actionAddToPurchasesItemBtn = document.getElementById('add-stock-to-purchases-item-btn');
const actionAddToPortfolioItemBtn = document.getElementById('add-stock-to-portfolio-item-btn');
const actionAddBtn = document.getElementById('add-btn');
const actionUpdateBtn = document.getElementById('update-btn');
const actionDeleteBtn = document.getElementById('delete-btn');
const actionMenuDivider = document.getElementById('action-menu-divider');
// Toolbar and items
const tableToolbar = document.getElementById('toolbar');
const addToolBtn = document.getElementById('add-tool-btn');
const editToolBtn = document.getElementById('edit-tool-btn');
const deleteToolBtn = document.getElementById('delete-tool-btn');
const addToPortfolioToolBtn = document.getElementById('add-to-portfolio-tool-btn');
const addToPurchaseToolBtn = document.getElementById('add-to-purchase-tool-btn');
const addToSaleToolBtn = document.getElementById('add-to-sale-tool-btn');
// Modals
const deleteModal = document.getElementById('delete-modal');
// "Smart tables"
const salesPortfolioTable = new SmartTable('sales-portfolio-table-container', 'sales');
salesPortfolioTable.setTitles([WORD.qty, WORD.description, WORD.unitPrice, WORD.amount]);

const purchasesStockTable = new SmartTable('purchases-stock-table-container', 'purchases');
purchasesStockTable.setTitles([WORD.qty, WORD.description, WORD.unitPrice, WORD.amount]);

const cashflowTable = new SmartTable('cashflow-table-container', 'cashflow');
cashflowTable.setTitles(['', WORD.date, WORD.concept, WORD.details, WORD.amount, WORD.account]);

const portfolioTable = new SmartTable('portfolio-table-container', 'portfolio');
portfolioTable.setTitles(['', WORD.cod, WORD.item, WORD.description, WORD.unit, WORD.type, WORD.category, WORD.cost, WORD.price, WORD.stock]);
const portfolioStockTable = new SmartTable('portfolio-stock-table-container', 'portfolio-stock'); // Check the name of this table
portfolioStockTable.setTitles([WORD.qty, WORD.product, WORD.unitPrice, WORD.cost]);
const stockTable = new SmartTable('stock-table-container', 'stock');
// Temporarily remove WORD.description and 'Supplier' column titles (future feature)
stockTable.setTitles(['', WORD.cod, WORD.item, WORD.unitOfMeasurement, WORD.type, WORD.category, WORD.cost, WORD.price, WORD.minimumStock, WORD.stock]);
const movementsTable = new SmartTable('movements-table-container', 'movements');
movementsTable.setTitles(['', WORD.date, WORD.cod, WORD.product, WORD.category, WORD.description, WORD.qty]);
// Table of cashflow update item
const metaStockItemsTable = new SmartTable('cashflow-update-item-metadescription-table-container', 'stock-items');
metaStockItemsTable.setTitles([WORD.qty, WORD.description, WORD.unitPrice, WORD.amount]);
// Future feature
/*
const suppliersTable = new SmartTable('suppliers-table-container', 'suppliers');
suppliersTable.setTitles(['', 'Name', 'Identification', 'Telephone'
, 'Cellphone', 'E-mail', 'Address', 'City', 'Other details']);
*/

const preloader = document.getElementById('loadingPopup');

const classesForActiveLink = ['indigo', 'lighten-5', 'indigo-text', 'text-darken-4'];
const classesForActiveIcon = ['indigo-text', 'text-darken-4'];

/*
Global object that contains all data fetched from the database
to make it available to any process requires it without asking
for the values of any smarttable.
*/
const dbData = { loaded: false };
const totals = {
  income: 0,
  outcome: 0,
  balance: 0,
  inventoryCost: 0, // Total purchase value
  inventoryPrice: 0, // Total sale value
};
