import React from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import Map from '../../components/map';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Subheading, Title, ActivityIndicator , Button} from 'react-native-paper';
import {API_KEY} from '../../components/weather/weatherAPIKey';
import Weather from '../../components/weather/weather';
import {weatherConditions} from '../../components/weather/weatherConditions';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class Map_test extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    city: this.props.route.params.obj.name,
    text: this.props.route.params.obj.name,
    error: false,
  };

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather(city = this.props.route.params.obj.name) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.cod === '404') {
          this.setState({error: true});
        } else {
          this.setState({
            temperature: json.main.temp,
            weatherCondition: json.weather[0].main,
            isLoading: false,
            error: false,
            city: json.name,
          });
        }
      });
    console.log(this.state.city);
  }

  go_to_landmark = () => {
    this.props.navigation.navigate('Landmark')
  }

  render() {
    let obj = this.props.route.params.obj;
    console.log(obj)
    const {isLoading} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.map}>
          <Map long={obj.long} lat={obj.lat}></Map>
        </View>
        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <LinearGradient
            style={[styles.halfSecond]}
            colors={[
              'white',
              weatherConditions[this.state.weatherCondition].color,
            ]}>
            <View style={styles.text}>
              <Title>{obj.name}</Title>
              <Subheading>{obj.caption}</Subheading>
            </View>
            <Weather
              weather={this.state.weatherCondition}
              temperature={this.state.temperature}
              city={this.state.city}
            />
            <View style={styles.buttonContainer}>
        <Button labelStyle={{color : "#fff"}} mode="outlined" style={styles.button}>
          See Hotels
        </Button>
        <Button labelStyle={{color : "#fff"}} mode="outlined" style={styles.button} onPress={this.go_to_landmark}>
          Landmarks
        </Button>
      </View>
          </LinearGradient>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },
  halfSecond: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: wp('100%'),
    height: hp('50%'),
  },
  text: {
    width: wp('90%'),
    margin: wp('5%'),
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: wp('10%'),
    borderColor : "#fff"
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('10%'),
    justifyContent: 'space-evenly',
  },
});
