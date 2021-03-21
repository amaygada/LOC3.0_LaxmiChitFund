import React from 'react'
import {View , Text , StyleSheet} from 'react-native'
import {Button , TextInput} from 'react-native-paper'
import {connect} from 'react-redux'
import CurvedHeader from './../../components/curved_header'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import {update_name} from './../../redux/actions'

class FP extends React.Component{
    state={
        name : ""
    }

    getHandler = key => value => {
        this.setState({[key]: value});
    }

    save = () => {
        this.props.update_name(this.state.name)
        this.props.navigation.navigate('Nav')
    }

    render(){
        return(
            <View>
                <CurvedHeader title="Name Itinerary"/>
                <TextInput
                    label="Name itinerary"
                    style={styles.input}
                    theme={themes.password_theme}
                    keyboardType="default"
                    mode="outlined"
                    value={this.state.name}
                    onChangeText={this.getHandler('name')}
                />
                <View style={styles.button_container}>
                    <Button
                        mode="contained"
                        color={colors.login_button_color}
                        style={styles.login_button}
                        onPress={this.save}>
                        Save
                    </Button>
                </View>
            </View>
        )
    }
}

export default connect(null , {update_name})(FP)

const styles = StyleSheet.create({
    input: {
      paddingHorizontal: wp('3%'),
      paddingTop: hp('1%'),
      marginTop : hp("10%")
    },
    login_button: {
      marginHorizontal: wp('3%'),
      marginVertical: hp('1.5%'),
      borderRadius: 20,
    },
    clear_button: {
      marginHorizontal: wp('3%'),
      marginVertical: hp('1.5%'),
    },
    button_container: {
      justifyContent: 'center',
      marginLeft: wp('12%'),
      marginRight: wp('12%'),
      marginTop: hp('7%'),
    },
    full_container: {
      flex: 1,
    },
    center_data: {
      flex: 5,
      alignContent: 'center',
      marginVertical: hp('8%'),
    },
  });
  
  const themes = {
    username_theme: {colors: {primary: '#1e5f74', underlineColor: 'transparent'}},
    password_theme: {colors: {primary: '#1e5f74', underlineColor: 'transparent'}},
  };
  
  const colors = {
    login_button_color: '#1e4f74',
    clear_button_color: '#1e4f74',
    header_background: '#1e4f74',
  };
  