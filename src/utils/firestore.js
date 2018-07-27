import firebase from 'firebase';
import { payMethods, labels } from '../config/initialSetup';

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const getStore = () => firestore;

export const getUserDoc = user => getStore().collection('users').doc(user.uid);

export const getUserBalance = user => getUserDoc(user).get().then((doc) => {
  return doc.data().balance;
});

export const createInitialDocument = (user) => {
  payMethods.forEach(async (method) => {
    await getUserDoc(user).collection('methods').doc(method.id).set({
      name: method.name,
      balance: 0,
    });
  });
  labels.forEach(async (label) => {
    await getUserDoc(user).collection('labels').doc(label.id).set({
      name: label.name,
      color: label.color,
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
      ...doc.data(),
    });
  });
  return docs;
};

export const getUserMethods = user => getUserDoc(user).collection('methods').get().then(toArray);

export const getUserLabels = user => getUserDoc(user).collection('labels').get().then(toArray);


export const getUserActivity = (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return getUserDoc(user)
    .collection('activities')
    .get()
    // .where('createdAt', '>', today.getTime())
    // .orderBy('createdAt', 'desc')
    .then(toArray);
};

export const createActivity = (user, data) => (
  getUserDoc(user).collection('activities').doc().set(data)
);

export const createPlace = (user, place) => (
  getUserDoc(user).collection('places').doc(place.id).set({
    name: place.name,
    address: place.address,
  })
);

export const updateLabel = (user, labelId, today) => (
  getUserDoc(user).collection('labels').doc(labelId).update({
    [today]: true,
  })
);

export const updatePlace = (user, placeId, today) => (
  getUserDoc(user).collection('places').doc(placeId).update({
    [today]: true,
  })
);

export const updateBalance = (user, balance) => (
  getUserDoc(user).update({ balance })
);
