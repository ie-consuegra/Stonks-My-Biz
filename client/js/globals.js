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
// Modals
const deleteModal = document.getElementById('delete-modal');
// "Smart tables"
const salesPortfolioTable = new SmartTable('sales-portfolio-table-container');
salesPortfolioTable.setTitles(['Qty', 'Product', 'Price']);

const purchasesPortfolioTable = new SmartTable('purchases-stock-table-container');
salesPortfolioTable.setTitles(['Qty', 'Product', 'Price']);

const cashflowTable = new SmartTable('cashflow-table-container');
cashflowTable.setTitles(['', 'Date', 'Concept', 'Details', 'Income', 'Outcome', 'Balance']);

const portfolioTable = new SmartTable('portfolio-table-container');
portfolioTable.setTitles(['', 'Code', 'Name', 'Category', 'Unit', 'Description', 'Stockrefs', 'Cost', 'Price']);
const portfolioStockTable = new SmartTable('portfolio-stock-table-container');
portfolioStockTable.setTitles(['Qty', 'Product', 'Unit', 'Cost']);
const stockTable = new SmartTable('stock-table-container');
stockTable.setTitles(['', 'Code', 'Product', 'Category', 'Unit', 'Price', 'Minimum stock', 'Current stock', 'Supplier']);
const receiptsAndIssuesTable = new SmartTable('receipts-and-issues-table-container');
receiptsAndIssuesTable.setTitles(['', 'Date', 'Code', 'Product', 'Category', 'Description', 'Qty']);
const suppliersTable = new SmartTable('suppliers-table-container');
suppliersTable.setTitles(['', 'Name', 'Identification', 'Telephone', 'Cellphone', 'E-mail', 'Address', 'City', 'Other details']);

const cashflowPreloader = document.getElementById('cashflow-preloader');
const portfolioPreloader = document.getElementById('portfolio-preloader');
const salesPreloader = document.getElementById('sales-preloader');
const purchasesPreloader = document.getElementById('purchases-preloader');
const stockPreloader = document.getElementById('stock-preloader');
const receiptsAndIssuesPreloader = document.getElementById('receipts-and-issues-preloader');
const suppliersPreloader = document.getElementById('suppliers-preloader');

const classesForActiveLink = ['indigo', 'lighten-5', 'indigo-text', 'text-darken-4'];
const classesForActiveIcon = ['indigo-text', 'text-darken-4'];

/*
Global object that contains all data fetched from the database
to make it available to any process requires it without asking
for the values of any smarttable.
*/
const dbData = { loaded: false };
