import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, Image, Button } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import getNewRecipe from '../functions/recipes';

export default class Builder extends Component {
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: {},
      mealSummary: [],
      mealsAvailable: [],
      data: [
        {
          label: '150%',
          size: 15
        },
        {
          label: '100%',
          size: 15
        },
        {
          label: '50%',
          size: 15
        }
      ]
    };

    for (var i = 0; i < 5; i++) {
      getNewRecipe((result) => {
        this.setState({
          mealsAvailable: [
            ...this.state.mealsAvailable,
            result,
          ],
        });
      });
    }
  }

  addToMealSummary = () => {
    if (this.state.mealSummary.length < 3) {
      this.setState({
        mealSummary: [
          ...this.state.mealSummary,
          this.state.selectedItem,
        ],
        selectedItem: {},
      });
    }
    else {
      alert("Your meal summary is already full...");
    }
  }

  render() {
    var images = [];

    this.state.mealsAvailable.map((meal, i) => {
      images.push(
        <TouchableOpacity
          key={i}
          style={styles.Image}
          onPress={() => (this.setState({ selectedItem: meal }))}>
          <Image style={styles.Image}
            source={{ uri: meal.image }} />
        </TouchableOpacity>
      );
    });
    return (
      <View>
        <View style={styles.FirstContainer}>
          <Button title='Add to summary' onPress={this.addToMealSummary} />
          <View style={styles.dropzone}>
            <Image style={styles.Image}
              source={{ uri: this.state.selectedItem.image }} />
          </View>
          <View style={styles.portionSize}>
            <RadioGroup radioButtons={this.state.data} />
          </View>
        </View>
        <View style={styles.mealSummary}>
          {this.state.mealSummary.map((meal, i) => {
            console.log(meal);
            return (<Image style={styles.Image} source={{ uri: meal.image }} key={i} />);
          })}
        </View>
        <View style={styles.SecondContainer}>
          {images}
        </View>

        <View style={styles.NavigationBar}>
          <Button onPress={this.nav("Home")} title="Home" style={{ width: '100%' }} />
          <Button onPress={this.nav("Collection")} title="Collection" style={{ width: '100%' }} />
        </View>


      </View >

    );
  }
}

let Window = Dimensions.get('window');
const styles = StyleSheet.create({


  FirstContainer: {

    flexDirection: 'row',
    height: 180,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },

  SecondContainer: {

    flexDirection: 'row',
    height: 185,


  },


  dropzone: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  portionSize: {
    width: 80,
    height: 60,
    marginLeft: 10,
    flexDirection: 'column'
  },

  mealSummary: {
    height: 85,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'orange'
  },

  Image: {
    width: 60,
    height: 60,
    margin: 10
  },

  NavigationBar: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'red'
  },

  Add: {
    height: 20,
    width: 50,
    backgroundColor: 'black'
  }

});