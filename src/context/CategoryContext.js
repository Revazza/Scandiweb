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
    };
  }

  componentDidMount() {
    const getData = async () => {
      const data = await fetchData("all");
      console.log(data);
      this.setState({
        items:data
      });
    };
    getData();
  }

  changeCategoryItems = async (newCategory) => {
    const data = await fetchData(newCategory);
      console.log(data);
      this.setState({
        items:data
      });
  };

  render() {
    return (
      <CategoryContext.Provider
        value={{
          items: this.state.items,
          changeCategoryItems: this.changeCategoryItems,
        }}
      >
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}

export default CategoryContext;
