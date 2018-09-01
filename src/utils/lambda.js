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

const lastMomentToday = () => {
  const today = new Date();
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59);
  today.setMilliseconds(999);
  return today;
};

const msInOneDay = 1000 * 3600 * 24;

export const activitiesByDay = activities => activities.reduce((res, act) => {
  const activityDate = new Date(act.createdAt);
  const today = lastMomentToday();
  const timeDiff = Math.abs(today.getTime() - activityDate.getTime());
  const diffDays = Math.floor(timeDiff / msInOneDay);
  if (res[diffDays]) {
    res[diffDays] = [...res[diffDays], act];
  } else {
    res[diffDays] = [act];
  }
  return res;
}, {});

export const expensesByDay = activityLists => Object.keys(activityLists).reduce((res, key) => {
  res[key] = activityLists[key].reduce((sum, activity) => {
    if (activity.type === 'expense') {
      return sum + activity.sum;
    }
    return sum;
  }, 0);
  return res;
}, {});
