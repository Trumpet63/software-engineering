import React, { Component } from 'react';
import { View, Image, Button, Slider, Dimensions, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class SummaryEditor extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: props.summaryObject.value,
    });
    const index = props.selectedRestaurant || 0;
    this.restaurant = props.restaurants[index];
  }

  addToMealSummary = () => {
    this.props.dispatch({
      type: 'AddToSummary',
      Restaurant: this.restaurant,
      SummaryObject: this.props.summaryObject,
    });
    this.props.parent.setState({
      selectedItem: {},
      text: '',
    });
  }

  removeFromMealSummary = () => {
    this.props.dispatch({
      type: 'RemoveFromSummary',
      Restaurant: this.restaurant,
      SummaryObject: this.props.summaryObject,
    });
    this.props.parent.setState({
      selectedItem: {},
    });
  }

  updateMealSummary = () => {
    this.props.dispatch({
      type: 'UpdateSummaryObject',
      Restaurant: this.restaurant,
      SummaryObject: this.props.summaryObject,
    });
    this.props.parent.setState({
      selectedItem: {},
    });
  }

  renderButton() {
    if (this.props.buttonType == 'remove') {
      return (
        <View style={styles.URView}>
          <Button title='Remove' color='red' onPress={this.removeFromMealSummary} />
          <Button title='Update' onPress={this.updateMealSummary} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.add_remove}>
          <Button title='Add' onPress={this.addToMealSummary} />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.FirstContainer}>
        <View style={styles.add_remove}>
          {this.renderButton()}
        </View>
        <View style={styles.dropzone}>
          <Image style={styles.Image}
            source={{ uri: this.props.summaryObject.meal.image }} />
        </View>
        <View style={styles.portionControl}>
          <Text>{Math.round(this.props.summaryObject.value * 100) + '%'} </Text>
          <Slider minimumValue={0.5}
            maximumValue={1.5}
            value={this.props.summaryObject.value}
            step={0.1}
            onValueChange={(value) => this.setState({ value: value })}
            onSlidingComplete={(value) => this.props.parent.setState({ selectedItem: { ...this.props.parent.state.selectedItem, value: value } })}
            style={{ width: 100 }}
          />
        </View>
        <ScrollView style={styles.liveDisplay}>
          <Text style={styles.mealText}>Meal: </Text><Text>{this.props.summaryObject.meal.name}</Text>
          <Text style={styles.mealText}>Calories: </Text><Text>{Math.round(this.props.summaryObject.meal.calories * this.props.summaryObject.value)}</Text>
          <Text style={styles.mealText}>Protein: </Text><Text>{Math.round(this.props.summaryObject.meal.protein * this.props.summaryObject.value)}</Text>
          <Text style={styles.mealText}>Fat: </Text><Text>{Math.round(this.props.summaryObject.meal.fat * this.props.summaryObject.value)}</Text>
          <Text style={styles.mealText}>Carbs: </Text><Text>{Math.round(this.props.summaryObject.meal.carbs * this.props.summaryObject.value)}</Text>
        </ScrollView>
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
  },
  SecondContainerScrollView: {
    position: 'relative',
    flexDirection: 'column',
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    margin: 10,
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
    borderWidth: 3
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
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
  NavigationBar: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: Window.height,
    backgroundColor: 'white'
  },

  URView: {
    width: 100,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Crazy: {
    height: 512,
    width: Dimensions.get('window').width,
    position: 'absolute',
    resizeMode: 'cover',
  },
  mealText:{
    fontWeight: 'bold',
  }
});

const mapStateToProps = state => ({ ...state });

export default withNavigation(connect(mapStateToProps)(SummaryEditor));