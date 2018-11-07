import React, { Component } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getAllMeals, getNewMeal, addMeal, removeMeal } from '../functions/meals';

export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
    }
  }

  componentDidMount() {
    getAllMeals('MEALS_AVAILABLE', (meals) => {
      if (meals != null) {
        this.setState({
          meals: meals,
        });
      }
    });
  }

  displayMeal = (meal) => {
    console.log(JSON.stringify(meal));
  }

  buyMeal = () => {
    getNewMeal((meal) => {
      if (meal != null) {
        this.setState({
          meals: [
            meal,
            ...this.state.meals,
          ],
        });
      }
      console.log(meal);
    });
  }

  render() {
    return (
      <View style={styles.CollectionContainer}>
        <Button onPress={this.buyMeal} title="Buy New Meal" />
        <Text style={styles.Text}>Collections</Text>
        <ScrollView style={styles.contentContainer}>
          <View>
            <Text>{this.state.textValue}</Text>
          </View>
        </ScrollView>
        <ScrollView showVerticalScrollIndicator={true} style={styles.ScrollViewOutter}>
          <View style={styles.ScrollViewInner}>
            {
              this.state.meals.map((meal, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => (this.displayMeal(meal))}
                    style={styles.Image}
                    key={index}>
                    <Image style={styles.Image}
                      source={{ uri: meal.image }}
                    />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>
        <View style={styles.NavigationBar}>
          <Button onPress={() => this.props.navigation.navigate('Home')} title="Home" />
          <Button onPress={() => this.props.navigation.navigate('Builder')} title="Meal Builder" />
        </View>
      </View>
    )
  }
}

const styles = {
  CollectionContainer: {
    flex: 1,
  },
  contentContainer: {
    height: 200,
    backgroundColor: 'lightgray'
  },
  ScrollViewOutter: {
    height: 225,
    alignSelf: 'flex-start',
    position: 'relative',
    flexDirection: 'column',
  },
  ScrollViewInner: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  Image: {
    margin: 10,
    width: 50,
    height: 50,
  },
  NavigationBar: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    justifyContent: 'space-between'
  }
}