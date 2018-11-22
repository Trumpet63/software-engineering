import React, { Component } from 'react';
import { View, Image, Button, Slider, Dimensions, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

class SummaryEditor extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: props.summaryObject.value,
    });

    this.removeFromMealSummary = props.parent.removeFromMealSummary;
    this.updateMealSummary = props.parent.updateMealSummary;
    this.removeFromMealSummary = props.parent.addToMealSummary;
  }

  renderButton() {
    if (this.props.state.button == 'remove') {
      return (
        <View style={styles.URView}>
          <Button title='Remove' color='red' onPress={() => this.removeFromMealSummary} />
          <Button title='Update' onPress={() => this.updateMealSummary} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.add_remove}>
          <Button title='Add' onPress={() => this.addToMealSummary} />
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
            onSlidingComplete={(value) => this.props.parent.setState({ selectedItem: {...this.props.parent.state.selectedItem, value: value }})}
            style={{ width: 100 }}
          />
        </View>
        <View style={styles.liveDisplay}>
          <Text>Meal: {this.props.summaryObject.meal.name}</Text>
          <Text>Calories: {Math.round(this.props.summaryObject.meal.calories * this.props.summaryObject.value)}</Text>
          <Text>Protein: {Math.round(this.props.summaryObject.meal.protein * this.props.summaryObject.value)}</Text>
          <Text>Sodium: {Math.round(this.props.summaryObject.meal.sodium * this.props.summaryObject.value)}</Text>
          <Text>Carbs: {Math.round(this.props.summaryObject.meal.carbs * this.props.summaryObject.value)}</Text>

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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderStyle: 'dashed',
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
});

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(SummaryEditor);