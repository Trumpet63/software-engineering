// Modules
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

// Screens
import Home from './src/screens/Home';
import Restaurants from "./src/screens/Restaurants";
import Collection from "./src/screens/Collection";
import Builder from "./src/screens/Builder";

export default class App extends Component {
  render() {
    return <Navigator />;
  }
}
const Navigator = createStackNavigator(
  {
    Home: Home,
    Restaurants: Restaurants,
    Collection: Collection,
    Builder: Builder,
  },
  {
    initialRouteName: "Home"
  }
);
