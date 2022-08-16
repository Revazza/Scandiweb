import React, { Component } from "react";
import styles from "./Item.module.scss";
import CurrencyContext from "../../context/CurrencyContext";

export class Item extends Component {
  static contextType = CurrencyContext;

  render() {
    const currentCurrency = this.context.currentCurrency;
    const { name, prices, gallery } = this.props.item;
    const imgSrc = gallery[0];
    const price = prices.filter((user) => {
      return user.currency.symbol === currentCurrency;
    })[0].amount;

    return (
      <div className={styles.wrapper}>
        <img src={imgSrc} alt="" />
        <div className={styles.item_info}>
          <h3>{name}</h3>
          <span>{`${currentCurrency} ${price}`}</span>
        </div>
        <div className={styles.cart}>
          <img src="./assets/white-cart.png" alt="add to cart" />
        </div>
      </div>
    );
  }
}

export default Item;
