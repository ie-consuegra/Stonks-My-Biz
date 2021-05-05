const today = new Date();
// const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const dayNum = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const formattedDayNum = (dayNum < 10) ? `0${dayNum}` : `${dayNum}`;
const formattedMonth = (month < 10) ? `0${month}` : `${month}`;
const formattedDate = `${formattedDayNum}/${formattedMonth}/${year}`;

const options = {
  format: 'dd/mm/yyyy',
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
  const elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems, options);
  elems.forEach((elem) => {
    elem.value = formattedDate;
  });
}
