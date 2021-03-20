import React from 'react'
import {Card} from 'react-native-paper'
import {View , Text , StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Options extends React.Component{

    plan_new = () => {

    }

    current_holiday = () => {

    }

    past_holiday = () => {

    }

    render(){
        return(
            <View style={{flex:1 , backgroundColor:colors.bg , justifyContent : 'center' , alignContent : 'center'}}>
                <CardComp desc="Plan New" nav={this.plan_new}/>
                <CardComp desc="Current Holiday" nav ={this.current_holiday}/>
                <CardComp desc="Past Holiday" nav = {this.past_holiday}/>
            </View>
        )
    }
}

class CardComp extends React.Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.nav}>
                <View style = {styles.card}>
                    <Text style={styles.inner_text}>{this.props.desc}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default connect(null , {})(Options) 

const colors = {
    "bg" : "#fff2df"
}

const styles = StyleSheet.create({
    card : {
        width : wp("90%"),
        height : hp("25%"),
        alignSelf : 'center',
        borderRadius : 20,
        backgroundColor : "#bb8082",
        margin:10,
        elevation : 20,
        alignContent : 'center',
        justifyContent : 'center'
    },
    inner_text:{
        textAlign : 'center',
        color : "#fff",
        justifyContent : 'center',
        alignSelf : 'center',
        alignContent : 'center',
        fontSize : 30,
        fontWeight : "bold"
    }
})

