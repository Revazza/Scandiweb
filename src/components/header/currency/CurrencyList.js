import React, { Component } from "react";
import styles from "./CurrencyList.module.scss";

export class CurrencyList extends Component {
  constructor() {
    super();
  }

  handleCurrencyChange = (event) => {
    this.props.onCurrencyChange(event.target.id);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.showDropdown && (
          <div className={styles.currency_wrapper}>
            <ul>
              {this.props.currencies.map((currency) => {
                return (
                  <li
                    key={currency.symbol}
                    id={currency.symbol}
                    onClick={this.handleCurrencyChange}
                  >{`${currency.symbol} ${currency.label}`}</li>
                );
              })}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CurrencyList;
