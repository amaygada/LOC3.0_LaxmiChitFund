import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CurvedHeader from '../components/curved_header';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <CurvedHeader title="Select" />
      </View>
    );
  }
}
