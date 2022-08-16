import "./App.css";

import { Component } from "react";
import Header from "./components/header/Header";

import { CurrencyProvider } from "./context/CurrencyContext";

class App extends Component {
  render() {
    return (
      <CurrencyProvider>
        <div className="App">
          <Header />
        </div>
      </CurrencyProvider>
    );
  }
}

export default App;
