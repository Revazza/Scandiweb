import React, { Component } from "react";

const CurrencyContext = React.createContext();

export class CurrencyProvider extends Component {
  constructor() {
    super();
    this.state = {
      currentCurrency: "$",
    };
  }

  changeCurrency = (newCurrency) => {
    this.setState({ currentCurrency: newCurrency });
  };

  render() {
    return <CurrencyContext.Provider value={{
      currentCurrency:this.state.currentCurrency,
      changeCurrency:this.changeCurrency,
    }}>
      {this.props.children}
    </CurrencyContext.Provider>
  }
}

export default CurrencyContext;
