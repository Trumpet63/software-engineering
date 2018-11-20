import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage, Text, Button, Alert, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import SelectableMenuTile from '../components/SelectableMenuTile';
import { selected } from '../config'
import { widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange as loc,
  removeOrientationListener as rol } from 'react-native-responsive-screen';



const foodItem = ["Build A Meal", "For this Restaurant", "And Increase Your Income"]

//AsyncStorage.setItem(selected.hotDogStand,JSON.stringify(foodItems))
//AsyncStorage.removeItem(selected.hotDogStand)
export default class Resturants extends Component {

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
    try {
      const data = await AsyncStorage.getItem(selected.hotDogStand)
      const data1 = await AsyncStorage.getItem(selected.quickEats)
      const data2 = await AsyncStorage.getItem(selected.fastFood)
      const data3 = await AsyncStorage.getItem(selected.Italian)
      const data4 = await AsyncStorage.getItem(selected.Mexican)
      const data5 = await AsyncStorage.getItem(selected.Russian)
      const data6 = await AsyncStorage.getItem(selected.American)
      const data7 = await AsyncStorage.getItem(selected.Chinese)
      const data8 = await AsyncStorage.getItem(selected.Hibachi)
      const data9 = await AsyncStorage.getItem(selected.Thai)
      console.log(JSON.parse(data));
      this.setState({
        hotDogFoodItem: JSON.parse(data),
        quickEatsItem: JSON.parse(data1),
        fastFoodItem: JSON.parse(data2),
        italianFoodItem: JSON.parse(data3),
        mexicanFoodItem: JSON.parse(data4),
        russianFoodItem: JSON.parse(data5),
        americanFoodItem: JSON.parse(data6),
        chineseFoodItem: JSON.parse(data7),
        hibachiFoodItem: JSON.parse(data8),
        thaiFoodItem: JSON.parse(data9),
      })
    }
    catch (error) {
      console.log(error);
    }
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
              <Button onPress={this.nav("Collection")} title="Meal Collection" />
            </View>
            <View style={styles.rightNav}>
              <Button onPress={this.nav("Builder")} title="Meal Builder" />
            </View>
          </View>
          <ScrollView scrollEnabled={true} showVerticalScrollIndicator={true} keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'true'}>
            <SelectableMenuTile
              title="Hot Dog Stand"
              rincome="Restaurant Income: $8,000.00"
              image={require('../assets/th.jpg')}
              nav={this.nav("Builder")}
              onPress={() => (AsyncStorage.setItem(selected.clicked, JSON.stringify(hotDog)))}
              menuItem={this.state.hotDogFoodItem && this.state.hotDogFoodItem || foodItem}
            />

            <SelectableMenuTile
              title="Quick Eats"
              over={income < 5000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $30,000.00"
              image={require('../assets/QuickEat.jpg')}
              nav={income > 5000 ? this.nav("Builder") : this.alert(5000)}
              menuItem={this.state.quickEatsItem && this.state.quickEatsItem || foodItem}
            />

            <SelectableMenuTile
              title="Sandy's Fast Food"
              over={income < 220000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $38,000.00"
              image={require('../assets/FastFood.jpg')}
              nav={income > 220000 ? this.nav("Builder") : this.alert(220000)}
              menuItem={this.state.fastFoodItem && this.state.fastFoodItem || foodItem}
            />


            <SelectableMenuTile
              title="Pappi's Italian"
              over={income < 1179000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $46,000.00"
              image={require('../assets/Italian.jpg')}
              nav={income > 1179000 ? this.nav("Builder") : this.alert(1179000)}
              menuItem={this.state.italianFoodItem && this.state.italianFoodItem || foodItem} />

            <SelectableMenuTile
              title="Mexican Corner"
              over={income < 2881000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $57,000.00"
              image={require('../assets/Mexican.jpg')}
              nav={income > 2881000 ? this.nav("Builder") : this.alert(2881000)}
              menuItem={this.state.mexicanFoodItem && this.state.mexicanFoodItem || foodItem} />

            <SelectableMenuTile
              title="Russian Bistro"
              over={income < 5327000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $65,000.00"
              image={require('../assets/Russian.jpg')}
              nav={income > 5327000 ? this.nav("Builder") : this.alert(5327000)}
              menuItem={this.state.russianFoodItem && this.state.russianFoodItem || foodItem} />

            <SelectableMenuTile
              title="American Kingdom"
              over={income < 8517000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $59,000.00"
              image={require('../assets/American.jpg')}
              nav={income > 8517000 ? this.nav("Builder") : this.alert(8517000)}
              menuItem={this.state.americanFoodItem && this.state.americanFoodItem || foodItem} />

            <SelectableMenuTile
              title="Chinese Buffet"
              over={income < 12450000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $65,000.00"
              image={require('../assets/Buffet.jpg')}
              nav={income > 12450000 ? this.nav("Builder") : this.alert(12450000)}
              menuItem={this.state.chineseFoodItem && this.state.chineseFoodItem || foodItem} />

            <SelectableMenuTile
              title="Hibachi"
              over={income < 17126000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $71,000.00"
              image={require('../assets/Hibachi.jpg')}
              nav={income > 17126000 ? this.nav("Builder") : this.alert(17126000)}
              menuItem={this.state.hibachiFoodItem && this.state.hibachiFoodItem || foodItem} />

            <SelectableMenuTile
              title="Thyme Thai"
              over={income < 22546000 && require('../assets/LockApp.png')}
              rincome="Restaurant Income: $89,000.00"
              image={require('../assets/Thai.jpg')}
              nav={income > 22546000 ? this.nav("Builder") : this.alert(22546000)}
              menuItem={this.state.thaiFoodItem && this.state.thaiFoodItem || foodItem} />

          </ScrollView>
        </View>

    )
  }

}
