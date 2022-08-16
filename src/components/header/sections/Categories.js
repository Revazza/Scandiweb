import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Categories.module.scss";
import { gql } from "@apollo/client/core";
import { apolloClient } from "../../../index";
import CategoryContext from "../../../context/CategoryContext";

const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

class Sections extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      activeCategory: "all",
    };
  }

  static contextType = CategoryContext;

  componentDidMount() {
    const fetchData = async () => {
      try {
        const response = await apolloClient.query({
          query: GET_CATEGORIES,
        });

        if (response.error) {
          throw new Error(response.error);
        }
        this.setState({ categories: response.data.categories });
      } catch (err) {
        //TODO:
        //Create error message layout
        console.log(err.message);
      }
    };

    fetchData();
  }

  onChangeCategory = (event) => {
    const newCategory = event.target.id;
    this.context.changeCategoryItems(newCategory);
    this.setState((prevState) => {
      return {
        ...prevState,
        activeCategory: newCategory,
      };
    });
  };

  render() {
    return (
      <nav className={styles.nav_wrapper}>
        {this.state.categories.map((category) => {
          return (
            <div className={styles.nav_link} key={category.name}>
              <NavLink
                onClick={this.onChangeCategory}
                id={category.name}
                to={`/${category.name}`}
                className={
                  category.name === this.state.activeCategory
                    ? styles.active
                    : styles.inactive
                }
              >
                {category.name}
              </NavLink>
            </div>
          );
        })}
      </nav>
    );
  }
}

export default Sections;
