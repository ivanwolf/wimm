import firebase from 'firebase';

export const signInOrCrateAccount = (onError) => (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
    if (err.code === 'auth/user-not-found') {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch((err) => {
        onError(err);
      });
    } else {
      onError(err);
    }
  });
}

export const updateUserProfile = (data) => {
  return firebase.auth().currentUser.updateProfile(data)
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};
