import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image, Button, AsyncStorage, Slider } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import getNewRecipe from '../functions/recipes';
import { selected } from '../config';
import { getAllMeals, getNewMeal, addMeal, removeMeal } from '../functions/meals';


export default class Builder extends Component {
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  constructor(props) {
    super(props);

    this.state = {
      percent: '100%',
      value: 1,
      text: '',
      button: '',
      selectedItem: {},
      mealSummary: [],
      mealsAvailable: [],
    };
  }

  componentDidMount() {
    getAllMeals('MEALS_AVAILABLE', (meals) => {
      if (meals != null) {
        this.setState({
          mealsAvailable: meals,
        });
      }
    });
    getAllMeals('MEALS_SUMMARY', (meals) => {
      if (meals != null) {
        this.setState({
          mealSummary: meals,
        });
      }
    });
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
          {
            name: this.state.selectedItem.name,
            image: this.state.selectedItem.image,
            calories: Math.round(this.state.selectedItem.calories * this.state.value),
            protein: Math.round(this.state.selectedItem.protein * this.state.value),
            sodium: Math.round(this.state.selectedItem.sodium * this.state.value),
            carbs: Math.round(this.state.selectedItem.carbs * this.state.value),
            value: this.state.value
          }
        ],
        mealsAvailable: this.state.mealsAvailable.filter((item) => { return item.name != this.state.selectedItem.name }),
        selectedItem: {},
        text: '',
        value: 1,
        percent: '100%'
      });
    }
    else {
      alert("Your meal summary is already full...");
    }
  }

  removeFromMealSummary = () => {
    this.setState({
      selectedItem: {},
      text: '',
      value: 1,
      percent: '100%'
    });

  }

  updateMealSummary = () => {
    this.state.mealSummary.splice(
      this.state.mealSummary.indexOf(
        this.state.selectedItem), 1, {
        name: this.state.selectedItem.name,
        image: this.state.selectedItem.image,
        calories: Math.round(this.state.selectedItem.calories * this.state.value),
        protein: Math.round(this.state.selectedItem.protein * this.state.value),
        sodium: Math.round(this.state.selectedItem.sodium * this.state.value),
        carbs: Math.round(this.state.selectedItem.carbs * this.state.value),
        value: this.state.value
      });
    this.setState({
      selectedItem: {},
      text: '',
      value: 1,
      percent: '100%'
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

  resetValues = (meal) => {
    this.setState({
      selectedItem: {
        name: meal.name,
        image: meal.image,
        calories: Math.round(meal.calories / meal.value),
        protein: Math.round(meal.protein / meal.value),
        sodium: Math.round(meal.sodium / meal.value),
        carbs: Math.round(meal.carbs / meal.value)
      },
      button: 'remove',
      text: 'Meal: ' + meal.name + '\n\n' +
        'Calories: ' + meal.calories + '\n' +
        'Protein: ' + meal.protein + '\n' +
        'Sodium: ' + meal.sodium + '\n' +
        'Carbs: ' + meal.carbs,
      value: meal.value,
      percent: Math.round(meal.value * 100) + '%'
    });
  }

  renderButton = () => {
    if (this.state.button == 'remove') {
      return (<View style={styles.URView}>
        <Button title='Remove' color='red' onPress={this.removeFromMealSummary} />
        <Button title='Update' onPress={this.updateMealSummary} />
      </View>);
    }

    else {
      return (<View style={styles.add_remove}>
        <Button title='Add' onPress={this.addToMealSummary} />
      </View>);
    }
  }

  updateNutrients(value) {
    this.setState({
      percent: Math.round(value * 100) + '%',
      text: 'Meal: ' + this.state.selectedItem.name + '\n\n' +
        'Calories: ' + Math.round(this.state.selectedItem.calories * value) + '\n' +
        'Protein: ' + Math.round(this.state.selectedItem.protein * value) + '\n' +
        'Sodium: ' + Math.round(this.state.selectedItem.sodium * value) + '\n' +
        'Carbs: ' + Math.round(this.state.selectedItem.carbs * value)
    })
  }

  render() {
    var images = [];

    this.state.mealsAvailable.map((meal, i) => {
      images.push(
        <TouchableOpacity
          key={i}
          style={styles.Image}
          onPress={() => (this.setState({
            selectedItem: meal,
            button: 'add',
            text: 'Meal: ' + meal.name + '\n\n' +
              'Calories: ' + meal.calories + '\n' +
              'Protein: ' + meal.protein + '\n' +
              'Sodium: ' + meal.sodium + '\n' +
              'Carbs: ' + meal.carbs,
            value: 1, percent: '100%'
          }))}>
          <Image style={styles.Image}
            source={{ uri: meal.image }} />
        </TouchableOpacity>
      );
    });

    return (
      <View>
        <View style={styles.NavigationBar}>
          <View style={[{ width: 100, height: 2 }]}>
            <Button onPress={this.nav("Home")} title="Home" />
          </View>
          <View style={[{ width: 100, height: 2 }]}>
            <Button onPress={this.nav("Collection")} title="Collection" />
          </View>
        </View>
        <Image source={this.state.clicked == "hotDog" && require('../assets/th.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "quickEats" && require('../assets/QuickEat.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "Sandy" && require('../assets/FastFood.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "Italian" && require('../assets/Italian.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "Mexican" && require('../assets/Mexican.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "Russian" && require('../assets/Russian.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "American" && require('../assets/American.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "Chinese" && require('../assets/Buffet.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "Hibachi" && require('../assets/Hibachi.jpg')} style={styles.Crazy} />
        <Image source={this.state.clicked == "Thai" && require('../assets/Thai.jpg')} style={styles.Crazy} />
        <View style={styles.FirstContainer}>
          <View style={styles.add_remove}>
            {this.renderButton()}
          </View>
          <View style={styles.reset}>
            <Button title='Reset' onPress={() => (this.setState({
              selectedItem: {}, mealSummary: [],
              text: '', value: 1, percent: '100%'
            }))} />
          </View>
          <View style={styles.dropzone}>
            <Image style={styles.Image}
              source={{ uri: this.state.selectedItem.image }} />
          </View>
          <View style={styles.portionControl}>
            <Text>{this.state.percent} </Text>
            <Slider minimumValue={0.5}
              maximumValue={1.5}
              value={this.state.value}
              step={0.1}
              onValueChange={(value) => this.updateNutrients(value)}
              onSlidingComplete={(value => this.setState({ value: value }))}
              style={{ width: 100 }}
            />
          </View>
          <View style={styles.liveDisplay}>
            <Text>
              {this.state.text}
            </Text>
          </View>
        </View>
        <View style={styles.mealSummary}>
          {this.state.mealSummary.map((meal, i) => {
            return (<TouchableOpacity style={styles.Image}
              key={i}
              onPress={() => (this.resetValues(meal))}>
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
                    onPress={() => { this.addToSelectedItem(meal, 'add'); }} >
                    <Image style={styles.Image}
                      source={{ uri: meal.image }} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>
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
    height: 100,
    width: 100,
    top: 0,
    left: 0
  },

  reset: {
    position: 'absolute',
    height: 50,
    width: 80,
    top: 0,
    right: 0
  },

  dropzone: {
    width: 80,
    height: 80,
    position: 'absolute',
    left: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 3,
    borderRadius: 1,
    borderColor: 'black',

  },

  portionControl: {
    position: 'absolute',
    bottom: 0,
    left: 40,
    width: 60,
    height: 60,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  liveDisplay: {
    height: 150,
    width: 200,
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: 'black',
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
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NavigationBar:
  {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0

  },

  URView:
  {
    width: 100,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  Crazy:
  {
    height: 512,
    width: Dimensions.get('window').width,
    position: 'absolute',
    resizeMode: 'cover',

  },

});