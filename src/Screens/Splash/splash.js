import React, { Component } from 'react';  
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native'; 
import {connect} from 'react-redux'
import Store from './../../redux/store'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

 class Splash extends React.Component{
   
    state={
       isVisible : true
    }
    
    Hide_Splash_Screen=()=>{  
        if(Store.getState().log){
            this.props.navigation.navigate('Nav')
        }else{
            this.props.navigation.navigate('Login')
        }    
    }
  
    componentDidMount(){  
        var that = this;  
        setTimeout(function(){  
          that.Hide_Splash_Screen();  
        }, 3000);  
    }

    render()  
    {  
        let image = require('./../../images/select_country.png')
        return(
            <View style={styles.full_container}>
                <View style={styles.inner_container}>
                    <Image source={image} style={styles.image}/>
                    <Text style={styles.cotton_text}>TRAVEL</Text>
                    <Text style={styles.cotton_text_2}>BUDDY</Text>
                </View>
            </View>
        )
          
    }
}

export default connect(null,{})(Splash)

const styles = StyleSheet.create({
    full_container : {
        flex:1,
        backgroundColor : "#1e5f74",
        justifyContent: 'center',
        alignItems : 'center'
    },
    inner_container : {
        justifyContent: 'center',
        alignItems : 'center'
    },
    image: {
        alignSelf: 'center',
        width: hp("30%"),
        height: hp("30%"),
        backgroundColor: 'transparent'
    },
    cotton_text : {
        color : "#fff",
        fontSize : 43,
        fontWeight:"600",
        marginTop : 50,
    },
    cotton_text_2 : {
        color : "#fff",
        fontSize : 43,
        fontWeight:"600",
        marginTop : 2,
    },
})
