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
    case 'add':
    case 'update':
      actionButton.style.display = 'none';
      searchForm.style.display = 'none';
      break;
    default:
      actionButton.style.display = 'inline-block';
      searchForm.style.display = 'block';
      break;
  }
}

function switchView(view) {
  const viewDivId = `${view}-view`;
  const viewLinkId = `${view}-link`;

  setActiveView(viewDivId);

  if (appConfig.view) {
    const lastViewLinkId = `${appConfig.view}-link`;
    setInactiveLink(lastViewLinkId);
  }
  setActiveLink(viewLinkId);

  appConfig.view = view; // Register new view
  toggleElementsVisibility();
  return false; // Avoid reloading the page
}

function switchSubView(subView) {
  const { view } = appConfig;
  const viewDivId = `${subView}-${view}-view`;
  setActiveView(viewDivId);
  toggleElementsVisibility(subView);
}
