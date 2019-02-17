export function pad0(n) {  // padding with 0
  return n > 9 ? n : '0' + n;
}

export function getTime(date) {
  const d = date || new Date();
  return [d.getHours(), d.getMinutes()].map(pad0).join(':');
}

export function getISODate(date) {
  const d = date || new Date();
  return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()].map(pad0).join('-');
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
