import React, { createContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = UserContext.Provider;

export default Target => props => (
  <UserContext.Consumer>
    {user => (
      <Target {...props} user={user} />
    )}
  </UserContext.Consumer>
);
