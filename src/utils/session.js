import firebase from 'firebase';

export const signInOrCrateAccount = onError => (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
    if (err.code === 'auth/user-not-found') {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch((err) => {
        onError(err);
      });
    } else {
      onError(err);
    }
  });
};

export const updateUserProfile = data => firebase.auth().currentUser.updateProfile(data);

export const getCurrentUser = () => firebase.auth().currentUser;

export const signOut = () => {
  firebase.auth().signOut();
};
