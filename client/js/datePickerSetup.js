const today = new Date();

// This values will be in the language file
const options = {
  i18n: {
    cancel: WORD.cancel,
    done: WORD.done,
    months: WORD.months,
    monthsShort: WORD.monthsShort,
    weekdays: WORD.weekdays,
    weekdaysShort: WORD.weekdaysShort,
    weekdaysAbbrev: WORD.weekdaysAbbrev,
  },
  maxDate: today,
  defaultDate: today,
  setDefaultDate: true,
};

function getFormattedDate() {
  const format = settings.data.preferences.dateFormat;
  const formattedDate = formatDate(today, format); // today is temporarily a global var
  return formattedDate;
}

function loadDateIn(elemId) {
  const inputElem = document.getElementById(elemId);
  inputElem.value = getFormattedDate();
}

function initDatepickers() {
  const format = settings.data.preferences.dateFormat;
  const formattedDate = getFormattedDate();
  options.format = format.toLowerCase();

  const elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems, options);
  elems.forEach((elem) => {
    elem.value = formattedDate;
  });
}
