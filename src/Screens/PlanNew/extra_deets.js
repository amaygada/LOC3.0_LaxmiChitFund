import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  HelperText,
} from 'react-native';
import {
  Button,
  Searchbar,
  TextInput,
  ActivityIndicator,
  DefaultTheme,
} from 'react-native-paper';
import CurvedHeader from '../../components/curved_header';
import {get_cities_attr, get_image_city} from './../../api/api';
import {add_user_deets_to_new} from './../../redux/actions';
import Autocomplete from 'react-native-autocomplete-input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';

import {connect} from 'react-redux';

class Extra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      query: '',
      suggestiveList: true,
      number_of_people: '1',
      start_date: new Date(),
      end_date: new Date(),
      num_val: false,
    };
  }
  state = {
    text: '',
    query: '',
    suggestiveList: true,
    number_of_people: '1',
    start_date: '',
    end_date: '',
    num_val: false,
  };

  getHandler = key => value => {
    this.setState({[key]: value});
  };

  get_deets = async () => {
    let num_regex = /^[1-9][0-9]*$/;
    if (!num_regex.exec(this.state.number_of_people)) {
      alert('Please enter the number field correctly!');
      return;
    }
    let a = this.state.start_date;
    let b = this.state.end_date;
    if (a > b) {
      alert('Please enter correct dates!');
      return;
    }
    await this.props.add_user_deets_to_new({
      number_of_people: this.state.number_of_people,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    });
    this.props.navigation.navigate('City List');
  };

  setDate = val => {
    console.log(val);
  };

  render() {
    return (
      <View style={styles.container}>
        <CurvedHeader title="Enter Information" />
        <View style={styles.autocompleteContainer}>
          <TextInput
            label="Number of People"
            style={styles.input}
            theme={themes.username_theme}
            keyboardType="number-pad"
            mode="outlined"
            value={this.state.number_of_people}
            onChangeText={this.getHandler('number_of_people')}
          />
          <Button labelStyle={{color: '#1e5f74'}} style={{marginTop: 2}}>
            Enter Start Date
          </Button>
          <DatePicker
            style={{marginHorizontal: 10}}
            date={this.state.start_date}
            onDateChange={val => {
              this.setState({start_date: val});
            }}
          />
          <Button labelStyle={{color: '#1e5f74'}}> Enter End Date</Button>
          <DatePicker
            style={{marginHorizontal: 10}}
            date={this.state.end_date}
            onDateChange={val => {
              this.setState({end_date: val});
            }}
          />
        </View>
        <Button style={styles.button} mode="contained" onPress={this.get_deets}>
          Next
        </Button>
      </View>
    );
  }
}

const msp = state => ({
  new_: state.new,
});

export default connect(msp, {add_user_deets_to_new})(Extra);

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
  input: {
    paddingHorizontal: wp('20%'),
    paddingTop: hp('1%'),
  },
});

const themes = {
  username_theme: {colors: {primary: '#1e5f74', underlineColor: 'transparent'}},
  password_theme: {colors: {primary: '#1e5f74', underlineColor: 'transparent'}},
};

const colors = {
  login_button_color: '#1e4f74',
  clear_button_color: '#1e4f74',
  header_background: '#1e4f74',
};
