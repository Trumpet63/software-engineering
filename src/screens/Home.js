import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import SelectableMenuTile from '../components/SelectableMenuTile';

export default class Home extends Component {
  nav=(navroute)=>()=>{
    this.props.navigation.navigate(navroute);
  }
  render() {
    return (
      <ScrollView scrollEnabled={true} showVerticalScrollIndicator={true} keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'true'}>
        
      <SelectableMenuTile
        title="Hot Dog Stand"
        image={require('../assets/th.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="Quick Eats"
        image={require('../assets/QuickEat.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="Sandy's Fast Food"
        image={require('../assets/FastFood.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="Pappi's Italian"
        image={require('../assets/Italian.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="Mexican Corner"
        image={require('../assets/Mexican.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="Russian Bistro"
        image={require('../assets/Russian.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="American Kingdom"
        image={require('../assets/American.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="Chinese Buffet"
        image={require('../assets/Buffet.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="Hibachi"
        image={require('../assets/Hibachi.jpg')}
        nav={this.nav("Builder")} />

      <SelectableMenuTile
        title="Thyme Thai"
        image={require('../assets/Thai.jpg')}
        nav={this.nav("Builder")} />
        
      </ScrollView> 
      
    )
  }
}
