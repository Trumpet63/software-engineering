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
                <View style={{position:'absolute', top:0, left:0, right:0, bottom:0, justifyContent:'center',alignItems:'center'}}>
                <Image
                style={styles.overlay}
                source={this.props.over}
                 />
                </View>
                <Image
                    style={styles.Image}
                    source={this.props.image}
                     />

                <View style={styles.RightContainer}>
                    <Text style={styles.Title}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.rincome}>{this.props.rincome}</Text>
                    <View style={styles.meals}>
                        {
                            this.props.menuItem &&
                            this.props.menuItem.map((item)=> {
                            return(
                                <Text style={styles.item}>{item}</Text>
                            )
                        })}
                    
                    
                </View>
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
        borderWidth:2,
    },
    RightContainer: {
        margin: 10,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        
    },
    Title: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: 'black',
        alignItems:'center',
    },
    Image: {
        margin: 10,
        height: 150,
        width: 100,
    },
    meals: {
        padding:8,
        borderWidth:0.5,
        width:215,
        height:80,
    },
    item:{
        fontSize:14,
        fontFamily:'Cochin',
        color:'black',
        textAlign:'center',

    },
    rincome:{
        fontSize:14,
        color:'black',
        borderColor:'black',
        borderWidth:2,
        textAlign:'center',
        padding:5,
        width:215,
        height:30,

    },
    overlay:{

        opacity:0.7,
        height:150,
        width:400,
        
    }
});  