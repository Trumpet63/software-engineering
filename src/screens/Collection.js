import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

 class Collection extends Component {
  render() {
    return (
      <View>
        <Text>This is the Collection screen</Text>
        <Button onPress={() => this.props.navigation.navigate('Home')} title="Home"/>
        <Button onPress={()=>this.props.navigation.navigate('Builder')} title="Meal Builder"/>
      </View>
    )
  }
};

export default Collection;