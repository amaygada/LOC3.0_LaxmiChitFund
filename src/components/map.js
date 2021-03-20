import React from 'react'
import {View , Text , StyleSheet , PermissionsAndroid} from 'react-native'
import MapboxGL from "@react-native-mapbox-gl/maps";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
MapboxGL.setAccessToken("pk.eyJ1IjoiYW1heWdhZGEiLCJhIjoiY2ttZ2o5Y2dvMDRmYjJwbHNzNmxnYTRsOCJ9.IzUkDTDbkqa7SEbGWaDlDw");
MapboxGL.setConnected(true);

export default class Map extends React.Component{

    componentDidMount() {
        
        MapboxGL.setTelemetryEnabled(false);

        PermissionsAndroid.requestMultiple(
                    [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
                    {
                        title: 'Give Location Permission',
                    message: 'App needs location permission to find your position.'
                }
            ).then(granted => {
               // console.log(granted);
            }).catch(err => {
                //console.warn(err);
            });
    }

    render(){
        return(
            <View style={styles.page}>
                <MapboxGL.MapView style={styles.container} centerCoordinate={[0,0]}>
                <MapboxGL.Camera

                    zoomLevel={15}
                    animationMode={'flyTo'}
                    animationDuration={6000}
                    followUserMode={'normal'}
                    defaultSettings={{
                    centerCoordinate: [this.props.long , this.props.lat],
                    zoomLevel: 14
                    }}
                />
                <MapboxGL.PointAnnotation
                    key="pointAnnotation"
                    id="pointAnnotation"
                    coordinate={[this.props.long , this.props.lat]}>
                    <View style={{
                        height: 20, 
                        width: 20, 
                        backgroundColor: '#ff0000', 
                        borderRadius: 50, 
                        borderColor: '#fff', 
                        borderWidth: 3
                    }} />
                </MapboxGL.PointAnnotation>
                </MapboxGL.MapView>
            </View>
    
        )
    }
}

//72.911910,19.094180
const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: "#F5FCFF"
    },
    container: {
      height: hp("50%"),
      width: wp("100%"),
      backgroundColor: "tomato"
    },
    map: {
      flex: 1
    }
  });

