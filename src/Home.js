import React, { Component } from 'react';
import { View, StyleSheet, AppRegistry, ScrollView, Image, Text,TouchableOpacity } from 'react-native';

export default class Home extends Component {
  nav=(navroute)=>()=>{
    this.props.navigation.navigate(navroute);
  }
  render() {
    return (
      <ScrollView scrollEnabled={true} showVerticalScrollIndicator={true} keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'true'}>
      <View>
        
        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <View>
         <Text style={styles.MainContainer}>Hot Dog Stand</Text>
         
        <Image
        style={styles.image}
        source={require('./th.jpg')}
        />
        </View>
        </TouchableOpacity>

         <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer}>Quick Eats</Text>
        <Image
        style={styles.image}
        source={require('./QuickEat.jpg')}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer}>Sandy's Fast Food</Text>
        <Image
        style={styles.image}
        source={require('./FastFood.jpg')}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer}>Pappi's Italian</Text>
        <Image
        style={styles.image}
        source={require('./Italian.jpg')}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer} >Mexican Corner</Text>
        <Image
        style={styles.image}
        source={require('./Mexican.jpg')}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer}>Russian Bistro</Text>
        <Image
        style={styles.image}
        source={require('./Russian.jpg')}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer} >American Kingdom</Text>
        <Image
        style={styles.image}
        source={require('./American.jpg')}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer}>Chinese Buffet</Text>
        <Image
        style={styles.image}
        source={require('./Buffet.jpg')}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer}>Hibachi</Text>
        <Image
        style={styles.image}
        source={require('./Hibachi.jpg')}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.nav("Builder")}>
        <Text style={styles.MainContainer}>Thyme Thai</Text>
        <Image
        style={styles.image}
        source={require('./Thai.jpg')}
        />
        </TouchableOpacity>
        
      </View>
      </ScrollView> 
      
    )
  }
}
const styles=StyleSheet.create({
  MainContainer:
  {
    textAlign:'center',
    marginTop:20,
    fontSize:25,
    fontWeight:'bold',
    fontFamily:'Cochin',
    color:'black',
   
  },
  image:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:20,
    marginLeft:40,
    width:200,
    height:160,
  }
 


});
