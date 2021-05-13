/** Change the format of the given date
 *
 * @param {Object} dateObj Date
 * @param {String} format Format i.e. 'dd/MM/yyyy'
 * @returns Formatted date as string
 */
function formatDate(dateObj, format) {
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  let formattedDateStr = '';
  switch (format) {
    case 'dd/MM/yyyy':
      formattedDateStr = `${day}/${month}/${year}`;
      break;
    case 'dd/MM':
      formattedDateStr = `${day}/${month}`;
      break;
    case 'dd-MM-yyyy':
      formattedDateStr = `${day}-${month}-${year}`;
      break;
    case 'dd-MM':
      formattedDateStr = `${day}-${month}`;
      break;
    default:
      break;
  }
  return formattedDateStr;
}

function getTimestamp() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const timestamp = `${now.getDate()}/${month}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return timestamp;
}

function toDate(ddmmyyyy) {
  let date = ddmmyyyy.toString();

  // Check if the format is a valid date string
  // This is a temporary checker
  if (date.length >= 6) {
    const dateArr = date.split('/');
    const month = (dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1]);
    const day = (dateArr[0].length === 1 ? `0${dateArr[0]}` : dateArr[0]);

    date = `${dateArr[2]}-${month}-${day}`;
  }

  return date;
}

/** Find several entries in values
 * and returns only the values that match
 * @param {Object} query Object with the field and keyword { field: '', keyword: '' }
 * @returns {Array[]} Values that match the query
 */
function find(values, query) {
  const fields = values[0];
  const index = fields.indexOf(query.field);

  const { keyword } = query;

  const isEqual = (entry) => entry[index].toString() === keyword.toString();

  const results = values.filter(isEqual);
  return results;
}

/** Find several entries in values
 * and returns the values that match and the titles of the columns at index 0
 * @param {Object} query Object with the field and keyword { field: '', keyword: '' }
 * @returns {Array[]} Values that match the query
 */
function filter(values, query) {
  const [fields] = values;
  const filteredValues = find(query);

  filteredValues.unshift(fields);
  return filteredValues;
}

function getValuesByFields(values, fieldsArray) {
  const [fields] = values;
  const fieldsIndexes = fieldsArray.map((field) => fields.indexOf(field));
  const approvedFieldsIndexes = fieldsIndexes.filter((item) => item !== -1);
  const getApprovedValues = (entry) => approvedFieldsIndexes.map((fieldIndex) => entry[fieldIndex]);

  const valuesByFields = values.map(getApprovedValues);
  return valuesByFields;
}

/**
 * Find one entry and returns it
 * @param {Object} query: Object with two properties: field and keyword { field: '', keyword: '' }
 * @returns {Array}
 */
function findOne(values, query) {
  const [fields] = values;
  const index = fields.indexOf(query.field);
  const { keyword } = query;

  const isEqual = (entry) => entry[index].toString() === keyword.toString();

  const foundIndex = values.findIndex(isEqual);
  return values[foundIndex];
}

/**
 * Sum all the numbers in an array
 * @param {Number[]} values Array of numbers
 */
function sum(values) {
  const total = values.reduce((acc, value) => {
    if (!value) { // For null or undefined assign 0 to avoid NaN errors.
      value = 0;
    }
    return acc + value;
  });
  return total;
}

/**
 * Sum all the numbers of the specified field
 * @param {Array[]} values Set of values in a 2d array
 * @param {String} field Name of the field (column title in db)
 */
function getColumnTotal(values, field) {
  const columnValues = getValuesByFields(values, [field]).flat();
  columnValues.shift(); // Remove the title of the array
  const total = sum(columnValues);
  return total;
}

/** Check if an object is empty
 * returns true or false
 * @param {Object} obj Object
 * @returns Boolean
 */
function isEmpty(obj) {
  const arr = Object.keys(obj);
  return arr.length === 0;
}
