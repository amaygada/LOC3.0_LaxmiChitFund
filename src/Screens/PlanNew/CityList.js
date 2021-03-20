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
import {ActivityIndicator} from 'react-native-paper';
import CityComponent from '../../components/CityComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {add_cities_to_new} from './../../redux/actions';
import {get_cities_attr, get_image_city} from './../../api/api';

const HEADER_MAX_HEIGHT = hp('45%');
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : hp('15%');
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class App extends Component {
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
      let ll = [];
      const response = await get_cities_attr(this.props._new.country);
      console.log(response['data']['suggestions'][0]['entities']);
      let extracted = response['data']['suggestions'][0]['entities'];
      for (let i of extracted) {
        if (i.type === 'CITY') {
          let im = '';
          try {
            const response = await get_image_city(i.name.toLowerCase());
            im = response['data']['photos'][0]['image']['mobile']; //use "web" for web compatible images
          } catch (e) {
            im = 'None';
            console.log(e);
          }
          let o = {
            name: i.name,
            lat: i.latitude,
            long: i.longitude,
            image_uri: im,
            destinationId: i.destinationId,
            caption: i.caption.replace(/(<([^>]+)>)/gi, ''),
          };
          ll.push(o);
        }
      }
      console.log(ll); //this is the list with all deets
      await this.props.add_cities_to_new(ll); // this is redux part
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
    this.props.navigation.navigate('Indivisual City', {obj});
  };

  _renderScrollViewContent() {
    const data = this.props._new.cities;

    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <CityComponent
            obj={_}
            city={_.name}
            caption={_.caption}
            image={_.image_uri}
            callback={this.callback}
          />
        ))}
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
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

    if (typeof this.props._new.cities !== 'undefined') {
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
              source={require('../../images/cityBG.jpg')}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.bar,
              {
                transform: [{scale: titleScale}, {translateY: titleTranslate}],
              },
            ]}>
            <Text style={styles.title}>Cities</Text>
          </Animated.View>
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
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              style={{alignSelf: 'center'}}
              animating={typeof this.props._new.cities === 'undefined'}
              color="#1e5f74"
              size="small"
            />
          </View>
        </View>
      );
    }
  }
}
const msp = state => ({
  _new: state.new,
});
export default connect(msp, {add_cities_to_new})(App);

const styles = StyleSheet.create({
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
