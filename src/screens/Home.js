import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage, Text, Button, Alert, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import SelectableMenuTile from '../components/SelectableMenuTile';
import { selected } from '../config'
import RadioButtonsGroup from 'react-native-radio-buttons-group';



const foodItem = ["Build A Meal", "For this Restaurant", "And Increase Your Income"]

//AsyncStorage.setItem(selected.hotDogStand,JSON.stringify(foodItems))
//AsyncStorage.removeItem(selected.hotDogStand)
export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      income: 0.00,
      money: 0.00,
    }
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


  }
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }
  alert = (message) => () => {
    alert(`Continue playing to unlock this restaurant you must have an income of $${message.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
  }
  render() {
    const { income } = this.state
    return (

      <View>

        <View style={styles.TextWrapper}>
          <Text style={styles.Text}>Income: ${Number(this.state.income).toFixed(2)}</Text>
          <Text style={styles.Text}>Money: ${Number(this.state.money).toFixed(2)}</Text>
        </View>
        <View style={styles.navButt}>
          <Button onPress={this.nav("Collection")} title="Meal Collection" />
          <Button onPress={this.nav("Builder")} title="Meal Builder" />
        </View>
        <ScrollView scrollEnabled={true} showVerticalScrollIndicator={true} keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'true'}>
          <View>
            <Image source={require('../assets/Background.png')} style={styles.Image} />
          </View>
          <SelectableMenuTile
            title="Hot Dog Stand"
            rincome="Restaurant Income: $50,000.00"
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
const styles = StyleSheet.create({
  Text: {
    fontWeight: 'bold',
    fontSize: 21,
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    textAlign: 'center',
    padding: 5,


  },
  TextWrapper: {
    width: Dimensions.get('window').width,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  navButt:
  {
    zIndex: 10,
    width: '100%',
    backgroundColor: 'rgb(25,25,112)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 37,
    padding: 3,

  },
  Image:
  {
    height: 2025,
    width: Dimensions.get('window').width,
    position: 'absolute',
    resizeMode: 'cover',

  }



});
