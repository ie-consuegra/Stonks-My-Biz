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

/**
 * Find several entries in values
 * @param {Object} query Object with the field and keyword
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
 * @param {Object} query Object with the field and keyword
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
