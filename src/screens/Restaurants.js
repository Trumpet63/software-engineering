// Modules
import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage, Text, Button, Alert, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

// Components
import SelectableMenuTile from '../components/SelectableMenuTile';

// Functions
import initRestaurantData from '../data/RestaurantData';

const foodItem = ["Build A Meal", "For this Restaurant", "And Increase Your Income"]

class Restaurants extends Component {
  componentWillUnMount() {
    rol();
  }

  async componentWillMount() {
    try {
      var restaurants = await AsyncStorage.getItem('RESTAURANTS')
      if (!restaurants) {
        restaurants = initRestaurantData;
      }
      else {
        restaurants = JSON.parse(restaurants);
        console.log(restaurants);
      }
      this.setState({
        restaurants: restaurants,
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    loc(this);
  }

  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  alert = (message) => () => {
    alert(`Continue playing to unlock this restaurant you must have an income of $${message.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
  }

  render() {
    const styles = StyleSheet.create({
      //Top of the screen locaiton of Money & Income
      topContainer: {
        width: wp('100%'),
        height: hp('8%'),
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
      },
      rightSide: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      incomeImage: {
      },
      Text: {
        fontWeight: 'bold',
        fontSize: 21,
        color: 'black',
        textAlign: 'center',
        padding: 5,
      },
      //Bottom of Screen
      navButt: {
        zIndex: 10,
        width: wp('100%'),
        height: hp('8%'),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        bottom: 37,
      },
      leftNav: {
        flex: 2,
        paddingLeft: 2,
        justifyContent: 'center',
      },
      rightNav: {
      },
      Image: {
        width: Dimensions.get('window').width,
        position: 'absolute',
      }
    });

    return (
      <View>
        <View>
          <Image source={require('../assets/Background.png')} style={styles.Image} />
        </View>
        <View style={styles.topContainer}>
          <View style={styles.leftSide}>
            <Image source={require('../assets/income.png')} style={styles.incomeImage} />
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../assets/money.png')} style={styles.moneyImage} />
          </View>
        </View>
        <View style={styles.navButt}>
          <View style={styles.leftNav}>
            <Button onPress={() => this.nav("Collection")} title="Meal Collection" />
          </View>
          <View style={styles.rightNav}>
            <Button onPress={() => this.nav("Builder")} title="Meal Builder" />
          </View>
        </View>
        <ScrollView scrollEnabled={true} showVerticalScrollIndicator={true} keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'true'}>
          {this.props.restaurants &&
            this.props.restaurants.map((restaurant, key) => {
              return (
                <SelectableMenuTile
                  key={key}
                  title={restaurant.Title}
                  rincome={"Restaurant Income: $" + Number(restaurant.Income || 0).toFixed(2)}
                  image={"../assets/" + restaurant.Image}
                  restaurant={restaurant}
                />
              );
            })
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Restaurants);