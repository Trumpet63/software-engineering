// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image, Button } from 'react-native';

// Components
import MealPreview from '../components/MealPreview'

// Functions
import { getNewMeal } from '../functions/getNewMeal';

class Collection extends Component {
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
    };
  }

  availableToSelectedItem = (meal) => {
    this.setState({
      selectedItem: meal,
    });
  }

  buyNewMeal() {
    getNewMeal((meal) => {
      this.props.dispatch({
        type: 'AddNewMeal',
        payload: meal,
      })
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.selectedItem.name &&
          <MealPreview meal={this.state.selectedItem} parent={this} />
        }
        <ScrollView style={styles.SecondContainerScrollView}>
        <Button title='Buy A New Meal' onPress={() => this.buyNewMeal()} />
          <View style={styles.SecondContainer}>
            {
              this.props.restaurants.map((restaurant) => {
                return restaurant.Summary.map((summary, i) => {
                  return (
                    <TouchableOpacity style={styles.Image}
                      key={i}
                      onPress={() => (this.availableToSelectedItem(summary.meal))}>
                      <Image style={styles.Image}
                        source={{ uri: summary.meal.image }} />
                    </TouchableOpacity>
                  );
                })
              })
            }
            {
              this.props.mealsAvailable.map((meal, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.Image}
                    onPress={() => { this.availableToSelectedItem(meal) }} >
                    <Image style={styles.Image}
                      source={{ uri: meal.image }} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>
        <View style={styles.NavigationBar}>
          <Button style={{ position: 'absolute', bottom: 0, }} onPress={() => this.nav("Home")} title="Home" />
        </View>
      </View>
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
    height: 40,
    width: 30,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
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
    margin: 10,
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
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: Window.height,
    backgroundColor: 'white'
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

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Collection);