import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from '../utils/session';
import { Page, Container } from '../components/Layout';

const Home = () => {
  const signOut = () => {
    firebase.auth().signOut();
  };

  if (!getCurrentUser().displayName) {
    return <Redirect to="/username" />;
  }
  return (
    <Page centerContent>
      <Container marginBottom>
        <button type="button" onClick={signOut}>
          Adiós
        </button>
      </Container>
    </Page>
  );
};

export default Home;
