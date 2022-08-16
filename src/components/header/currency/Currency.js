import React, { Component } from "react";
import styles from "./Currency.module.scss";
import { gql } from "@apollo/client";
import { apolloClient } from "../../../index";
import CurrencyList from "./CurrencyList";
import CurrencyContext from '../../../context/CurrencyContext';
const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

class Currency extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      currentCurrency: "$",
      showDropdown: false,
    };
  }

  static contextType = CurrencyContext;

  componentDidMount() {
    const fetchCurrency = async () => {
      try {
        const response = await apolloClient.query({
          query: GET_CURRENCIES,
        });
        if (response.error) {
          throw new Error(response.error);
        }
        this.setState((prevState) => {
          return {
            ...prevState,
            currencies: response.data.currencies,
            currentCurrency:this.context.currentCurrency
          };
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCurrency();
  }

  onDropDownClick = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showDropdown: !this.state.showDropdown,
      };
    });
  };

  changeCurrency = (newCurrency) => {
    this.context.changeCurrency(newCurrency);
    this.setState((prevState) => {
      return {
        ...prevState,
        showDropdown:false,
        currentCurrency: newCurrency,
      };
    });
  };
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.dropdown_head} onClick={this.onDropDownClick}>
          <span>{this.state.currentCurrency}</span>
          <img
            src="./assets/arrow.png"
            alt="arrow"
            className={!this.state.showDropdown ? styles.rotate_arrow : ""}
          />
        </div>
        <CurrencyList
          currencies={this.state.currencies}
          showDropdown={this.state.showDropdown}
          onCurrencyChange={this.changeCurrency}
        />
      </div>
    );
  }
}

export default Currency;
