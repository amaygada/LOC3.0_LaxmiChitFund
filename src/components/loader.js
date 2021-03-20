import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: true};
  }

  render() {
    const {visible} = this.state;
    return (
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('./loader.json')}
        animationStyle={styles.lottie}
        speed={1}>
        <Text>Working on it...</Text>
      </AnimatedLoader>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: wp('100%'),
    height: wp('100%'),
  },
});
