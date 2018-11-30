// Modules
import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage, Text, Button, Alert, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

// Components
import SelectableMenuTile from '../components/SelectableMenuTile';

const foodItem = ["Build A Meal", "For this Restaurant", "And Increase Your Income"]

class Restaurants extends Component {
  static navigationOptions = {
    title: 'Restaurants',
  }

  componentWillUnMount() {
    rol();
  }

  componentDidMount() {
    loc(this);
  }

  nav(navroute) {
    this.props.navigation.navigate(navroute);
  }

  alert(message) {
    alert(`Continue playing to unlock this restaurant you must have an income of $${message.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
  }

  render() {
    const styles = StyleSheet.create({
      //Top of the screen locaiton of Money & Income
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
      Image: {
        width: Dimensions.get('window').width,
        position: 'absolute',
      },
      imageButton: {
        borderWidth: 1,
        borderRadius: 100,
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
    });

    return (
      <View>
        <View>
          <Image source={require('../assets/Background.png')} style={styles.Image} />
        </View>
        <View style={styles.topContainer}>
          <View style={styles.leftSide}>
            <ImageBackground source={require('../assets/income.png')} style={styles.incomeImage}>
            <Text style={styles.incomeText}>${this.props.wallet.totalIncome ? this.props.wallet.totalIncome.toFixed(2) : 0}</Text>
            </ImageBackground>
          </View>
          <View style={styles.rightSide}>
            <ImageBackground source={require('../assets/money.png')} style={styles.moneyImage}>
              <Text style={styles.moneyText}>${this.props.wallet.Money.value}</Text>
            </ImageBackground>
          </View>
        </View>
        <ScrollView scrollEnabled={true} showVerticalScrollIndicator={true} keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'true'}>
          {this.props.restaurants &&
            this.props.restaurants.map((restaurant, key) => {
              return (
                <SelectableMenuTile
                  key={key}
                  index={key}
                  title={restaurant.Title}
                  rincome={"Restaurant Income: $" + Number(restaurant.Income || 0).toFixed(2)}
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