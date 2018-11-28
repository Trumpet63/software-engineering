// Modules
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
	listenOrientationChange as loc,
	removeOrientationListener as rol
} from 'react-native-responsive-screen';

// Functions
import images from '../functions/restaurantImages';
import numberWithCommas from '../functions/numberWithCommas';

class SelectableMenuTile extends Component {
	componentDidMount() {
		loc(this);
	}

	componentWillUnMount() {
		rol();
	}

	nav() {
		if (this.props.wallet.totalIncome < this.props.restaurant.MinIncome) {
			alert('You must have an income of at least $' + numberWithCommas(this.props.restaurant.MinIncome));
		}
		else {
			this.props.dispatch({
				type: 'SetSelectedRestaurant',
				payload: this.props.index,
			});
			this.props.navigation.navigate('Builder', { selectedRestaurant: this.props.index });
		}
	}

	render() {
		const styles = StyleSheet.create({
			touch: {
				margin: 15,
				overflow: 'hidden',
			},
			container: {
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			},
			resturantBox: {
				flexDirection: 'row',
				width: wp('95%'),
				height: hp('20%'),
				borderWidth: 2,
				borderRadius: 10,
				borderColor: 'black',
				backgroundColor: 'white',
			},
			//Right Side of the Resturant Box
			rightSide: {
				flex: 3,
				flexDirection: 'column',
				overflow: 'hidden',
			},
			//Top of the Right Side
			topRight: {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			},
			title: {
				color: 'black',
				fontSize: 24,
				fontWeight: 'bold',

			},
			//Bottom of the Right Side
			botRight: {
				flex: 2,
				borderColor: 'black',
				borderWidth: 2,
				justifyContent: 'center',
				alignItems: 'center',
				width: wp('66.8%'),
				borderRadius: 10,
			},
			resturantIncome: {
				justifyContent: 'center',
				alignContent: 'center',
				color: 'black',
			},
			//Left Side of the Resturant Box
			leftSide: {
				flex: 1.2,
				alignItems: 'center',
				justifyContent: 'center',
			},
			image: {
				width: wp('26%'),
				height: hp('19%'),
				borderRadius: 5,
			},
			overlay: {
				opacity: 0.7,
				height: '100%',
				width: 400,
				zIndex: 0,
				position: 'absolute',
				left: -60,
				top: 0,
			},
		});
		return (
			<TouchableOpacity
				onPress={() => this.nav()}
				style={styles.touch}>
				<View style={styles.container}>
					<View style={styles.resturantBox}>
						<View style={styles.leftSide}>
							<Image style={styles.image} source={images[this.props.title]} />
						</View>
						<View style={styles.rightSide}>
							{this.props.wallet.totalIncome < this.props.restaurant.MinIncome && <Image source={require('../assets/LockApp.png')} style={styles.overlay} />}
							<View style={styles.topRight}>
								<Text style={styles.title}>{this.props.title}</Text>
							</View>
							<View style={styles.botRight}>
								<Text style={styles.resturantIncome}>{this.props.rincome}</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
};

const mapStateToProps = state => ({ ...state });

export default withNavigation(connect(mapStateToProps)(SelectableMenuTile));