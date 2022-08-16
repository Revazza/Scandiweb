import "./App.css";

import { Component } from "react";
import Header from "./components/header/Header";

import { CurrencyProvider } from "./context/CurrencyContext";
import { CategoryProvider } from "./context/CategoryContext";
import Content from "./components/content/Content";

class App extends Component {
  render() {
    return (
      <CurrencyProvider>
        <CategoryProvider>
          <div className="App">
            <Header />
          </div>
          <Content />
        </CategoryProvider>
      </CurrencyProvider>
    );
  }
}

export default App;
