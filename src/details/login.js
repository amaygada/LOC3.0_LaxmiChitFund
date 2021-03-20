import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Button,
  TextInput,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {change_log_status, loginUser , add_lat_long} from './../redux/actions.js';
import CurvedHeader from './../components/curved_header.js';
import Geolocation from '@react-native-community/geolocation';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    disableLogin: true,
    hidePassword: true,
    email_val: false,
    password_val: false,
  };

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        let long = position.coords.longitude.toString();
        let lat = position.coords.latitude.toString();
        this.props.add_lat_long({"lat" : lat , "long" : long})
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 20000},
    );
  };

  loginDisableHandler = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({disableLogin: false});
    } else {
      this.setState({disableLogin: true});
    }
  };

  getHandler = key => value => {
    this.setState({[key]: value});
    const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/;

    if (
      key === 'email' &&
      value.length > 0 &&
      !emailRegx.exec(value.toString().toLowerCase())
    )
      this.setState({email_val: true});
    else if (key === 'email' && value.length === 0)
      this.setState({email_val: false});
    if (
      key === 'password' &&
      value.length > 0 &&
      !passwordRegx.exec(value.toString())
    )
      this.setState({password_val: true});
    else if (key === 'password' && value.length === 0)
      this.setState({password_val: false});
  };

  validate = () => {
    const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/;

    if (emailRegx.exec(this.state.email.toString().toLowerCase()))
      this.setState({email_val: false});
    //else this.setState({email_val : true})
    if (passwordRegx.exec(this.state.password.toString()))
      this.setState({password_val: false});
    //else this.setState({password_val : true})

    if (
      emailRegx.exec(this.state.email.toString().toLowerCase()) &&
      passwordRegx.exec(this.state.password.toString())
    ) {
      this.setState({disableLogin: false});
    } else {
      this.setState({disableLogin: true});
    }
  };

  login = async () => {
    this.findCoordinates;
    this.props.loginUser(this.state.email, this.state.password);
  };

  createAccountPress = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    return (
      <View style={styles.full_container}>
        <CurvedHeader title="Login" />
        <View style={styles.center_data}>
          <View style={styles.container}>
            <TextInput
              label="Email"
              style={styles.input}
              theme={themes.username_theme}
              keyboardType="default"
              mode="outlined"
              value={this.state.email.trim()}
              onChangeText={this.getHandler('email')}
            />
            <HelperText type="info" visible={this.state.email_val}>
              * Enter valid email
            </HelperText>
            <TextInput
              label="Password"
              secureTextEntry={this.state.hidePassword}
              style={styles.input}
              theme={themes.password_theme}
              keyboardType="default"
              mode="outlined"
              value={this.state.password.trim()}
              onChangeText={this.getHandler('password')}
            />
            <HelperText type="info" visible={this.state.password_val}>
              * Password must be 8 characters long
            </HelperText>
          </View>

          <View style={styles.button_container}>
            <Button
              mode="contained"
              color={colors.login_button_color}
              style={styles.login_button}
              disabled={this.state.disableLogin}
              onPress={this.login}>
              Login
            </Button>
          </View>

          <View style={{alignItems: 'center', marginTop: 15}}>
            <TouchableOpacity onPress={this.createAccountPress}>
              <Text style={{fontSize: 17, color: '#7d0633'}}>
                CREATE ACCONT
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize: 12, color: '#aeaeae'}}>
              login.(Don't have an account?
            </Text>
          </View>

          <View>
            <ActivityIndicator
              style={{paddingTop: hp('2%')}}
              animating={this.props.log}
              color="#1e5f74"
              size="small"
            />
          </View>
        </View>
      </View>
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.user_info) {
      nextProps.navigation.navigate('Opt');
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.email !== this.state.email ||
      prevState.password !== this.state.password
    ) {
      this.validate();
    }
  };
}

const msp = state => ({
  user: state.user,
  log: state.log,
});

export default connect(msp, {change_log_status, loginUser , add_lat_long})(Login);

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: wp('3%'),
    paddingTop: hp('1%'),
  },
  login_button: {
    marginHorizontal: wp('3%'),
    marginVertical: hp('1.5%'),
    borderRadius: 20,
  },
  clear_button: {
    marginHorizontal: wp('3%'),
    marginVertical: hp('1.5%'),
  },
  button_container: {
    justifyContent: 'center',
    marginLeft: wp('12%'),
    marginRight: wp('12%'),
    marginTop: hp('4%'),
  },
  full_container: {
    flex: 1,
  },
  center_data: {
    flex: 5,
    alignContent: 'center',
    marginVertical: hp('8%'),
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
