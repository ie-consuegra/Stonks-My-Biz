// Action button container
const actionButton = document.getElementById('action-button');

// "Smart tables"
const stockTable = new SmartTable('stock-table-container');
const receiptsAndIssuesTable = new SmartTable('receipts-and-issues-table-container');
const suppliersTable = new SmartTable('suppliers-table-container');

const stockPreloader = document.getElementById('stock-preloader');
const receiptsAndIssuesPreloader = document.getElementById('receipts-and-issues-preloader');
const suppliersPreloader = document.getElementById('suppliers-preloader');

const classesForActiveLink = ['indigo', 'lighten-5', 'indigo-text', 'text-darken-4'];
const classesForActiveIcon = ['indigo-text', 'text-darken-4'];
