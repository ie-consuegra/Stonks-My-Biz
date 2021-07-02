const today = new Date();

// This values will be in the language file
const options = {
  i18n: {
    cancel: 'cancelar',
    done: 'Aceptar',
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
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
