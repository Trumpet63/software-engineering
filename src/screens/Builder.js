import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image, Button, AsyncStorage, Alert, Slider, } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import getNewRecipe from '../functions/recipes';
import { selected } from '../config';
import { getAllMeals, getNewMeal, addMeal, removeMeal } from '../functions/meals';
import SummaryEditor from '../components/SummaryEditor'

export default class Builder extends Component {
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  constructor(props) {
    super(props);
    //const clicked = this.props.navigation.getParam("clicked");
    this.state = {
      text: '',
      value: 1,
      button: '',
      selectedItem: {},
      mealSummary: [],
      mealsAvailable: [
        recipe1 = {
          name: 'Make Your Own Italian Bread',
          image: "https://lh3.googleusercontent.com/n5Vt0L4MhPBq_G_oj0v6iCYWz-iHsZaxpv-pATDU2syb7sZkZfULF6HS_F6xP0ZHyJhVx3Ecf5NN3qpB6PmM=s180",
          calories: 234,
          protein: 23,
          sodium: 12,
          carbs: 34
        },

        recipe2 = {
          name: "Herbed Haricots Verts",
          image: "http://lh3.ggpht.com/Y24XxpLghbSeCxPvEtp8Z2YMtnEppWU_kTLRNbET1s7U0_cgRC39JLt5iq3rHMyVLjN7DdfCeuARCqEdBlsmRTo=s180",
          calories: 234,
          protein: 23,
          sodium: 12,
          carbs: 34

        }
      ],
    };
  }

