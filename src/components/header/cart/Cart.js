import React, { Component } from 'react';
import styles from './Cart.module.scss';

export class Cart extends Component {
  render() {
    return (
      <div className={styles.cart}>
        <img src='./assets/cart.png' alt='cart' />
        <div className={styles.amount}>
          <span>34</span>
        </div>
        {/* TODO:
            cart list component
        */}
      </div>
    )
  }
}

export default Cart