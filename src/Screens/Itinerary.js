import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Title, Subheading, Paragraph} from 'react-native-paper';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: '#fe7013',
};

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      total: 5,
      l : []
    };
    let k = this.props.it
    let a = []
    a[0] = k[2]
    a[1] = k[0]
    a[2] = k[1]
    this.state.l = a
  }

  getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
      name: 'feed',
      color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 15,
    };

    switch (position) {
      case 0: {
        iconConfig.name = 'bed';
        break;
      }

      default: {
        iconConfig.name = 'map-marker-outline';

        break;
      }
    }
    return iconConfig;
  };

  renderLabel = params => (
    <View
      style={{
        position: 'absolute',
        left: wp('3%'),
      }}>
      <Text style={[styles.big]}>{params.label}</Text>
      
      {params.position === 3 ? (
        <View>
          <Subheading style={{fontSize: 15}}>
            {this.state.l[0].deets.name}
          </Subheading>
          <Paragraph style={{fontSize: 13}}>
            {this.state.l[0].end_date}
          </Paragraph>
        </View>
      ) : params.position!==0 ? ( 
        <View>
          <Subheading style={{fontSize: 15}}>
            {this.state.l[params.position].deets.name}
          </Subheading>
          <Subheading style={{fontSize: 13}}>
            {this.state.l[params.position].date}
          </Subheading>
        </View>
      ):(
        <View>
          <Subheading style={{fontSize: 15}}>
            {this.state.l[0].deets.name}
          </Subheading>
          <Paragraph style={{fontSize: 13}}>
            {this.state.l[0].start_date}
          </Paragraph>
        </View>
      )}
    </View>
  );

  renderStepIndicator = params => (
    <Icon {...this.getStepIndicatorIconConfig(params)} />
  );

  render() {
    //console.log(JSON.stringify(this.props.it));
    const labels = ['Hotel Check-In'];
    this.props.it.forEach(element => {
      if (element.type === 'landmark') {
        labels.push(element.deets.name);
      }
    });
    labels.push('Hotel Check-Out');
    console.log(labels);

    return (
      <View style={styles.container}>
        <View style={styles.header_style}>
          <Text style={styles.header_title}>My Itinerary</Text>
        </View>
        <View style={styles.tracker}>
          <StepIndicator
            direction="vertical"
            stepCount={labels.length}
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={labels}
            renderStepIndicator={this.renderStepIndicator}
            renderLabel={this.renderLabel}
          />
        </View>
      </View>
    );
  }
}
const msp = state => ({
  it: state.itenary,
});
export default connect(msp, {})(Itinerary);

const styles = StyleSheet.create({
  tracker: {
    marginLeft: wp('15%'),
    marginRight: wp('15%'),
    flex: 1,
  },
  big: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    textAlign: 'left',
  },
  header_style: {
    height: hp('20%'),
    backgroundColor: '#1e5f7f',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  header_title: {
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: hp('2.5%'),
    fontSize: 30,
  },
});
