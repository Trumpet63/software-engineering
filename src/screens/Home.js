import React, { Component } from 'react';
import { ScrollView,View,Text,Button, TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import SelectableMenuTile from '../components/SelectableMenuTile';


const foodItems = ["Hot Dogs", "French Fries", "Hamburger"]
const foodItems2=["Potatoe Chips","Snickers Bar", "Prepped Salad"]
const foodItems3=["Hamburger","Chicken Nuggets","Milkshake"]
const foodItems4=["Chicken Alfredo","Spaghetti Marinara","Eggplant Parmesan"]
const foodItems5=["Nachos","Tortilla Salad","Buritto Deluxe"]
const foodItems6=["Dumplings","Borsche","Kotlets"]
const foodItems7=["Perfect Hamburger","Cole Slaw"," Fresh Cut French Fries"]
const foodItems8=["Crab Rangoon", "Egg Rolls","Beef Stir Fry"]
const foodItems9=["Fried Chicken Rice", "Fried Beef Rice", "Alaskian Roll"]
const foodItems10=["Red Curry Chicken", "Duck Curry", "Fresh Spring Rolls"]


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      income:0.00,
      money:0.00,
    }
  }
  nav=(navroute)=>()=>{
    this.props.navigation.navigate(navroute);
  }
  render() {
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

      
      <SelectableMenuTile
        title="Hot Dog Stand"
        rincome="Restaurant Income: $50,000.00"
        image={require('../assets/th.jpg')}
        nav={this.nav("Builder")}
        menuItem={foodItems}
        />

      <SelectableMenuTile
        title="Quick Eats"
        rincome="Restaurant Income: $30,000.00"
        image={require('../assets/QuickEat.jpg')}
        nav={this.nav("Builder")}
        menuItem={foodItems2} />

      <SelectableMenuTile
        title="Sandy's Fast Food"
        over={require('../assets/LockApp.png')}
        rincome="Restaurant Income: $38,000.00"
        image={require('../assets/FastFood.jpg')}
        nav={this.nav("Builder")}
        menuItem={foodItems3} />

      <SelectableMenuTile
        title="Pappi's Italian"
        over={require('../assets/LockApp.png')}
        rincome="Restaurant Income: $46,000.00"
        image={require('../assets/Italian.jpg')}
        nav={this.nav("Builder")}
        menuItem={foodItems4}/>

      <SelectableMenuTile
        title="Mexican Corner"
        over={require('../assets/LockApp.png')}
        rincome="Restaurant Income: $57,000.00"
        image={require('../assets/Mexican.jpg')}
        nav={this.nav("Builder")}
        menuItem={foodItems5} />

      <SelectableMenuTile
        title="Russian Bistro"
        over={require('../assets/LockApp.png')}
        rincome="Restaurant Income: $65,000.00"
        image={require('../assets/Russian.jpg')}
        nav={this.nav("Builder")} 
        menuItem={foodItems6}/>

      <SelectableMenuTile
        title="American Kingdom"
        over={require('../assets/LockApp.png')}
        rincome="Restaurant Income: $59,000.00"
        image={require('../assets/American.jpg')}
        nav={this.nav("Builder")} 
        menuItem={foodItems7}/>

      <SelectableMenuTile
        title="Chinese Buffet"
        over={require('../assets/LockApp.png')}
        rincome="Restaurant Income: $65,000.00"
        image={require('../assets/Buffet.jpg')}
        nav={this.nav("Builder")}
        menuItem={foodItems8} />

      <SelectableMenuTile
        title="Hibachi"
        over={require('../assets/LockApp.png')}
        rincome="Restaurant Income: $71,000.00"
        image={require('../assets/Hibachi.jpg')}
        nav={this.nav("Builder")} 
        menuItem={foodItems9}/>

      <SelectableMenuTile
        title="Thyme Thai"
        over={require('../assets/LockApp.png')}
        rincome="Restaurant Income: $89,000.00"
        image={require('../assets/Thai.jpg')}
        nav={this.nav("Builder")} 
        menuItem={foodItems10}/>
        
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



});
