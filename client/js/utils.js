/** Change the format of the given date
 *
 * @param {Object} dateObj Date
 * @param {String} format Format i.e. 'dd/MM/yyyy'
 * @returns Formatted date as string
 */
function formatDate(dateObj, format) {
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  if (month < 10) { month = `0${month}`; }
  if (day < 10) { day = `0${day}`; }

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
 * @param {String} intTypes Type of number to take into account: 'positive', 'negative' or 'all'
 */
function sum(values, intTypes = 'all') {
  let total = 0;

  const isPositive = (num) => num > 0;
  const isNegative = (num) => num < 0;

  if (intTypes === 'all') {
    total = values.reduce((acc, value) => {
      if (!value) { // For null or undefined assign 0 to avoid NaN errors.
        value = 0;
      }
      return acc + value;
    });
  }

  if (intTypes === 'positive') {
    total = values.filter(isPositive).reduce((acc, value) => acc + value);
  }

  if (intTypes === 'negative') {
    total = values.filter(isNegative).reduce((acc, value) => acc + value);
  }

  return total;
}

/**
 * Sum all the numbers of the specified field
 * @param {Array[]} values Set of values in a 2d array
 * @param {String} field Name of the field (column title in db)
 * @param {String} intTypes Type of number to take into account: 'positive', 'negative' or 'all'
 */
function getColumnTotal(values, field, intTypes = 'all') {
  const columnValues = getValuesByFields(values, [field]).flat();
  columnValues.shift(); // Remove the title of the array
  const total = sum(columnValues, intTypes);
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

// Format number functions
/**
 * Get a series of digits and add thousands separators
 * @param {String} num String of a series of digits
 * @param {String} decSeparator Character used as decimal separator: Point or Comma
 * @returns {String} Number with thousands separator
 */
function formatDigits(num, decSeparator) {
  const thousandsSeparator = (decSeparator === '.' ? ',' : '.');
  return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
}

/**
 * Add zeroes to the right side of the number passed as argument
 * @param {String} num Number that gets the zeroes
 * @param {Number} zeroes Number of zeroes to be added
 * @returns {String}
 */
function addZeroes(num, zeroes) {
  let count = 0;
  let numWithZeroes = num;
  while (count < zeroes) {
    numWithZeroes = `${numWithZeroes}0`;
    count += 1;
  }
  return numWithZeroes;
}

/**
 * Format numbers whether they be integers or floats
 * @param {String} num Number to be formatted
 * @param {String} decSeparator Character used as decimal separator: Point or comma.
 * @param {Number} decimals Integer that limits the number of decimals accepted
 * @param {Boolean} addZero Define if the function must add zeroes to the decimals.
 * @returns {String} Formatted number
 */
function formatNumber(num, decSeparator = ',', decimals = 0, addZero = false) {
  let formattedNum = '';
  if (num) {
    if (num.indexOf(decSeparator) >= 0) {
      const decimalPos = num.indexOf(decSeparator);

      let leftSide = num.substring(0, decimalPos);
      let rightSide = num.substring(decimalPos);

      // Add thousand separator to left side of number
      leftSide = formatDigits(leftSide, decSeparator);
      // Validate right side
      rightSide = formatDigits(rightSide, decSeparator);

      // Add number
      if (addZero) {
        rightSide = addZeroes(rightSide, decimals);
      }

      // Limit decimal to number of digits sent by argument
      rightSide = rightSide.substring(0, decimals);
      // Join the pieces including the decimal separator
      formattedNum = leftSide + decSeparator + rightSide;
    } else {
      // no decimal entered
      // add commas or points to number
      // remove all non-digits
      formattedNum = formatDigits(num, decSeparator);

      if (addZero) {
        formattedNum = `${formattedNum}${decSeparator}${addZeroes('', decimals)}`;
      }
    }
  }
  return formattedNum;
}

/**
 * Gets a formatted number (string) and returns a string parsable into a number.
 * @param {String} numStr Formatted Number
 * @param {String} decSeparator Character used as decimal separator.
 * @returns {String}
 */
function makeParsableToNum(numStr, decSeparator) {
  let validNum = '';
  if (decSeparator === ',') {
    // Remove thousand separator
    validNum = numStr.replace(/\./g, '');
    // Change decimal separator
    // Avoid parsing warning from using a number with a point and no decimal numbers
    if (validNum.indexOf(',') === validNum.length - 1) {
      validNum = validNum.replace(',', '.0');
    } else {
      validNum = validNum.replace(',', '.');
    }
  } else {
    // Remove thousand separator
    validNum = numStr.replace(/,/g, '');
    // Avoid parsing warning from using a number with a point and no decimal numbers
    if (validNum.indexOf('.') === validNum.length - 1) {
      validNum = validNum.replace('.', '.0');
    }
  }
  return validNum;
}

/**
 * Search an item in the options of a select element and change the index to that
 * of the item passed as argument.
 * @param {Object} selectElem HTML Select element
 * @param {String} item Value the select element must have
 */
function selectOption(selectElem, item) {
  const { options } = selectElem;
  const optionsArr = Array.from(options);
  const index = optionsArr.findIndex((option) => option.value === item);
  if (index !== -1) {
    selectElem.selectedIndex = index;
  } else {
    // Select the first index by default
    selectElem.selectedIndex = 0;
  }
}
