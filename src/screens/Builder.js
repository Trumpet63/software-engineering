import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, Image, Button } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

export default class Builder extends Component {
  nav = (navroute) => () => {
    this.props.navigation.navigate(navroute);
  }

  constructor(props) {
    super(props);

    this.state = {
      selectItem: {},
      mealSummary: [],
      data: [
        {
          label: '150%',
          size: 15
        },
        {
          label: '100%',
          size: 15
        },
        {
          label: '50%',
          size: 15
        }
      ]
    };
  }

  addToMealSummary = () => {
    this.setState({
      mealSummary: [
        ...mealSummary,
        this.state.selectItem
      ],
    });
  }

  render() {
    var imag = [];
    imag.push({
      id: 'Herbed-Haricots-Verts-627461',
      name: 'Herbed Haricots Verts',
      image: 'http://lh5.ggpht.com/M3mylUIV1Lk9R5mV4eOjICTUDb5zEY7Y0okoxrqPRUMN_8-Th_gfOeKYC65fL4uk_nkqc-aJ37Qj8s54Es_8=s90-c',
      calories: 122,
      protien: 33,
      sodium: 145,
      carbs: 12,
    });

    var images = [];

    for (let i = 0; i < imag.length; i++) {
      console.log(imag[i].image);
      images.push(
        <TouchableOpacity
          key={i}
          style={styles.Image}
          onPress={() => (this.setState({ selectItem: imag[i] }))}>
          <Image style={styles.Image}
            source={imag[i].image} />
        </TouchableOpacity>
      )
    }
    return (
      <View>
        <View style={styles.FirstContainer}>
          <Button title='Add to summary' onPress={this.addToMealSummary} />
          <View style={styles.dropzone}>
            <Image style={styles.Image}
              source={this.state.selectItem.image} />
          </View>
          <View style={styles.portionSize}>
            <RadioGroup radioButtons={this.state.data} />
          </View>
        </View>
        <View style={styles.mealSummary}>
          {this.state.mealSummary.image}
        </View>
        <View style={styles.SecondContainer}>
          {images}
        </View>

        <View style={styles.NavigationBar}>
          <Button onPress={this.nav("Home")} title="Home" style={{ width: '100%' }} />
          <Button onPress={this.nav("Collection")} title="Collection" style={{ width: '100%' }} />
        </View>


      </View>

    );
  }
}

let Window = Dimensions.get('window');
const styles = StyleSheet.create({


  FirstContainer: {

    flexDirection: 'row',
    height: 180,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },

  SecondContainer: {

    flexDirection: 'row',
    height: 185,


  },


  dropzone: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  portionSize: {
    width: 80,
    height: 60,
    marginLeft: 10,
    flexDirection: 'column'
  },

  mealSummary: {
    height: 85,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'orange'
  },

  Image: {
    width: 60,
    height: 60,
    margin: 10
  },

  NavigationBar: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'red'
  },

  Add: {
    height: 20,
    width: 50,
    backgroundColor: 'black'
  }

});