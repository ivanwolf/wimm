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

/* FETCH */

export const fetchCollection = (user, collection) => (
  getUserDoc(user)
    .collection(collection)
    .get()
    .then(toArray)
);

/* CREATES */

export const createDocument = (user, collection, data) => (
  getUserDoc(user)
    .collection(collection)
    .add(data)
    .then(docRef => docRef.get())
    .then(snapshot => snapshot.data())
)

/* UPDATES */

export const updateDocument = (user, collection, { id, ...data }) => (
  getUserDoc(user)
    .collection(collection)
    .doc(id)
    .update(data)
);

export const updateDocuments = async (user, collection, items) => (
  items.forEach(async (item) => {
    await updateDocument(user, collection, item);
  })
);

/* DELETES */

export const deleteActivity = (user, activityId) => (
  getUserDoc(user).collection('activities').doc(activityId).delete()
);

export const deleteActivities = async (user, ids) => (
  ids.forEach(async (id) => {
    await deleteActivity(user, id);
  })
);

