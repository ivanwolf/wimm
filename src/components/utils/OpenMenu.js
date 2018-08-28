import React, { createContext, Component, Children } from 'react';

const OpenMenuContext = createContext({
  open: false,
  toggleOpenMenu: () => {},
});

class OpenMenuProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleOpenMenu = this.toggleOpenMenu.bind(this);
  }

  toggleOpenMenu() {
    this.setState(state => ({
      open: !state.open,
    }));
  }

  render() {
    const value = Object.assign(this.state, {
      toggleOpenMenu: this.toggleOpenMenu,
    });
    return (
      <OpenMenuContext.Provider value={value}>
        {Children.only(this.props.children)}
      </OpenMenuContext.Provider>
    );
  }
};

export default OpenMenuProvider;

export const OpenMenuConsumer = ({ render }) => (
  <OpenMenuContext.Consumer>
    {({ open, toggleOpenMenu }) => (
      render(open, toggleOpenMenu)
    )}
  </OpenMenuContext.Consumer>
);
