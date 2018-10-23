import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Home from './src/screens/Home';
import Collection from "./src/screens/Collection";
import Builder from "./src/screens/Builder";
import {createStackNavigator} from "react-navigation";

export default class App extends Component {
  render() {
    return <Navigator />;
  }
}
const Navigator = createStackNavigator(
  {
    Home:Home,
    Collection:Collection,
    Builder:Builder,
  },
  {
    initialRouteName: "Home"
  }
);
