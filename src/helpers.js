export function pad0(n) {  // padding with 0
  return n > 9 ? n : '0' + n;
}

export function getTime(d = new Date()) {
  return [d.getHours(), d.getMinutes()].map(pad0).join(':');
}

export function getISODate(d = new Date()) {
  return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()].map(pad0).join('-');
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function hmsToDate(hour = 0, min = 0, sec = 0) {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, min, sec);
}

export function isPastTrip(date) {
  return new Date() > date;
}

export function timeToDate(timeString) {
  const t = timeString.split(/:|\./g);
  return hmsToDate(t[0], t[1], t[2]);
}