import React, { Component } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native';

 export default class Collection extends Component {

  constructor(){
    super();
    this.state = {
        textValue:''
    }
}

/*onPress = () => {
  this.setState({
      textValue: "Nutritional Facts"
  })
}*/

  render() {
    return (
      
   <View>
     
        <Text style={styles.Text}>Collections</Text>


        <ScrollView contentContainerStyle={styles.contentContainer}>

            <Text>{this.state.textValue}</Text>
        </ScrollView>

      <ScrollView contentContainerStyle={styles.contentContainer2}>

        <TouchableOpacity onPress={()=>(this.setState({textValue: "1"}))}>
              <Image style={{margin: 10, width: 50, height: 50}}
                     source={require('../assets/th.jpg')}
              />
          </TouchableOpacity>

        <TouchableOpacity onPress={()=>(this.setState({textValue: "2"}))}>
              <Image style={{margin: 10, width: 50, height: 50}}
                     source={require('../assets/th.jpg')}
              />
          </TouchableOpacity>

      </ScrollView> 

      <View style={styles.NavigationBar}>
        <Button onPress={() => this.props.navigation.navigate('Home')} title="Home"/>
        <Button onPress={()=>this.props.navigation.navigate('Builder')} title="Meal Builder"/>
      
      </View>  
     
    </View>
    )

  }

}

const styles=StyleSheet.create({
  contentContainer: {
    width: "100%" ,
    height: 200 ,
    justifyContent: "center",
    alignItems: "center" ,
    backgroundColor: 'lightgray'
    },

    contentContainer2: {
      flexDirection: 'row',
      margin: 10,
      height: 225
    },

    Text: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    },

    NavigationBar: {
      flexDirection:'row',
      height: 100,
      width: '100%',
      justifyContent: 'space-between'
    }
    
  });
