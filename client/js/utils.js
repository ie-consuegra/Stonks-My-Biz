/* eslint-disable no-unused-vars */
function getTimestamp() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const timestamp = `${now.getDate()}/${month}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return timestamp;
}
