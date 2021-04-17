/* eslint-disable no-unused-vars */
/* global HtmlService */
function doGet() {
  const template = HtmlService.createTemplateFromFile('frontend');

  const output = template.evaluate()
    .setTitle('Stonks App')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  return output;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}
