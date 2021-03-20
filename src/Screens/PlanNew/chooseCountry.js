import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button, Searchbar, TextInput , ActivityIndicator} from 'react-native-paper';
import CurvedHeader from '../../components/curved_header';
import {get_cities_attr , get_image_city} from './../../api/api'
import {add_country_to_new} from './../../redux/actions'
import Autocomplete from 'react-native-autocomplete-input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {connect} from 'react-redux'

const countries = [
  {code: 'AD', label: 'Andorra', phone: '376'},
  {code: 'AE', label: 'United Arab Emirates', phone: '971'},
  {code: 'AF', label: 'Afghanistan', phone: '93'},
  {code: 'AG', label: 'Antigua and Barbuda', phone: '1-268'},
  {code: 'AI', label: 'Anguilla', phone: '1-264'},
  {code: 'AL', label: 'Albania', phone: '355'},
  {code: 'AM', label: 'Armenia', phone: '374'},
  {code: 'AO', label: 'Angola', phone: '244'},
  {code: 'AQ', label: 'Antarctica', phone: '672'},
  {code: 'AR', label: 'Argentina', phone: '54'},
  {code: 'AS', label: 'American Samoa', phone: '1-684'},
  {code: 'AT', label: 'Austria', phone: '43'},
  {code: 'AU', label: 'Australia', phone: '61', suggested: true},
  {code: 'AW', label: 'Aruba', phone: '297'},
  {code: 'AX', label: 'Alland Islands', phone: '358'},
  {code: 'AZ', label: 'Azerbaijan', phone: '994'},
  {code: 'BA', label: 'Bosnia and Herzegovina', phone: '387'},
  {code: 'BB', label: 'Barbados', phone: '1-246'},
];

class chooseCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      query: '',
      suggestiveList: true,
    };
  }
  state = {
    text: '',
    query: '',
    suggestiveList: true,
    country: '',
  };

  get_country = async () => {
    await this.props.add_country_to_new(this.state.country);
    this.props.navigation.navigate('City List')
  }

  render() {
    return (
      <View style={styles.container}>
        <CurvedHeader title="Select Country" />
        <View style={styles.autocompleteContainer}>
          <Searchbar
            placeholder="Enter Country"
            onChangeText={query => this.setState({country: query})}
            value={this.state.country}
          />
          <Image
            style={styles.image}
            source={require('../../images/select_country.png')}
          />
          <Button
            style={styles.button2}
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Help Me Decide
          </Button>
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={this.get_country}>
          Next
        </Button>
      </View>
    );
  }
}

const msp = state => ({
  new_ : state.new
})

export default connect(msp , {add_country_to_new})(chooseCountry)

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    marginTop: hp('3%'),
    marginHorizontal: wp('2%'),
  },
  button: {
    position: 'absolute',
    bottom: hp('2%'),
    width: wp('96%'),
    height: hp('7%'),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e5f7f',
  },
  button2: {
    position: 'absolute',
    bottom: hp('12%'),
    width: wp('50%'),
    height: hp('7%'),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e5f7f',
  },
  container: {
    flex: 1,
  },
  image: {
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
    height: hp('40%'),
    width: hp('40%'),
  },
});
