import React from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import Map from '../../components/map';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Subheading, Title, ActivityIndicator, Button} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class IndivisualLandmark extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    city: this.props.route.params.obj.name,
    text: this.props.route.params.obj.name,
    error: false,
  };

  go_to_ali = () => {
    this.props.navigation.navigate('ALI' , {"obj" : this.props.route.params.obj});
  };

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
            colors={['white', 'white']}>
            <View style={styles.text}>
              <Title>{obj.name}</Title>
              <Subheading>{obj.caption}</Subheading>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                style={[styles.button]}
                onPress={this.go_to_ali}>
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
