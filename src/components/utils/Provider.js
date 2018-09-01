import React, { Component, createContext, Children } from 'react';
import {
  createDocument,
  fetchCollection,
  updateDocument,
  updateDocuments,
  deleteDocuments,
  addListener,
} from '../../utils/firestore';
import withUser from '../../hocs/userContext';


const StateContext = createContext({});

/*
  The Provider requires all firestoreAction return a promise that resolves
  with de data as an Object
*/

const loadingKey = collection => `${collection}Loading`;

const sortBy = (collection) => {
  if (collection === 'activities') return 'createdAt';
  if (collection === 'accounts' || collection === 'categories') return 'activityCount'
  return 'id';
};

class Provider extends Component {
  constructor(props) {
    super(props);
    this.updateStore = this.updateStore.bind(this);
    this.bindActionToCollection = this.bindActionToCollection.bind(this);
    /* Initial context value */
    this.state = {
      activities: [],
      activitiesLoading: false,
      accounts: [],
      accountsLoading: false,
      categories: [],
      categoriesLoading: false,
    };
    this.actions = {
      fetchActivities: this.bindActionToCollection(fetchCollection, 'activities', true),
      createActivity: this.bindActionToCollection(createDocument, 'activities'),
      deleteActivities: this.bindActionToCollection(deleteDocuments, 'activities'),
      fetchAccounts: this.bindActionToCollection(fetchCollection, 'accounts', true),
      createAccount: this.bindActionToCollection(createDocument, 'accounts'),
      updateAccount: this.bindActionToCollection(updateDocument, 'accounts'),
      updateAccounts: this.bindActionToCollection(updateDocuments, 'accounts'),
      deleteAccounts: this.bindActionToCollection(deleteDocuments, 'accounts'),
      fetchCategories: this.bindActionToCollection(fetchCollection, 'categories', true),
      updateCategory: this.bindActionToCollection(updateDocument, 'categories'),
      updateCategories: this.bindActionToCollection(updateDocuments, 'categories'),
    };
  }

  componentDidMount() {
    const { user } = this.props;
    addListener(user, 'activities', this.updateStore);
    addListener(user, 'accounts', this.updateStore);
    addListener(user, 'categories', this.updateStore);
  }

  bindActionToCollection(action, collection, loadingFlag = false) {
    const { user } = this.props;
    // if (loadingFlag) {
    //   return async (data) => {
    //     await this.setState({
    //       [loadingKey(collection)]: true,
    //     });
    //     return action(user, collection, data);
    //   };
    // }
    return data => action(user, collection, data);
  }

  updateStore(change) {
    const docs = this.state[change.collection];
    if (change.type === 'load') {
      this.setState({
        [loadingKey(change.collection)]: false,
      });
    }
    if (change.type === 'added') {
      const sortedDocs = [...change.docs, ...docs].sort((a, b) => (
        a[sortBy(change.collection)] < b[sortBy(change.collection)]
      ));
      this.setState({
        [change.collection]: sortedDocs,
        [loadingKey(change.collection)]: false,
      });
    }

    if (change.type === 'modified') {
      this.setState({
        [change.collection]: docs.map((currentDoc) => {
          const updatedDoc = change.docs.find(doc => doc.id === currentDoc.id);
          return updatedDoc || currentDoc;
        }),
        [loadingKey(change.collection)]: false,
      });
    }

    if (change.type === 'removed') {
      const deletedIds = change.docs.map(doc => doc.id);
      this.setState({
        [change.collection]: docs.filter(doc => !deletedIds.includes(doc.id)),
        [loadingKey(change.collection)]: false,
      });
    }
  }


  render() {
    const value = Object.assign(this.state, {
      actions: this.actions,
    });
    return (
      <StateContext.Provider value={value}>
        {Children.only(this.props.children)}
      </StateContext.Provider>
    );
  }
}

export default withUser(Provider);

const filterObject = (object, filter) => Object.keys(object).reduce((res, key) => {
  if (filter(key)) {
    res[key] = object[key];
  }
  return res;
}, {});

export const connect = (...requiredCollections) => {
  const requiredLoadingKeys = requiredCollections.map(collection => loadingKey(collection));
  return (...requiredActions) => Target => props => (
    <StateContext.Consumer>
      {(context) => {
        const collections = filterObject(
          context,
          key => requiredCollections.includes(key) || requiredLoadingKeys.includes(key),
        );
        const actions = filterObject(
          context.actions,
          key => requiredActions.includes(key),
        );
        return (
          <Target
            {...props}
            {...collections}
            {...actions}
          />
        );
      }}
    </StateContext.Consumer>
  );
};
