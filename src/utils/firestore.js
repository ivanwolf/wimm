import firebase from 'firebase';
import { payMethods, labels } from '../config/initialSetup';

let firestore = null;
const getStore = () => {
  if (firestore === null) {
    firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true};
    firestore.settings(settings);
  }
  return firestore;
};

export const getUserDoc = user => getStore().collection('users').doc(user.uid);

export const createInitialDocument = (user) => {
  payMethods.forEach(async (method) => {
    await getUserDoc(user).collection('methods').doc(method.id).set({
      name: method.name,
    });
  });
  labels.forEach(async (label) => {
    await getUserDoc(user).collection('labels').doc(label.id).set({
      name: label.name,
    });
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
      name: doc.data().name,
    });
  });
  return docs;
};

export const getUserMethods = user => getUserDoc(user).collection('methods').get().then(toArray);

export const getUserLabels = user => getUserDoc(user).collection('labels').get().then(toArray);
