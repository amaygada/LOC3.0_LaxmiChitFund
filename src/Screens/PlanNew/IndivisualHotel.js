import React from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import Map from '../../components/map';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Subheading, Title, ActivityIndicator, Button} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { TouchableHighlightBase } from 'react-native';

export default class IndivisualHotel extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    city: this.props.route.params.obj.name,
    text: this.props.route.params.obj.name,
    error: false,
  };

  go_to_landmark = () => {
    console.log('hotel ' + JSON.stringify(this.props.route.params.obj));
  };

  go_to_ahi = () => {
    this.props.navigation.navigate('AHI' , {obj : this.props.route.params.obj})
  }

  render() {
    let obj = this.props.route.params.obj;
    console.log(obj);
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
            colors={['white', '#1F1C2C']}>
            <View style={styles.text}>
              <Title>{obj.name}</Title>
              <Subheading>{obj.address}</Subheading>
            </View>
            <AirbnbRating
              count={5}
              reviews={['Meh', 'Meh', 'OK', 'Good!', 'Excellent!']}
              defaultRating={obj.star}
              size={20}
            />
            <View style={styles.price}>
              <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
                {'\u20B9'}
                {obj.price}
              </Text>
              <Text style={{fontSize: 15, color: '#D6D6D6'}}>per night</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                style={[styles.button]}
                onPress={this.go_to_ahi}
                labelStyle={{color: 'white'}}>
                Add to Itinerary
              </Button>
            </View>
          </LinearGradient>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  price: {
    justifyContent: 'center',
    marginHorizontal: wp('5%'),
    alignItems: 'center',
    marginTop: hp('3%'),
  },
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
    alignContent: 'center',
    marginLeft: wp('17%'),
    borderColor: 'white',
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
    alignItems: 'center',
    marginHorizontal: wp('10%'),
    alignContent: 'center',
  },
});
