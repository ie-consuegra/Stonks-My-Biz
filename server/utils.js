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

function deleteAppSettingsStored() {
  PropertiesService.getScriptProperties().deleteProperty('APP_SETTINGS');
}

/**
 * Returns the month and year of the date passed as argument
 * If none is passed, returns the month of the current date
 * @param {String} date Date as string, in day, month, year order (hyphens or slashes as separators)
 * @returns {String[]} Month and year in an array [month, year]
 */
function getMonthAndYear(date) {
  let month = '';
  let year = '';

  if (date) {
    let dateArr = [];
    if (date.includes('/')) {
      dateArr = date.split('/');
    } else {
      dateArr = date.split('-');
    }
    month = dateArr[1];
    // Check if the date passed contains the year
    if (dateArr.length === 3) {
      year = dateArr[2];
    } else {
      const dateObj = new Date();
      year = dateObj.getFullYear().toString();
    }
  } else {
    const dateObj = new Date();
    // Add 1 to make it match with the current month order
    const monthNumber = String(dateObj.getMonth() + 1);
    // If the month is not a two-digit number add a 0 to the left
    month = monthNumber.length > 1 ? monthNumber : `0${monthNumber}`;
    year = dateObj.getFullYear().toString();
  }

  return [month, year];
}
