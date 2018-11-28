import React from 'react';
import { View, Image, Button, Dimensions, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const MealPreview = (props) => {
  const deselectItem = () => {
    props.parent.setState({
      selectedItem: {},
    });
  }
  return (
    <View style={styles.FirstContainer}>
      <View style={styles.add_remove}>
      <TouchableOpacity style={styles.button} title='Cancel' onPress={deselectItem} >
        <Image source={require('../assets/cancelButton.png')} style={styles.cancelButton} />
      </TouchableOpacity>
      </View>
      <View style={styles.dropzone}>
        <Image style={styles.Image}
          source={{ uri: props.meal.image }} />
      </View>
      <ScrollView style={styles.liveDisplay}>
        <Text style={styles.mealText}>Meal: </Text><Text>{props.meal.name}</Text>
        <Text style={styles.mealText}>Calories: </Text><Text>{Math.round(props.meal.calories)}</Text>
        <Text style={styles.mealText}>Protein: </Text><Text>{Math.round(props.meal.protein)}</Text>
        <Text style={styles.mealText}>Fat: </Text><Text>{Math.round(props.meal.fat)}</Text>
        <Text style={styles.mealText}>Carbs: </Text><Text>{Math.round(props.meal.carbs)}</Text>
        <Text style={styles.mealText}>Ingredients:</Text>
        {props.meal.ingredients &&
          <Text>{props.meal.ingredients &&
            props.meal.ingredients.map((ingredient, i) => {
              return ((i != 0) ? ', ' : '') + ingredient;
            })
          }</Text>
        }
      </ScrollView>
    </View>
  );
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
    height: 50,
    width: 50,
    top: 1,
    left: 0,
    alignItems: 'center'
  },
  cancelButton: {
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey'
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

export default withNavigation(connect(mapStateToProps)(MealPreview));