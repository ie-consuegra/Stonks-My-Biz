module.exports = {
  beautify: true,
  prefix: "//some-cdn",
  relative: true,
  basePath: false,
  scripts: {
    main: "client/bundle.js"
  },
  styles: {
    custom: "client/style.css"
  },
  data: {
    // Data to pass to templates
    version: "0.1.0",
    title: "test",
  },
};
