// Modules
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Screens
import Boot from "./screens/Boot";
import Home from './screens/Home';
import Restaurants from "./screens/Restaurants";
import Collection from "./screens/Collection";
import Builder from "./screens/Builder";

// Functions
import AllReducers from './reducers/AllReducers';

const store = createStore(AllReducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

const Navigator = createStackNavigator(
  {
    Boot: Boot,
    Home: Home,
    Restaurants: Restaurants,
    Collection: Collection,
    Builder: Builder,
  },
  {
    initialRouteName: "Boot"
  }
);

export default App;