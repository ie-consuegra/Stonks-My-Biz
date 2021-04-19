const appConfig = {
  currentView: '',
  set view(viewName) {
    if (viewName !== undefined) {
      this.currentView = viewName;
    }
  },
  get view() {
    return this.currentView;
  },
};
