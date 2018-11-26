import React from 'react';
import { View, Image, Button, Dimensions, StyleSheet, Text } from 'react-native';
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
        <Button title='Cancel' onPress={deselectItem} />
      </View>
      <View style={styles.dropzone}>
        <Image style={styles.Image}
          source={{ uri: props.meal.image }} />
      </View>
      <View style={styles.liveDisplay}>
        <Text>Meal: {props.meal.name}</Text>
        <Text>Calories: {Math.round(props.meal.calories)}</Text>
        <Text>Protein: {Math.round(props.meal.protein)}</Text>
        <Text>Sodium: {Math.round(props.meal.sodium)}</Text>
        <Text>Carbs: {Math.round(props.meal.carbs)}</Text>
        {props.meal.ingredients &&
          <Text>Ingredients: {props.meal.ingredients &&
            props.meal.ingredients.map((ingredient, i) => {
              return ((i != 0) ? ', ' : '') + ingredient;
            })
          }</Text>
        }
      </View>
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

export default withNavigation(connect(mapStateToProps)(MealPreview));