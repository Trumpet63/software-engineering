import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image, Button, AsyncStorage, Slider } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import getNewRecipe from '../functions/recipes';
import { selected } from '../config';

export default class Builder extends Component {
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  constructor(props) {
    super(props);

    this.state = {
      button: '',
      selectedItem: {},
      mealSummary: [],
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
      ],

      mealsAvailable: [
        recipe1 = {
          name: 'Herbed Haricots Verts',
          image: 'http://lh3.ggpht.com/L6mfpqHtlXaY_Kx1jtDc-jGTZEAQeIuKhNhY1JgAxbWlXgFbZ2DxycB4noKXbMuQXCciWw-dbL9PlRf9aWLkvg=s180'
        },

        recipe2 = {
          name: '7 Ways To Pimp Your Pimms Cup',
          image: 'https://lh3.googleusercontent.com/uIBcO9xE4iP7OI6FQNdJU3oGEoNmJ2NjoWOfhnSSRyImwAO-xcRx-vSLjQrJjKwDq0uyv12Iu-xlbxr8EwBHPA=s180'
        },

        recipe3 = {
          name: 'Cinnamon Honey Butter',
          image: 'https://lh3.googleusercontent.com/qWD1PzmtY_Q_yaAAnS6WMKZ2vDV9dHg0TIzET-DkrN5AQJVAPtWepRn3aFc7OS5Bn5nAxVT40ZEEzSTMD4XQgg=s180'
        },

        recipe4 = {
          name: 'Keto Spaghetti Squash Au Gratin',
          image: 'http://lh3.googleusercontent.com/-eO6Fi2BrQHCIMQm0IQpvG5Z7ssaIogDodLWhdubtM7-QfGyCu4IleK0mfxjaHuvvsqfgnyS1mjt63iChzkcxw=s180'
        },

        recipe5 = {
          name: 'Peanut Butter and Jelly Puffs',
          image: 'https://lh3.googleusercontent.com/EtSnU_SpAPeRYIn1uaEPR68vO96LfxhEfOBRI2cz8hE7N7uEImruvetUUSNqJPsBw3-Wpy6Z93ncNY3HhKY7tA=s180'
        }]
    };

    /*for (var i = 0; i < 5; i++) {
      getNewRecipe((result) => {
        this.setState({
          mealsAvailable: [
            ...this.state.mealsAvailable,
            result,
          ],
        });
      });
    }*/
  }

  async componentDidMount() {
    try {
      const data = await AsyncStorage.getItem(selected.clicked)
      console.log(JSON.parse(data));
      this.setState({
        clicked: JSON.parse(data),
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  addToSelectedItem = (meal, action) => {
    this.setState({
      selectedItem: meal,
      button: action,
    });
  }

  addToMealSummary = () => {
    if (this.state.mealSummary.length < 3) {
      this.setState({
        mealSummary: [
          ...this.state.mealSummary,
          this.state.selectedItem,
        ],
        mealsAvailable: this.state.mealsAvailable.filter((item) => { return item.name != this.state.selectedItem.name }),
        selectedItem: {},
      });
    }
    else {
      alert("Your meal summary is already full...");
    }
  }

  removeFromMealSummary = () => {
    this.setState({
      mealsAvailable: [
        this.state.selectedItem,
        ...this.state.mealsAvailable,
      ],
      mealSummary: this.state.mealSummary.filter((item) => { return item.name != this.state.selectedItem.name }),
      selectedItem: {},
    });
  }

  resetMealSummary = () => {
    this.setState({
      mealsAvailable: [
        ...this.state.mealSummary,
        ...this.state.mealsAvailable,
      ],
      mealSummary: [],
      selectedItem: {},
    });
  }

  renderButton = () => {
    if (this.state.button == 'remove')
      return (<Button title='Remove' onPress={this.removeFromMealSummary} />);
    else
      return (<Button title='Add' onPress={this.addToMealSummary} />);
  }

  render() {
    return (
      <View style={styles.BuilderContainer}>
        <Image source={require('../assets/th.jpg')} style={styles.Crazy} />
        <View style={styles.FirstContainer}>
          <View style={styles.add_remove}>
            {this.renderButton()}
          </View>
          <View style={styles.reset}>
            <Button title='Reset' onPress={this.resetMealSummary} />
          </View>
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
            return (<TouchableOpacity style={styles.Image}
              key={i}
              onPress={() => {this.addToSelectedItem(meal, 'remove');}}>
              <Image style={styles.Image}
                source={{ uri: meal.image }} />
            </TouchableOpacity>);
          })}
        </View>
        <ScrollView style={styles.SecondContainerScrollView}>
          <View style={styles.SecondContainer}>
            {
              this.state.mealsAvailable.map((meal, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.Image}
                    onPress={() => {this.addToSelectedItem(meal, 'add');}} >
                    <Image style={styles.Image}
                      source={{ uri: meal.image }} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>

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
  BuilderContainer: {
  },

  FirstContainer: {
    flexDirection: 'row',
    height: '40%',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderWidth: 1
  },

  SecondContainerScrollView: {
    position: 'relative',
    flexDirection: 'column',
    height: '30%',
    backgroundColor: 'lightblue',
    margin: 10,
    borderWidth: 1,
  },

  SecondContainer: {
    flexDirection: 'row',
    margin: 10,
    flexWrap: 'wrap',
    position: 'relative',
    //overflow: 'hidden',
  },

  add_remove: {
    position: 'absolute',
    height: 10,
    width: 80,
    top: 0,
    left: 0
  },

  reset: {
    position: 'absolute',
    height: 10,
    width: 80,
    top: 0,
    right: 0
  },

  dropzone: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "dashed",
    borderWidth: 3
  },

  portionSize: {
    width: 80,
    height: 60,
    marginLeft: 10,
    flexDirection: 'column'
  },

  mealSummary: {
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'blue',
    borderWidth: 3
  },

  Image: {
    width: 80,
    height: 80,
    margin: 5
  },

  NavigationBar: {
    width: '100%',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0
  },
  Crazy:
  {
    height: 512,
    width: Dimensions.get('window').width,
    position: 'absolute',
    resizeMode: 'cover',

  },

});