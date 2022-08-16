import React, { Component } from "react";
import styles from "./Content.module.scss";
import CategoryContext from "../../context/CategoryContext";
import Item from "./Item";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      category: "all",
    };
  }
  static contextType = CategoryContext;

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state.items) === JSON.stringify(prevState.items)) {
      this.setState(
        {
          items: this.context.items,
          category: this.context.category,
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  render() {
    return (
      <main>
        <h1>{this.state.category}</h1>

        <div className={styles.wrapper}>
          {this.state.items.map((item,index) => {
            return <Item key={index} item={item} />;
          })}
        </div>
      </main>
    );
  }
}

export default Content;
