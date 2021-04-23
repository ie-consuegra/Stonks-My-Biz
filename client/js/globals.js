// Main nav
const mainNav = document.getElementById('main-nav');
// Search
const searchForm = document.getElementById('search-form');
// Sidenav
const mobileNav = document.getElementById('nav-mobile');
// Action button container and items
const actionButton = document.getElementById('action-button');
const actionAddBtn = document.getElementById('add-btn');
const actionUpdateBtn = document.getElementById('update-btn');
const actionDeleteBtn = document.getElementById('delete-btn');
// Modals
const deleteModal = document.getElementById('delete-modal');
// "Smart tables"
const cashflowTable = new SmartTable('cashflow-table-container');
const stockTable = new SmartTable('stock-table-container');
const receiptsAndIssuesTable = new SmartTable('receipts-and-issues-table-container');
const suppliersTable = new SmartTable('suppliers-table-container');

const cashflowPreloader = document.getElementById('cashflow-preloader');
const stockPreloader = document.getElementById('stock-preloader');
const receiptsAndIssuesPreloader = document.getElementById('receipts-and-issues-preloader');
const suppliersPreloader = document.getElementById('suppliers-preloader');

const classesForActiveLink = ['indigo', 'lighten-5', 'indigo-text', 'text-darken-4'];
const classesForActiveIcon = ['indigo-text', 'text-darken-4'];
