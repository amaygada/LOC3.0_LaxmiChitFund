import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class CityComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {};

  render() {
    return (
      <Card style={styles.card}>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Content>
          <Title>{this.props.city}</Title>
          <Paragraph>{this.props.caption}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Get details</Button>
        </Card.Actions>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: hp('1%'),
    marginVertical: hp('2%'),
    borderRadius: 10,
    elevation: 20,
  },
});
