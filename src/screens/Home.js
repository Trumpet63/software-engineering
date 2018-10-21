import React, { Component } from 'react';
import { ScrollView,View,AsyncStorage,Text,Button,Alert, TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native';
import SelectableMenuTile from '../components/SelectableMenuTile';
import {selected} from '../config'



const foodItem=["Build A Meal","For this Restaurant", "And Increase Your Income"]

//AsyncStorage.setItem(selected.hotDogStand,JSON.stringify(foodItems))
//AsyncStorage.removeItem(selected.hotDogStand)
export default class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      income:0.00,
      money:0.00,
    }
  }
  async componentDidMount(){
    try{
    const data= await AsyncStorage.getItem(selected.hotDogStand)
    const data1= await AsyncStorage.getItem(selected.quickEats)
    const data2=await AsyncStorage.getItem(selected.fastFood)
    const data3=await AsyncStorage.getItem(selected.Italian)
    const data4=await AsyncStorage.getItem(selected.Mexican)
    const data5=await AsyncStorage.getItem(selected.Russian)
    const data6=await AsyncStorage.getItem(selected.American)
    const data7= await AsyncStorage.getItem(selected.Chinese)
    const data8=await AsyncStorage.getItem(selected.Hibachi)
    const data9=await AsyncStorage.getItem(selected.Thai)
    console.log(JSON.parse(data));
    this.setState({
      hotDogFoodItem: JSON.parse(data),
      quickEatsItem: JSON.parse(data1),
      fastFoodItem:JSON.parse(data2),
      italianFoodItem:JSON.parse(data3),
      mexicanFoodItem:JSON.parse(data4),
      russianFoodItem:JSON.parse(data5),
      americanFoodItem:JSON.parse(data6),
      chineseFoodItem:JSON.parse(data7),
      hibachiFoodItem:JSON.parse(data8),
      thaiFoodItem:JSON.parse(data9),
    })
  }
    catch(error){
      console.log(error);
    }
   

  }
  nav=(navroute)=>()=>{
    this.props.navigation.navigate(navroute);
  }
  alert=(message)=>()=>{
    alert(`Continue playing to unlock this restaurant you must have an income of $${message.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
  }
  render() {
    const{income}=this.state
    return (
      
      <View>
      
      <View style={styles.TextWrapper}>
      <Text style={styles.Text}>Income: ${Number(this.state.income).toFixed(2)}</Text>
      <Text style={styles.Text}>Money: ${Number(this.state.money).toFixed(2)}</Text>
      </View>
      <View style={styles.View}>
      <View style={[{width:100,height:100}]}>
      <Button 
      onPress={this.nav("Collection")} title="Meal Collection">
      </Button>
      </View>

      <View style={[{width:100,height:100}]}>
      <Button 
      onPress={this.nav("Builder")} title="Meal Builder">
      </Button>
      </View>
      </View>
      <ScrollView scrollEnabled={true} showVerticalScrollIndicator={true} keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'true'}>
      <View>
      <Image source={require('../assets/Background.png')} style={styles.Image}/>
      </View>
      <SelectableMenuTile
        title="Hot Dog Stand"
        rincome="Restaurant Income: $50,000.00"
        image={require('../assets/th.jpg')}
        nav={this.nav("Builder")}
        menuItem={this.state.hotDogFoodItem&&this.state.hotDogFoodItem||foodItem}
        />

      <SelectableMenuTile
        title="Quick Eats"
        rincome="Restaurant Income: $30,000.00"
        image={require('../assets/QuickEat.jpg')}
        nav={this.nav("Builder")}
        menuItem={this.state.quickEatsItem&&this.state.quickEatsItem||foodItem}
         />
    
      <SelectableMenuTile
        title="Sandy's Fast Food"
        over={income<20000&&require('../assets/LockApp.png')}
        rincome="Restaurant Income: $38,000.00"
        image={require('../assets/FastFood.jpg')}
        nav={income>20000?this.nav("Builder"):this.alert(20000)}
        menuItem={this.state.fastFoodItem&&this.state.fastFoodItem||foodItem} 
        />
      

      <SelectableMenuTile
        title="Pappi's Italian"
        over={income<30000&&require('../assets/LockApp.png')}
        rincome="Restaurant Income: $46,000.00"
        image={require('../assets/Italian.jpg')}
        nav={income>30000?this.nav("Builder"):this.alert(30000)}
        menuItem={this.state.italianFoodItem&&this.state.italianFoodItem||foodItem}/>

      <SelectableMenuTile
        title="Mexican Corner"
        over={income<40000&&require('../assets/LockApp.png')}
        rincome="Restaurant Income: $57,000.00"
        image={require('../assets/Mexican.jpg')}
        nav={income>40000?this.nav("Builder"):this.alert(40000)}
        menuItem={this.state.mexicanFoodItem&&this.state.mexicanFoodItem||foodItem} />

      <SelectableMenuTile
        title="Russian Bistro"
        over={income<50000&&require('../assets/LockApp.png')}
        rincome="Restaurant Income: $65,000.00"
        image={require('../assets/Russian.jpg')}
        nav={income>50000?this.nav("Builder"):this.alert(50000)}
        menuItem={this.state.russianFoodItem&&this.state.russianFoodItem||foodItem}/>

      <SelectableMenuTile
        title="American Kingdom"
        over={income<60000&&require('../assets/LockApp.png')}
        rincome="Restaurant Income: $59,000.00"
        image={require('../assets/American.jpg')}
        nav={income>60000?this.nav("Builder"):this.alert(60000)}
        menuItem={this.state.americanFoodItem&&this.state.americanFoodItem||foodItem}/>

      <SelectableMenuTile
        title="Chinese Buffet"
        over={income<70000&&require('../assets/LockApp.png')}
        rincome="Restaurant Income: $65,000.00"
        image={require('../assets/Buffet.jpg')}
        nav={income>70000?this.nav("Builder"):this.alert(70000)}
        menuItem={this.state.chineseFoodItem&&this.state.chineseFoodItem||foodItem} />

      <SelectableMenuTile
        title="Hibachi"
        over={income<80000&&require('../assets/LockApp.png')}
        rincome="Restaurant Income: $71,000.00"
        image={require('../assets/Hibachi.jpg')}
        nav={income>80000?this.nav("Builder"):this.alert(80000)}
        menuItem={this.state.hibachiFoodItem&&this.state.hibachiFoodItem||foodItem}/>

      <SelectableMenuTile
        title="Thyme Thai"
        over={income<90000&&require('../assets/LockApp.png')}
        rincome="Restaurant Income: $89,000.00"
        image={require('../assets/Thai.jpg')}
        nav={income>90000?this.nav("Builder"):this.alert(90000)} 
        menuItem={this.state.thaiFoodItem&&this.state.thaiFoodItem||foodItem}/>
        
      </ScrollView> 
      </View>
      
    )
  }

}
const styles=StyleSheet.create({
Text:{
  fontWeight:'bold',
  fontSize:21,
  color:'black',
  borderColor:'black',
  borderWidth:2,
  textAlign:'center',
  padding:5,


},
TextWrapper:{
  width:Dimensions.get('window').width,
  paddingLeft:10,
  paddingRight:10,
  flexDirection: 'row',
  alignItems:'center',
  justifyContent:'space-between',
},

Opacity:{
  color:'blue',
},
View:
{
  width:'100%',
  
  alignItems:'center',
  height:80,
  flexDirection:'row',
  justifyContent:'space-between',
  position:'absolute',
  bottom:5,
  
},
Image:
{
  height:2025,
  width:Dimensions.get('window').width,
  position:'absolute',
  resizeMode:'cover',

}



});
