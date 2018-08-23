import React, { Component , createContext, Children } from 'react';
import {
  createDocument,
  fetchCollection,
  updateDocuments,
  deleteActivities,
} from '../../utils/firestore';


const StateContext = createContext({});

/*
  The Provider requires all firestoreAction return a promise that resolves
  with de data as an Object
*/


class Provider extends Component {
  constructor(props) {
    super(props);
    this.bindActionToState = this.bindActionToState.bind(this);
    /* Initial context value */
    this.state = {
      collections: {
        activities: [],
        accounts: [],
        categories: [],
      },
      waiting: {
        activities: false,
        accounts: false,
        categories: false,
      },
    };
    this.actions = {
      fetchActivities: this.bindActionToState('FETCH', 'activities', fetchCollection),
      createActivity: this.bindActionToState('CREATE', 'activities', createDocument),
      deleteActivities: this.bindActionToState('DELETE', 'activities', deleteActivities),
      fetchAccounts: this.bindActionToState('FETCH', 'accounts', fetchCollection),
      createAccount: this.bindActionToState('CREATE', 'accounts', createDocument),
      updateAccounts: this.bindActionToState('UPDATE', 'accounts', updateDocuments),
      fetchCategories: this.bindActionToState('FETCH', 'categories', fetchCollection),
      updateCategories: this.bindActionToState('UPDATE', 'categories', updateDocuments),
    };
  }

  updateLoading(collection, value) {
    return this.setState(state => Object.assign({}, state, {
      waiting: Object.assign({}, state.waiting, {
        [collection]: value,
      }),
    }));
  }

  updateItems(collectionName, itemsData) {
    const { collections } = this.state;
    const collection = collections[collectionName].map((currentItem) => {
      const dataToUpdate = itemsData.find(data => data.id === currentItem.id);
      if (dataToUpdate) {
        return Object.assign({}, currentItem, dataToUpdate);
      }
      return currentItem;
    });
    return this.setState(state => Object.assign({}, state, {
      collections: Object.assign({}, state.collections, {
        [collectionName]: collection,
      }),
    }));
  }

  deleteItems(collectionName, itemIds) {
    const { collections } = this.state;
    const collection = collections[collectionName].filter(item => !itemIds.includes(item.id))
    return this.setState(state => Object.assign({}, state, {
      collections: Object.assign({}, state.collections, {
        [collectionName]: collection,
      }),
    }));
  }

  addItem(collectionName, itemData) {
    return this.setState(state => Object.assign({}, state, {
      collections: Object.assign({}, state.collections, {
        [collectionName]: [itemData, ...state.collections[collectionName]],
      }),
    }));
  }

  addCollection(collectionName, data) {
    return this.setState(state => Object.assign({}, state, {
      collections: Object.assign({}, state.collections, {
        [collectionName]: data,
      }),
    }));
  }

  bindActionToState(actionType, collectionName, firestoreAction) {
    const { user } = this.props;
    if (actionType === 'FETCH') {
      return async () => {
        await this.updateLoading(collectionName, true);
        await this.addCollection(collectionName, await firestoreAction(user, collectionName));
        await this.updateLoading(collectionName, false);
      };
    }
    if (actionType === 'DELETE') {
      return async (ids) => {
        await firestoreAction(user, ids);
        await this.deleteItems(collectionName, ids);
      };
    }
    if (actionType === 'CREATE') {
      return async data => this.addItem(
        collectionName,
        await firestoreAction(user, collectionName, data),
      );
    }
    if (actionType === 'UPDATE') {
      return async (items) => {
        await firestoreAction(user, collectionName, items);
        return this.updateItems(collectionName, items);
      };
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

export default Provider;

const filterObject = (object, filter) => Object.keys(object).reduce((res, key) => {
  if (filter(key)) {
    res[key] = object[key];
  }
  return res;
}, {});

export const connect = (...requiredCollections) => (...requiredActions) => Target => props => (
  <StateContext.Consumer>
    {(context) => {
      const collections = filterObject(
        context.collections,
        key => requiredCollections.includes(key),
      );
      const waiting = filterObject(
        context.waiting,
        key => requiredCollections.includes(key),
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
          waiting={waiting}
        />
      );
    }}
  </StateContext.Consumer>
);
