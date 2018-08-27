import React, { createContext, Component, Children } from 'react';

const SelectedContex = createContext([]);

class SelectItemProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.clearSelections = this.clearSelections.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  clearSelections() {
    this.setState({ items: [] });
  }

  handleSelectItem(id) {
    const { items } = this.state;
    if (items.includes(id)) {
      this.setState({
        items: items.filter(actId => actId !== id),
      });
    } else {
      this.setState({
        items: [id, ...items],
      });
    }
  }

  render() {
    const value = Object.assign(this.state, {
      clearSelections: this.clearSelections,
      handleSelectItem: this.handleSelectItem,
    });
    return (
      <SelectedContex.Provider value={value}>
        {Children.only(this.props.children)}
      </SelectedContex.Provider>
    );
  }
};

export default SelectItemProvider;

export const SelectItemConsumer = ({ render }) => (
  <SelectedContex.Consumer>
    {({ items, handleSelectItem, clearSelections }) => (
      render(items, handleSelectItem, clearSelections)
    )}
  </SelectedContex.Consumer>
);
