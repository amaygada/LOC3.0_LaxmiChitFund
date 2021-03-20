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
import {get_cities_attr, get_image_city} from '../../api/api';
import {add_itenary} from '../../redux/actions';
import Autocomplete from 'react-native-autocomplete-input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux';

class Extra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      query: '',
      suggestiveList: true,
      start_date: new Date(),
      end_date: new Date()
    };
  }
  state = {
    text: '',
    query: '',
    suggestiveList: true,
    start_date: '',
  };

  getHandler = key => value => {
    this.setState({[key]: value});
  };

  add = async () => {
  
    let o = {
        "type" : "hotel",
        "deets" : this.props.route.params.obj,
        "start_date" : this.state.start_date,
        "end_date" : this.state.end_date
    }
    await this.props.add_itenary(o)
    this.props.navigation.navigate('Hotel')
  };

  setDate = val => {
    console.log(val);
  };

  render() {
    return (
      <View style={styles.container}>
          <CurvedHeader title="Build Itenary" />
        <View style={styles.autocompleteContainer}>
          <Button labelStyle={{color: '#1e5f74' , fontSize:18}} style={{marginTop: 2}}>
            Enter Check in date
          </Button>
          <DatePicker
            style={{marginHorizontal: 5 , alignSelf : 'center'}}
            date={this.state.start_date}
            onDateChange={val => {
              this.setState({start_date: val});
            }}
          />
          <Button labelStyle={{color: '#1e5f74' , fontSize:18}} style={{marginTop: 30}}>
            Enter Check out date
          </Button>
          <DatePicker
            style={{marginHorizontal: 5 , alignSelf : 'center'}}
            date={this.state.end_date}
            onDateChange={val => {
              this.setState({end_date: val});
            }}
          />
        </View>
        <Button style={styles.button} mode="contained" onPress={this.add}>
          Next
        </Button>
      </View>
    );
  }
}

const msp = state => ({
  new_: state.new,
});

export default connect(msp, {add_itenary})(Extra);

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
    backgroundColor : "#fff2df"
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
