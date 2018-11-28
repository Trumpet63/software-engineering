// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  }
  
  componentWillUnMount() {
    rol();
  }

  async componentDidMount() {
    loc(this);
  }

  nav = (navroute) => {
    this.props.navigation.navigate(navroute);
  }

  render() {
    const styles = StyleSheet.create({
      mainContainer: {

      },
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
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      //Bottom of Screen
      navButt: {
        width: wp('100%'),
        height: hp('15%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: -410,
        padding: 10,
      },
      Image: {
        width: Dimensions.get('window').width,
        position: 'absolute',
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
      },
      imageButton: {
        alignItems: 'center',
        justifyContent: 'center',
      }
    });

    return (
      <View style={styles.mainContainer}>
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
              <Text style={styles.moneyText}>{this.props.wallet.Money}</Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.navButt}>
          <TouchableOpacity style={styles.button} onPress={() => this.nav("Restaurants")} title="Restaurants" >
            <Image source={require('../assets/resturantsButton.png')} style={styles.imageButton} />
            <Text style={styles.buttonText}>Resturants</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.nav("Builder")} title="Builder" >
            <Image source={require('../assets/builderButton.png')} style={styles.imageButton} />
            <Text style={styles.buttonText}>Meal Builder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.nav("Collection")} title="Collection" >
            <Image source={require('../assets/foodCollectionButton.png')} style={styles.imageButton} />
            <Text style={styles.buttonText}>Food Collection</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Home);