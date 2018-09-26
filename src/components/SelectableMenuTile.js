import React, { Component } from 'react';
import { View, StyleSheet, Image, Text,TouchableOpacity } from 'react-native';

export default class SelectableMenuTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loading: true,
        } 
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.nav}
                style={styles.MainContainer}>

                <Image
                    style={styles.Image}
                    source={this.props.image} />

                <View style={styles.RightContainer}>
                    <Text style={styles.Title}>
                        {this.props.title}
                    </Text>
                    <Text>
                        Widget Placeholder...
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    MainContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        margin: 20,
        backgroundColor: 'white',
    },
    RightContainer: {
        margin: 10,
        flexDirection: 'column',
    },
    Title: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: 'black',
    },
    Image: {
        margin: 10,
        height: 100,
        width: 100,
    },
});  