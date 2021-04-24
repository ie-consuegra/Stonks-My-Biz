/* eslint-disable no-unused-vars */
/* global PropertiesService, Utilities, Logger */

/** Convert all the date objects of a 2d array into strings
 * @param {array[]} values
 * @param {String[]} dateFields: Fields that contain date objects
 * @param {String} format: Format per the SimpleDateFormat specification
 * @returns {array[]}
 */
function formatDates(values, dateFields, format) {
  // Get the fields by taking the column titles
  const fields = values[0];
  // Create an array of the indexes where dates are located
  const dateFieldIndexes = dateFields.map((dateField) => fields.indexOf(dateField));

  // Format a value if match with an index where a date is located
  const formatDateValue = (value, entryIndex) => (dateFieldIndexes.indexOf(entryIndex) !== -1
    ? Utilities.formatDate(value, 'GMT', format)
    : value);

  // Format the dates in an entry (array)
  const formatDatesInEntry = (entry, valuesIndex) => {
    let formattedEntry;
    // Skip the first row (column titles) at 0 index
    if (valuesIndex !== 0) {
      formattedEntry = entry.map(formatDateValue);
    } else {
      formattedEntry = entry;
    }
    return formattedEntry;
  };

  // Format the dates in values (2d array)
  const newValues = values.map(formatDatesInEntry);
  return newValues;
}

function createDatesFormatter(formatterFn, dateField, format) {
  return (values) => formatterFn(values, dateField, format);
}

// Useful during development not for production ------
function deleteProperties() {
  PropertiesService.getScriptProperties().deleteAllProperties();
}
