const appConfig = {
  currentView: '',
  dbsLoaded: 0,
  set view(viewName) {
    if (viewName !== undefined) {
      this.currentView = viewName;
    }
  },
  get view() {
    return this.currentView;
  },
};
