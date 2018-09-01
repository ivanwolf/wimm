export const formatSum = sum => sum.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];

const dayName = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const monthNAmes = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const formatDate = (date) => {
  const day = date.getDate();
  const index = date.getMonth();
  const year = date.getFullYear();
  return `${day} de ${monthNAmes[index]} ${year}`;
};

export const formatTime = (date) => {
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${hours.toString().padStart(2, ' ')}:${mins.toString().padStart(2, '0')}`;
};

const msInOneDay = 1000 * 3600 * 24;

const lastMomentToday = () => {
  const today = new Date();
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59);
  today.setMilliseconds(999);
  return today;
};

export const dateLabel = (key) => {
  if (key === 0) return 'Hoy';
  if (key === 1) return 'Ayer';
  const today = lastMomentToday();
  const date = new Date(today - msInOneDay * key);
  if (key >= 2 && key < 5) {
    return dayName[date.getDay()];
  }
  return formatDate(date);
};
