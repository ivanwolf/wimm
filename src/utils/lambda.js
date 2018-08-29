const getBalanceRelativeToAccount = (activity, accountId) => {
  if (activity.account && activity.account.id === accountId) {
    if (activity.type === 'expense') return -activity.sum;
    if (activity.type === 'income') return activity.sum;
  }
  if (activity.from && activity.from.id === accountId) return -activity.sum;
  if (activity.to && activity.to.id === accountId) return activity.sum;
  return 0;
};

const getTotalRelativeToCategory = (activity, categoryId) => {
  if (activity.category && activity.category.id === categoryId) {
    return activity.sum;
  }
  return 0;
};

const activityRelativeToAccount = (activity, accountId) => (
  (activity.account && activity.account.id === accountId)
  || (activity.from && activity.from.id === accountId)
  || (activity.to && activity.to.id === accountId)
);

const activityRelatedToCategory = (activity, categoryID) => (
  activity.category && activity.category.id === categoryID
);

export const accountsToUpdate = (activitiesToDelete, accounts) => accounts
  .filter(acc => (
    activitiesToDelete.some(act => activityRelativeToAccount(act, acc.id))
  ))
  .map((acc) => {
    const balance = activitiesToDelete.reduce((bal, act) => (
      bal + getBalanceRelativeToAccount(act, acc.id)
    ), 0);
    const activityCount = activitiesToDelete.filter(act => (
      activityRelativeToAccount(act, acc.id)
    )).length;
    return {
      id: acc.id,
      balance: acc.balance - balance,
      activityCount: acc.activityCount - activityCount,
    };
  });

export const categoriesToUpdate = (activitiesToDelete, categories) => categories
  .filter(cat => (
    activitiesToDelete.some(act => activityRelatedToCategory(act, cat.id))
  ))
  .map((cat) => {
    const total = activitiesToDelete.reduce((tot, act) => (
      tot + getTotalRelativeToCategory(act, cat.id)
    ), 0);
    const activityCount = activitiesToDelete.filter(act => (
      activityRelatedToCategory(act, cat.id)
    )).length;
    return {
      id: cat.id,
      total: cat.total - total,
      activityCount: cat.activityCount - activityCount,
    };
  });

export const activitiesByDay = activities => activities.reduce((res, act) => {
  const activityDate = new Date(act.createdAt);
  const timeDiff = Math.abs(Date.now() - activityDate.getTime());
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  if (res[diffDays]) {
    res[diffDays] = [...res[diffDays], act];
  } else {
    res[diffDays] = [act];
  }
  return res;
}, {});

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

const formatDate = (date) => {
  const day = date.getDate();
  const index = date.getMonth();
  const year = date.getFullYear();
  return `${day} de ${monthNAmes[index]} ${year}`;
};

const oneDay = 1000 * 3600 * 24;

export const dateLabel = (key) => {
  if (key === 0) return 'Hoy';
  if (key === 1) return 'Ayer';
  const today = Date.now();
  const date = new Date(today - oneDay * key);
  if (key >= 2 && key < 5) {
    return dayName[date.getDay()];
  }
  return formatDate(date);
};
