function setActiveView(view) {
  const appViews = document.querySelector('#views').childNodes;
  appViews.forEach((node) => {
    if (node.nodeName.toLowerCase() === 'div') {
      node.style.display = 'none';
    }
  });
  const activeView = document.getElementById(view);
  activeView.style.display = 'block';
  return false; // Avoid reloading the page
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

function switchView(view) {
  const viewDivId = `${view}-view`;
  const viewLinkId = `${view}-link`;

  setActiveView(viewDivId);

  if (appConfig.view) {
    const lastViewLinkId = `${appConfig.view}-link`;
    setInactiveLink(lastViewLinkId);
  }
  setActiveLink(viewLinkId);

  appConfig.view = view;
}
