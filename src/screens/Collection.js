// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet, 
  Image, 
  Button,
  ImageBackground } from 'react-native';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

// Components
import MealPreview from '../components/MealPreview'

// Functions
import { getNewMeal } from '../functions/getNewMeal';

class Collection extends Component {
  static navigationOptions = {
    title: 'Collection',
  }
  
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
    console.log(JSON.stringify(this.props.mealsAvailable));
    return (
      <View style={styles.mainContainer}>
        <View>
            <Image source={require('../assets/Background.png')} style={styles.backImage} />
        </View>
        <View style={styles.topContainer}>
          <View style={styles.leftSide}>
            <ImageBackground source={require('../assets/income.png')} style={styles.incomeImage}>
            <Text style={styles.incomeText}>${this.props.wallet.totalIncome ? this.props.wallet.totalIncome.toFixed(2) : 0}</Text>
            </ImageBackground>
          </View>
          <View style={styles.rightSide}>
            <ImageBackground source={require('../assets/money.png')} style={styles.moneyImage}>
              <Text style={styles.moneyText}>${this.props.wallet.Money}</Text>
            </ImageBackground>
          </View>
        </View>
        {this.state.selectedItem.name &&
          <MealPreview meal={this.state.selectedItem} parent={this} />
        }
        <ScrollView style={styles.SecondContainerScrollView}>
          <View style={styles.buyMealButton}>
            <TouchableOpacity style={styles.button} onPress={() => this.buyNewMeal()} >
                <Image source={require('../assets/buyMealButton.png')} style={styles.imageButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.SecondContainer}>
            {this.props.restaurants &&
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

  //The Whole Screen
  mainContainer:{
    flex:1,
  },

  backImage: {
    width: Dimensions.get('window').width,
    position: 'absolute',
  },

  //Income and Money

  topContainer: {
    width: wp('100%'),
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.1)'
  },
  leftSide: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneyImage: {
    width: 175,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeImage: {
    width: 175,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  moneyText: {
    color: 'black',
    paddingLeft: 30,
    fontWeight: 'bold',
  },
  incomeText: {
    color: 'black',
    paddingLeft: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  buyMealButton:{
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    zIndex: 10,
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

  //Holds the Meals
  SecondContainerScrollView: {
    position: 'relative',
    flexDirection: 'column',
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    margin: 10,
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
  },

  Image: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey'
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