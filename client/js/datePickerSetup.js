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
    setDefaultDate: true,
    defaultDate: today,
  },
};

function initDatepickers() {
  const format = settings.data.preferences.dateFormat;
  const formattedDate = formatDate(today, format);
  options.format = format.toLowerCase();

  const elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems, options);
  elems.forEach((elem) => {
    elem.value = formattedDate;
  });
}
