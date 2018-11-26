// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image, Button, AsyncStorage, Alert, Slider, } from 'react-native';

// Components
import SummaryEditor from '../components/SummaryEditor'

// Functions
import { getAllMeals, getNewMeal, addMeal, removeMeal } from '../functions/meals';

class Builder extends Component {
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: 1,
      button: '',
      selectedItem: {},
    };

    this.rkey = props.selectedRestaurant || 0;
    console.log('selected rest', this.rkey);
  }

  availableToSelectedItem = (meal, action) => {
    this.setState({
      selectedItem: { meal: meal, value: 1 },
      button: action,
      value: 1,
    });
  }

  summaryToSelectedItem = (SummaryObject, action) => {
    this.setState({
      selectedItem: SummaryObject,
      button: action,
      value: SummaryObject.value,
    });
  }

  resetMealSummary = () => {
    this.props.dispatch({
      type: 'ClearSummary',
      Restaurant: this.props.restaurants[this.rkey],
    });
    this.setState({
      selectedItem: {},
    });
  }

  render() {
    if (!this.props.restaurants[this.rkey])
      return (<View />);
    return (
      <View style={{ flex: 1 }}>
        <Text>{this.props.restaurants[this.rkey].Title}</Text>
        {this.state.selectedItem.meal &&
          <SummaryEditor
            summaryObject={this.state.selectedItem}
            buttonType={this.state.button}
            parent={this} />}
        <View style={styles.mealSummary}>
          <View style={styles.reset}>
            <Button color='red' title='X'
              onPress={() => Alert.alert('Alert', 'Are you sure you want to reset meals?', [
                { text: 'No' },
                { text: 'Yes', onPress: () => { this.resetMealSummary() } }
              ])} />
          </View>
          {this.props.restaurants[this.rkey].Summary.map((summary, i) => {
            return (<TouchableOpacity style={styles.Image}
              key={i}
              onPress={() => (this.summaryToSelectedItem(summary, 'remove'))}>
              <Image style={styles.Image}
                source={{ uri: summary.meal.image }} />
            </TouchableOpacity>);
          })}
        </View>
        <ScrollView style={styles.SecondContainerScrollView}>
          <View style={styles.SecondContainer}>
            {
              this.props.mealsAvailable.map((meal, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.Image}
                    onPress={() => { this.availableToSelectedItem(meal, 'add') }} >
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
          <Button style={{ position: 'absolute', bottom: 0, }} onPress={() => this.nav("Collection")} title="Collection" />
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

export default connect(mapStateToProps)(Builder);