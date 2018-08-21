import firebase from 'firebase';
import { initialAccounts, initialCategories } from '../config/initialSetup';

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const getStore = () => firestore;

export const getUserDoc = user => getStore().collection('users').doc(user.uid);

export const createInitialDocument = (user) => {
  initialAccounts.forEach(async (account) => {
    await getUserDoc(user).collection('accounts').add(account);
  });
  initialCategories.forEach(async (category) => {
    await getUserDoc(user).collection('categories').add(category);
  });
  return getUserDoc(user).set({
    name: user.displayName,
    email: user.email,
  });
};

const toArray = (query) => {
  const docs = [];
  query.forEach((doc) => {
    docs.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return docs;
};

/* GETS */

export const getAccounts = user => getUserDoc(user).collection('accounts').get().then(toArray);

export const getCategories = user => getUserDoc(user).collection('categories').get().then(toArray);

export const getActivities = user => (
  getUserDoc(user)
    .collection('activities')
    .get()
    .then(toArray)
);

/* CREATES */

export const createActivity = (user, data) => (
  getUserDoc(user).collection('activities').add(data).then(doc => doc.id)
);

export const createAccount = (user, data) => (
  getUserDoc(user).collection('accounts').add(data).then(docRef => docRef.get())
    .then(snapshot => snapshot.data())
);  

export const createPlace = (user, place) => (
  getUserDoc(user).collection('places').doc(place.id).set({
    name: place.name,
    address: place.address,
  })
);

/* UPDATES */

export const updateAccount = (user, accountId, data) => (
  getUserDoc(user).collection('accounts').doc(accountId).update(data)
);

export const updateCategory = (user, categoryId, data) => (
  getUserDoc(user).collection('categories').doc(categoryId).update(data)
);

export const updatePlace = (user, placeId, data) => (
  getUserDoc(user).collection('places').doc(placeId).update(data)
);

/* DELETES */

export const deleteActivity = (user, activityId) => (
  getUserDoc(user).collection('activities').doc(activityId).delete()
);


export const deleteActivites = (
  user,
  activitiesToDelete,
  updatedAccounts,
  updatedCategories,
) => {
  updatedCategories.forEach(async ({ id, ...data }) => {
    await updateCategory(user, id, data);
  });
  updatedAccounts.forEach(async ({ id, ...data }) => {
    await updateAccount(user, id, data);
  });
  activitiesToDelete.forEach(async (act) => {
    await deleteActivity(user, act.id);
  });
};
