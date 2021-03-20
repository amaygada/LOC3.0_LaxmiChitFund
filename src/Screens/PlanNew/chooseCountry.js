import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import CurvedHeader from '../../components/curved_header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class chooseCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <CurvedHeader title="Select Country" />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Next
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: hp('2%'),
    width: wp('96%'),
    height: hp('7+%'),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e5f7f',
  },
  container: {
    flex: 1,
  },
});
