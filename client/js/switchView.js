function showToolbar(event) {
  if (event.matches) {
    tableToolbar.style.display = 'none';
  } else {
    switch (appConfig.view) {
      case 'dashboard':
      case 'sales':
      case 'purchases':
      case 'settings':
      case 'help':
        tableToolbar.style.display = 'none';
        break;
      default:
        tableToolbar.style.display = 'block';
        break;
    }
  }
}

function setActiveView(view) {
  const appViews = document.querySelector('#views').childNodes;
  appViews.forEach((node) => {
    if (node.nodeName.toLowerCase() === 'div') {
      node.style.display = 'none';
    }
  });
  const activeView = document.getElementById(view);
  activeView.style.display = 'block';
}

function setActiveLink(linkId) {
  const link = document.getElementById(linkId);
  const [icon] = link.children;
  link.classList.add(...classesForActiveLink);
  icon.classList.add(...classesForActiveIcon);
}

function setInactiveLink(linkId) {
  const link = document.getElementById(linkId);
  const [icon] = link.children;
  link.classList.remove(...classesForActiveLink);
  icon.classList.remove(...classesForActiveIcon);
}

function toggleElementsVisibility(viewName) {
  const view = viewName || appConfig.view;
  switch (view) {
    case 'dashboard':
    case 'settings':
    case 'help':
      actionButton.style.display = 'none';
      mainNav.style.display = 'block';
      searchForm.style.display = 'none';
      break;
    case 'sales':
    case 'purchases':
      actionButton.style.display = 'none';
      mainNav.style.display = 'block';
      searchForm.style.display = 'block';
      break;
    case 'add':
    case 'update':
      actionButton.style.display = 'none';
      mainNav.style.display = 'none';
      break;
    default:
      actionButton.style.display = 'inline-block';
      mainNav.style.display = 'block';
      searchForm.style.display = 'block';
      break;
  }
}

function toggleToolButtonsVisibility(viewName) {
  const view = viewName || appConfig.view;
  if (dbData.loaded) {
    switch (view) {
      case 'portfolio':
        toggleToolButtonsForPortfolio(portfolioTable);
        break;
      case 'cashflow':
        toggleToolButtons(cashflowTable);
        break;
      case 'stock':
        toggleToolButtonsForStock(stockTable);
        break;
      case 'movements':
        toggleToolButtons(movementsTable);
        break;
      case 'suppliers':
        toggleToolButtons(suppliersTable);
        break;
      default:
        break;
    }
  } else {
    actionAddToPortfolioItemBtn.style.display = 'none';
    actionAddToSalesItemBtn.style.display = 'none';
    actionAddToPurchasesItemBtn.style.display = 'none';
    actionMenuDivider.style.display = 'none';
    actionAddBtn.style.display = 'none';
    actionUpdateBtn.style.display = 'none';
    actionDeleteBtn.style.display = 'none';
    addToolBtn.style.display = 'none';
    editToolBtn.style.display = 'none';
    deleteToolBtn.style.display = 'none';
    addToPortfolioToolBtn.style.display = 'none';
    addToPurchaseToolBtn.style.display = 'none';
    addToSaleToolBtn.style.display = 'none';
  }
}

function switchView(view) {
  const viewDivId = `${view}-view`;
  const viewLinkId = `${view}-link`;

  setActiveView(viewDivId);
  document.getElementById('view-title').style.display = 'block';

  if (appConfig.view) {
    const lastViewLinkId = `${appConfig.view}-link`;
    setInactiveLink(lastViewLinkId);
  }
  setActiveLink(viewLinkId);

  appConfig.view = view; // Register new view
  toggleElementsVisibility();
  toggleToolButtonsVisibility();

  // Show toolbar according to the size of the screen
  const screen = window.matchMedia('(max-width: 601px)');
  showToolbar(screen);
  screen.addEventListener('change', showToolbar);
  return false; // Avoid reloading the page
}

function switchSubView(subView) {
  tableToolbar.style.display = 'none';
  document.getElementById('view-title').style.display = 'none';
  const { view } = appConfig;
  const viewDivId = `${subView}-${view}-view`;
  setActiveView(viewDivId);
  toggleElementsVisibility(subView);
  M.updateTextFields(); // Reinitialize Materialize labels
}
