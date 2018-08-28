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

/* LISTENERS */

export const addListener = (user, collection, listener) => (
  getUserDoc(user)
    .collection(collection)
    .onSnapshot({
      includeMetadataChanges: true,
    }, (querySnapshot) => {
      const docs = [];
      let type;
      querySnapshot.docChanges().forEach((change) => {
        type = change.type;
        docs.push({
          id: change.doc.id,
          ...change.doc.data(),
        });
      });
      if (docs.length > 0) {
        listener({
          type,
          collection,
          docs,
        });
      }
    })
);

/* FETCH */

export const fetchCollection = (user, collection) => (
  getUserDoc(user)
    .collection(collection)
    .get()
);

/* CREATES */

export const createDocument = (user, collection, data) => (
  getUserDoc(user)
    .collection(collection)
    .add(data)
    .then(docRef => docRef.id)
);

/* UPDATES */

export const updateDocument = (user, collection, { id, ...data }) => (
  getUserDoc(user)
    .collection(collection)
    .doc(id)
    .update(data)
);

export const updateDocuments = async (user, collection, docs) => (
  docs.forEach(async (doc) => {
    await updateDocument(user, collection, doc);
  })
);

/* DELETES */

export const deleteDocument = async (user, collection, id) => (
  getUserDoc(user).collection(collection).doc(id).delete()
);

export const deleteDocuments = async (user, collection, docs) => (
  docs.forEach(async (doc) => {
    await deleteDocument(user, collection, doc);
  })
);

