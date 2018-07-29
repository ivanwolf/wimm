import firebase from 'firebase';
import { accounts, categories } from '../config/initialSetup';

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const getStore = () => firestore;

export const getUserDoc = user => getStore().collection('users').doc(user.uid);

export const createInitialDocument = (user) => {
  accounts.forEach(async (account) => {
    await getUserDoc(user).collection('accounts').add(account);
  });
  categories.forEach(async (category) => {
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
