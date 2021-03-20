import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {weatherConditions} from './weatherConditions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-paper';

const Weather = ({weather, temperature, city}) => {
  return (
    <View style={[styles.weatherContainer]}>
      <View style={styles.headerContainer}>
        <Icon
          style={{height: hp('15%'), width: hp('15%'), paddingTop: hp('3%')}}
          size={60}
          name={weatherConditions[weather].icon}
          color={'#fff'}
        />
        <Text
          style={[
            styles.tempText,
            {color: weatherConditions[weather].textColor},
          ]}>
          {temperature}˚C
        </Text>
      </View>

      <View style={styles.bodyContainer}>
        <Text
          style={[
            styles.subtitle,
            {color: weatherConditions[weather].textColor},
          ]}>
          {' '}
          It's Currently
        </Text>
        <Text
          style={[styles.title, {color: weatherConditions[weather].textColor}]}>
          {weatherConditions[weather].title}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" style={styles.button}>
          See Hotels
        </Button>
        <Button mode="outlined" style={styles.button}>
          Landmarks
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: wp('10%'),
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
  tempText: {
    paddingStart: 20,
    fontSize: 48,
    color: '#fff',
  },
  bodyContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  city: {
    paddingTop: 15,
    fontSize: 48,
    color: '#fff',
  },
  title: {
    fontSize: 40,
    color: '#fff',
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
  },
});

export default Weather;
