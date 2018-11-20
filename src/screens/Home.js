import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage, Text, Button, Alert, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import SelectableMenuTile from '../components/SelectableMenuTile';
import { selected } from '../config'
import { widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange as loc,
  removeOrientationListener as rol } from 'react-native-responsive-screen';

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      income: 0.00,
      money: 0.00,
    }
  }
  componentWillUnMount() {
    rol();
}
  async componentDidMount() {
    loc(this);
  }
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
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
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
      },

      moneyImage:{
      },

      rightSide:{
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
      },

      incomeImage:{

      },

      Text: {
        fontWeight: 'bold',
        fontSize: 21,
        color: 'black',
        textAlign: 'center',
        padding: 5,
    
    
      },
    
      //Bottom of Screen
      navButt:{
        zIndex: 10,
        width: wp('100%'),
        height: hp('8%'),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        bottom: 37,
    
      },
      leftNav:{
        flex:2,
        paddingLeft: 2,
        justifyContent: 'center',
      },
      rightNav: {
        
      },
      Image:
      {
        width: Dimensions.get('window').width,
        position: 'absolute',
    
      }
    
    
    
    });
    const { income } = this.state
    return (
        <View>
            <View>
              <Image source={require('../assets/Background.png')} style={styles.Image} />
            </View>
          <View style={styles.topContainer}>
            <View style={styles.leftSide}>
              <Image source={require('../assets/income.png')} style={styles.incomeImage}/>
            </View>
            <View style={styles.rightSide}>
            <Image source={require('../assets/money.png')} style={styles.moneyImage}/>
            </View>
          </View>
          <View style={styles.navButt}>
            <View style={styles.leftNav}>
              <Button onPress={this.nav("Resturants")} title="Resturants" />
            </View>
          </View>
        </View>

    )
  }

}
