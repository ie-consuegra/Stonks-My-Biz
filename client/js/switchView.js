function showToolbar(event) {
  if (event.matches) {
    tableToolbar.style.display = 'none';
  } else {
    switch (settings.view) {
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

function loadSaleSerial() {
  const saleSerial = serialFormat(settings.data.sales.serial);
  document.getElementById('sales-new-item-details').value = saleSerial;
}

function toggleElementsVisibility(viewName) {
  const view = viewName || settings.view;
  switch (view) {
    case 'dashboard':
    case 'settings':
    case 'help':
      actionButton.style.display = 'none';
      mainNav.style.display = 'block';
      searchForm.style.display = 'none';
      break;
    case 'sales':
      loadSaleSerial();
      actionButton.style.display = 'none';
      mainNav.style.display = 'block';
      searchForm.style.display = 'block';
      break;
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
  const view = viewName || settings.view;
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

function getPureAnchorText(elem) {
  const anchorText = elem.text;
  const iconText = elem.children[0].textContent; // Get the text of the i tag
  const aTextLength = anchorText.length - iconText.length;
  return anchorText.substring(0, aTextLength);
}

function switchView(view) {
  const viewDivId = `${view}-view`;
  const viewLinkId = `${view}-link`;

  const linkElem = document.getElementById(viewLinkId);
  const viewTitle = document.getElementById('view-title');

  setActiveView(viewDivId);
  viewTitle.style.display = 'block';
  viewTitle.innerHTML = getPureAnchorText(linkElem);

  if (settings.view) {
    const lastViewLinkId = `${settings.view}-link`;
    setInactiveLink(lastViewLinkId);
  }
  setActiveLink(viewLinkId);

  settings.view = view; // Register new view
  toggleElementsVisibility();
  toggleToolButtonsVisibility();

  // Show toolbar according to the size of the screen
  const screen = window.matchMedia('(max-width: 601px)');
  showToolbar(screen);
  screen.addEventListener('change', showToolbar);

  // Reinitialize Materialize labels in views with inputs
  if (view === 'sales' || view === 'purchases') {
    M.updateTextFields();
  }
  return false; // Avoid reloading the page
}

function switchSubView(subView) {
  tableToolbar.style.display = 'none';
  document.getElementById('view-title').style.display = 'none';
  const { view } = settings;
  const viewDivId = `${subView}-${view}-view`;
  setActiveView(viewDivId);
  toggleElementsVisibility(subView);
  M.updateTextFields(); // Reinitialize Materialize labels
}
