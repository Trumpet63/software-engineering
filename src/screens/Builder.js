import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';

 export default class Builder extends Component {
  nav=(navroute)=>()=>{
    this.props.navigation.navigate(navroute);
  }
  render() {
    return (
      <View>
        <Text>This is the builder screen</Text>
        <TouchableOpacity
        onPress={this.nav("Home")}>
          <Text>Go to Home Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={this.nav("Collection")}>
        <Text>Got to Collection</Text>
        </TouchableOpacity>

      </View>
    )
  }
}