    /*getAllMeals('MEALS_AVAILABLE', (result) => {
      this.setState({
        mealsAvailable: [
          ...this.state.mealsAvailable,
          result,
        ],
      });
    });*/
  }

  // async componentDidMount() {
  //try {
  // const data = await AsyncStorage.getItem(selected.clicked)
  //console.log(JSON.parse(data));
  //this.setState({
  // clicked: JSON.parse(data),
  //})
  //}
  //catch (error) {
  // console.log(error);
  //}
  //}

  availableToSelectedItem = (meal, action) => {
    this.setState({
      selectedItem: meal,
      button: action,
      value: 1,
    });
  }

  summaryToSelectedItem = (meal, action) => {
    this.setState({
      selectedItem: meal.meal,
      button: action,
      value: meal.value,
    });
  }

  addToMealSummary = () => {
    if(this.state.selectedItem.name != null){
    if (this.state.mealSummary.length < 3) {
      this.setState({
        mealSummary: [
          ...this.state.mealSummary,
          {
            meal: this.state.selectedItem,
            value: this.state.value
          }
        ],
        mealsAvailable: this.state.mealsAvailable.filter((item) => { return item.name != this.state.selectedItem.name }),
        selectedItem: {},
        text: '',
        value: 1,
      });
    }
    else {
      alert("Your meal summary is already full...");
    }
  }
}

  removeFromMealSummary = () => {
    if(this.state.selectedItem.name != null){
    this.setState({
      selectedItem: {},
      value: 1,
      mealsAvailable: [
        this.state.selectedItem,
        ...this.state.mealsAvailable,
      ],
      mealSummary: this.state.mealSummary.filter((item) => { return item.meal.name != this.state.selectedItem.name }),
    });
   }
  }

  updateMealSummary = () => {
    this.state.mealSummary.splice(
      this.state.mealSummary.indexOf(
        this.state.selectedItem), 1, {
        meal: this.state.selectedItem,
        value: this.state.value
      });
    this.setState({
      selectedItem: {},
      value: 1,
    });
  }

  resetMealSummary = () => {
    var temp = this.state.mealSummary.map((obj) => {
      return (obj.meal);
    });
    this.setState({
      mealsAvailable: [
        ...temp,
        ...this.state.mealsAvailable,
      ],
      mealSummary: [],
      selectedItem: {},
    });
  }
  
  renderDisplay = () => {
    if(this.state.selectedItem.name != null){
      return(
        <View style={styles.FirstContainer}>
          <View style={styles.add_remove}>
            {this.renderButton()}
          </View>
          <View style={styles.dropzone}>
            <Image style={styles.Image}
              source={{ uri: this.state.selectedItem.image }} />
          </View>
          <View style={styles.portionControl}>
            <Text>{Math.round(this.state.value * 100) + '%'} </Text>
            <Slider minimumValue={0.5}
              maximumValue={1.5}
              value={this.state.value}
              step={0.1}
              onValueChange={(value) => this.updateNutrients(value)}
              onSlidingComplete={(value => this.setState({ value: value }))}
              style={{ width: 100 }}
            />
          </View>
          <View style={styles.liveDisplay}>
          <Text>
            {this.state.text}
          </Text>
          </View>
        </View>
      )
    }
  }

  renderButton = () => {
    if (this.state.button == 'remove') {
      return (<View style={styles.URView}>
        <Button title='Remove' color='red' onPress={this.removeFromMealSummary} />
        <Button title='Update' onPress={this.updateMealSummary} />
      </View>);
    }

    else {
      return (<View style={styles.add_remove}>
        <Button title='Add' onPress={this.addToMealSummary} />
      </View>);
    }
  }

  updateNutrients(value) {
    this.setState({
      text: 'Meal: ' + this.state.selectedItem.name + '\n\n' +
            'Calories: ' + Math.round(this.state.selectedItem.calories * value) + '\n' +
            'Protein: ' + Math.round(this.state.selectedItem.protein * value) + '\n' +
            'Sodium: ' + Math.round(this.state.selectedItem.sodium * value) + '\n' +
            'Carbs: ' + Math.round(this.state.selectedItem.carbs * value)
    });
    
  }

  render() {
    /*this.state.mealsAvailable.map((meal, i) => {
      images.push(
        <TouchableOpacity
          key={i}
          style={styles.Image}
          onPress={() => (this.setState({
            selectedItem: meal,
            button: 'add',
            text: 'Meal: ' + meal.name + '\n\n' +
              'Calories: ' + meal.calories + '\n' +
              'Protein: ' + meal.protein + '\n' +
              'Sodium: ' + meal.sodium + '\n' +
              'Carbs: ' + meal.carbs,
            value: 1, percent: '100%'
          }))}>
          <Image style={styles.Image}
            source={{ uri: meal.image }} />
        </TouchableOpacity>
      );
    });*/

    const clicked = this.props.navigation.getParam('clicked', '');
    console.log(clicked);

    return (
      <View style={{flex: 1}}>
      {this.state.selectedItem.name && <SummaryEditor meal={this.state.selectedItem} text={this.state.text} renderButton={this.renderButton} updateNutrients={this.updateNutrients}/>}
        <View style={styles.mealSummary}>
        <View style={styles.reset}>
            <Button color='red' title='X' onPress= { () => Alert.alert('Alert', 'Are you sure you want to reset meals?', 
                                                          [{text: 'No' },
                                                           {text: 'Yes' , onPress: () => {this.resetMealSummary()}}
                                                          ])} />
          </View>
          {this.state.mealSummary.map((summary, i) => {
            return (<TouchableOpacity style={styles.Image}
              key={i}
              onPress={() => (this.summaryToSelectedItem(summary, 'remove'))}>
              <Image style={styles.Image}
                source={{ uri: summary.meal.image }} />
            </TouchableOpacity>);
          })}
        </View>
        <ScrollView style={styles.SecondContainerScrollView}>
          <View style={styles.SecondContainer}>
            {
              this.state.mealsAvailable.map((meal, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.Image}
                    onPress={() => { this.availableToSelectedItem(meal, 'add')}} >
                    <Image style={styles.Image}
                      source={{ uri: meal.image }} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>
        <View style = {styles.NavigationBar}>
         <Button style={{position: 'absolute', bottom: 0,}} onPress={this.nav("Home")} title="Home" />
         <Button style={{position: 'absolute', bottom: 0,}} onPress={this.nav("Collection")} title="Collection" />
      </View>
    </View>
    );
  }
}

let Window = Dimensions.get('window');
const styles = StyleSheet.create({
  BuilderContainer: {
  },

  FirstContainer: {
    flexDirection: 'row',
    height: '40%',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderWidth: 1
  },

  SecondContainerScrollView: {
    position: 'relative',
    flexDirection: 'column',
    height: '30%',
    backgroundColor: 'lightblue',
    margin: 10,
    borderWidth: 1,
  },

  SecondContainer: {
    flexDirection: 'row',
    margin: 10,
    flexWrap: 'wrap',
    position: 'relative',
    //overflow: 'hidden',
  },

  add_remove: {
    position: 'absolute',
    height: 100,
    width: 100,
    top: 0,
    left: 0
  },

  reset: {
    position: 'absolute',
    height: 40,
    width: 30,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },

  dropzone: {
    width: 80,
    height: 80,
    position: 'absolute',
    left: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 3,
    borderRadius: 1,
    borderColor: 'black',

  },

  portionControl: {
    position: 'absolute',
    bottom: 0,
    left: 40,
    width: 60,
    height: 60,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  liveDisplay: {
    height: 150,
    width: 200,
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: 'black',
  },

  mealSummary: {
    height: 100,
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'blue',
    borderWidth: 3
  },

  Image: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NavigationBar:
  {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: Window.height,
    backgroundColor: 'white'
  },

  URView:
  {
    width: 100,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  Crazy:
  {
    height: 512,
    width: Dimensions.get('window').width,
    position: 'absolute',
    resizeMode: 'cover',

  },

});