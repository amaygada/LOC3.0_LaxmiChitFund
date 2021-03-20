import React, {Component} from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import {FAB} from 'react-native-paper';
import CityComponent from '../../components/CityComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {add_hotels_to_new} from './../../redux/actions';
import {get_hotels, get_hotel_photo} from './../../api/api';
import Loader from '../../components/loader';

const HEADER_MAX_HEIGHT = hp('45%');
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : hp('15%');
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

let price_list = [4999, 5499, 10999, 9999, 29999, 3499, 12999, 6999];

class Hotel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      loading: true,
    };
  }

  get_cities_and_attr = async () => {
    try {
      let a = this.props._new.deets.start_date;
      let b = this.props._new.deets.end_date;
      let p = a.getMonth() + 1;
      let q = b.getMonth() + 1;
      p = a.getFullYear() + '-' + '0' + p + '-' + a.getDate();
      q = b.getFullYear() + '-' + '0' + q + '-' + b.getDate();
      let ll = [];
      const response = await get_hotels(
        this.props.route.params.did,
        p,
        q,
        this.props._new.deets.number_of_people,
      );
      console.log(p, q);
      let extracted = response.data.data.body['searchResults'].results;
      let count = 0;
      for (let i of extracted) {
        let o = {
          address:
            i.address.countryCode +
            ' ' +
            i.address.streetAddress +
            ' ' +
            i.address.locality +
            ' ' +
            i.address.postalCode +
            ' ' +
            i.address.countryName,
          coordinates: {lat: i.coordinate.lat, long: i.coordinate.lon},
          name: i.name,
          lat: i.coordinate.lat,
          long: i.coordinate.lon,
          price: price_list[count],
          star: i.starRating,
          id: i.id,
          im: 'None',
        };
        count += 1;
        let r = '';
        if (count < 8) {
          r = await get_hotel_photo(i.id);
          o['im'] = r.data.hotelImages[0]['baseUrl'].replace(/(_{size})/gi, '');
        } else {
          break;
        }
        ll.push(o);
      }
      console.log(ll); //this is the list with all deets
      await this.props.add_hotels_to_new(ll); // this is redux part
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.get_cities_and_attr();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  callback = obj => {
    console.log('callback');
    this.props.navigation.navigate('Indivisual Hotel', {obj});
  };

  _renderScrollViewContent() {
    const data = this.props._new.hotels;

    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <CityComponent
            obj={_}
            city={_.name}
            caption={_.address}
            image={_.im}
            callback={this.callback}
          />
        ))}
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.Test
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    if (typeof this.props._new.hotels !== 'undefined') {
      return (
        <View style={styles.fill}>
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor="rgba(0, 0, 0, 0.251)"
          />
          <Animated.ScrollView
            style={styles.fill}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
              {useNativeDriver: true},
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({refreshing: true});
                  setTimeout(() => this.setState({refreshing: false}), 1000);
                }}
                // Android offset for RefreshControl
                progressViewOffset={HEADER_MAX_HEIGHT}
              />
            }
            // iOS offset for RefreshControl
            contentInset={{
              top: HEADER_MAX_HEIGHT,
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT,
            }}>
            {this._renderScrollViewContent()}
          </Animated.ScrollView>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.header,
              {transform: [{translateY: headerTranslate}]},
            ]}>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{translateY: imageTranslate}],
                },
              ]}
              source={require('../../images/hotel_top.jpeg')}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.bar,
              {
                transform: [{scale: titleScale}, {translateY: titleTranslate}],
              },
            ]}>
            <Text style={styles.title}>Hotels</Text>
          </Animated.View>
          <FAB
            style={styles.fab}
            small={false}
            icon="message-text-outline"
            onPress={() => console.log('Pressed')}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Loader />
          </View>
        </View>
      );
    }
  }
}

const msp = state => ({
  _new: state.new,
});

export default connect(msp, {add_hotels_to_new})(Hotel);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: hp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 30,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
