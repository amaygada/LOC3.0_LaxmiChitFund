import React from 'react'
import {View , Text , StyleSheet , PermissionsAndroid} from 'react-native'
import Map from './components/map'

export default class Map_test extends React.Component{

    render(){
        return(
            <View style={styles.page}>
                <Map long={72.911910} lat={19.094180} ></Map>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    container: {
      height: 300,
      width: 300,
      backgroundColor: "tomato"
    },
    map: {
      flex: 1
    }
  });

