import React, { Component } from 'react';
import Cart from './cart/Cart';
import Currency from './currency/Currency';
import styles from './Header.module.scss';
import Sections from './sections/Categories';

export class Header extends Component {

  render() {
    return (
      <header className={styles.wrapper}>
        <Sections />
        <div className={styles.logo}>
          <img src='./assets/logo.png' alt='logo' />
        </div>
        <Currency />
        <Cart />
      </header>
    )
  }
}

export default Header