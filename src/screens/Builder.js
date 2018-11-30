// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Button,
  AsyncStorage,
  Alert,
  Slider,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

// Components
import SummaryEditor from '../components/SummaryEditor'

class Builder extends Component {
  static navigationOptions = {
    title: 'Meal Builder',
  }

  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: 1,
      button: '',
      selectedItem: {},
    };

    this.rkey = props.selectedRestaurant || 0;
    console.log('selected rest', this.rkey);
  }

  availableToSelectedItem = (meal, action) => {
    this.setState({
      selectedItem: { meal: meal, value: 1 },
      button: action,
      value: 1,
    });
  }

  summaryToSelectedItem = (SummaryObject, action) => {
    this.setState({
      selectedItem: SummaryObject,
      button: action,
      value: SummaryObject.value,
    });
  }

  resetTopContainer = () => {
    this.props.dispatch({
      type: 'ClearSummary',
      Restaurant: this.props.restaurants[this.rkey],
    });
    this.setState({
      selectedItem: {},
    });
  }

  render() {
    if (!this.props.restaurants[this.rkey])
      return (<View />);
    return (
      <View style={styles.mainContainer}>
        <View>
          <Image source={require('../assets/Background.png')} style={styles.backImage} />
        </View>
        <Text style={styles.resturantTitle}>
          {this.props.restaurants[this.rkey].Title}
        </Text>
        {this.state.selectedItem.meal &&
          <SummaryEditor
            summaryObject={this.state.selectedItem}
            buttonType={this.state.button}
            parent={this} />
        }
        <View style={styles.topContainer}>
          <View style={styles.reset}>
            <TouchableOpacity style={{...styles.button, zIndex: 10,}} onPress={() => Alert.alert('Alert', 'Are you sure you want to reset meals?', [
              { text: 'Yes', onPress: () => { this.resetTopContainer() } },
              { text: 'No' }
            ])} title="Restaurants" >
              <Image source={require('../assets/resetButton.png')} style={styles.imageButton} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} contentContainerStyle={{zIndex: 0,}}>
            {this.props.restaurants[this.rkey] &&
              this.props.restaurants[this.rkey].Summary.map((summary, i) => {
                return (<TouchableOpacity style={styles.Image}
                  key={i}
                  onPress={() => (this.summaryToSelectedItem(summary, 'remove'))}>
                  <Image style={styles.Image}
                    source={{ uri: summary.meal.image }} />
                </TouchableOpacity>);
              })
            }
          </ScrollView>
        </View>
        <ScrollView style={styles.SecondContainerScrollView}>
          <View style={styles.SecondContainer}>
            {this.props.mealsAvailable &&
              this.props.mealsAvailable.map((meal, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.Image}
                    onPress={() => { this.availableToSelectedItem(meal, 'add') }} >
                    <Image style={styles.Image}
                      source={{ uri: meal.image }} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>
        <View style={styles.NavigationBar}>
          <Button style={{ position: 'absolute', bottom: 0, }} onPress={() => this.nav("Home")} title="Home" />
          <Button style={{ position: 'absolute', bottom: 0, }} onPress={() => this.nav("Collection")} title="Collection" />
        </View>
      </View>
    );
  }
}

let Window = Dimensions.get('window');
const styles = StyleSheet.create({

  //The Whole Screen
  mainContainer: {
    flex: 1,
  },

  backImage: {
    width: Dimensions.get('window').width,
    position: 'absolute',
  },

  resturantTitle: {
    fontWeight: 'bold',
    fontSize: 21,
    color: 'black',
    textAlign: 'center',
    padding: 5,
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
    borderWidth: 1,
    borderRadius: 10,
  },

  SecondContainerScrollView: {
    position: 'relative',
    flexDirection: 'column',
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

  //Top Container
  topContainer: {
    margin: 10,
    width: wp('95%'),
    height: hp('15%'),
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey'
  },

  reset: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
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

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Builder);