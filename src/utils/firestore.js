import firebase from 'firebase';

let firestore = null;
const getStore = () => {
  if (firestore === null) {
    firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true};
    firestore.settings(settings);
  }
  return firestore;
};

export const createInitialDocument = user => (
  getStore().collection('users').doc(user.uid).set({
    name: user.displayName,
  })
);
