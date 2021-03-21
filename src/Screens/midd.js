import React from 'react'
import {View , Text , TouchableOpacity , StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import {connect} from 'react-redux'
import Store from './../redux/store'
import CurvedHeader from './../components/curved_header'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

class MyIten extends React.Component{

    render(){
        return(
            <View>
                <CurvedHeader title="Choose"/>
                <CardComp desc="Check Itinerary" nav={()=>{}}/>
                <CardComp desc="Track Expenses" nav={()=>{this.props.navigation.navigate('Expense')}}/>
            </View>
        )
    }

}

class CardComp extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={this.props.nav}>
          <View style={styles.card}>
            <Text style={styles.inner_text}>{this.props.desc}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

export default connect(null , {})(MyIten)

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    card: {
      width: wp('90%'),
      height: hp('20%'),
      alignSelf: 'center',
      borderRadius: 20,
      backgroundColor: '#fff2df',
      margin: 10,
      elevation: 20,
      alignContent: 'center',
      justifyContent: 'center',
    },
    inner_text: {
      textAlign: 'center',
      color: '#000',
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
