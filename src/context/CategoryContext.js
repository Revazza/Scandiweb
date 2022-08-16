import React, { Component } from "react";
import { ApolloCache, gql } from "@apollo/client";
import { apolloClient } from "../index";

const GET_CATEGORY_ITEMS = (category) => {
  return gql`
  query {
    category(input: { title: "${category}" }) {
      name
      products {
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
};
const fetchData = async (category) => {
  try {
    const response = await apolloClient.query({
      //initial
      query: GET_CATEGORY_ITEMS(category),
    });
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data.category.products;
  } catch (err) {
    console.log(err.message);
  }
};
const CategoryContext = React.createContext();

export class CategoryProvider extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      category: "all",
    };
  }

  componentDidMount() {
    const getData = async () => {
      const data = await fetchData("all");
      this.setState({
        items: data,
        category: "all",
      });
    };
    getData();
  }

  changeCategoryItems = async (newCategory) => {
    console.log(newCategory);
    const data = await fetchData(newCategory);
    this.setState({
      items: data,
      category: newCategory,
    });
  };

  render() {
    return (
      <CategoryContext.Provider
        value={{
          items: this.state.items,
          changeCategoryItems: this.changeCategoryItems,
          category: this.state.category,
        }}
      >
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}

export default CategoryContext;
