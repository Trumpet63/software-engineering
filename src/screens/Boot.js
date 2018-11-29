// Modules
import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

// Data Functions
import RestaurantData from '../data/RestaurantData';
import MealsAvailableData from '../data/MealsAvailableData';
import emptyWallet from '../data/emptyWallet';

class Boot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: false,
    }
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.setState({ timer: true, });
      clearInterval(this._interval);
    }, 2000);
  }

  componentWillMount() {
    AsyncStorage.getItem('WALLET').then((results) => {
      if (results == null) {
        var wallet = emptyWallet;
        AsyncStorage.setItem('WALLET', JSON.stringify(wallet));
      }
      else {
        var wallet = JSON.parse(results);
      }
      this.props.dispatch({
        type: 'SetWallet',
        payload: wallet,
      });
      console.log('wallet set');
    });

    AsyncStorage.getItem('RESTAURANTS').then((results) => {
      if (results == null) {
        var restaurants = RestaurantData;
        AsyncStorage.setItem('RESTAURANTS', JSON.stringify(restaurants));
      }
      else {
        var restaurants = JSON.parse(results);
      }
      this.props.dispatch({
        type: 'SetRestaurants',
        payload: restaurants,
      });
      console.log('restaurant set');
    });

    AsyncStorage.getItem('MEALS_AVAILABLE').then((results) => {
      if (results == null) {
        var meals = MealsAvailableData;
        AsyncStorage.setItem('MEALS_AVAILABLE', JSON.stringify(meals));
      }
      else {
        var meals = JSON.parse(results);
      }
      this.props.dispatch({
        type: 'SetMealsAvailable',
        payload: meals,
      });
      console.log('meals available set');
    });

    console.log('navigation set');
    console.log('Boot Load Complete', this.props);
  }

  componentDidUpdate() {
    if (this.state.timer && this.props.wallet && this.props.restaurants && this.props.mealsAvailable && this.props.navigation)
      this.nav('Home');
  }

  nav(target) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);

    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/loading.gif')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Boot);