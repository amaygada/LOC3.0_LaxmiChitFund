import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from 'react-native-paper'
import DatePicker from 'react-native-date-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { FAB , TextInput , HelperText} from 'react-native-paper';
import {connect} from 'react-redux'
import {add_expense, set_expense} from './../redux/actions'
const bgColor = '#fff2df';
const blueColor = '#1e4f74';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class AddExpense extends React.Component {
    state = {
        date : new Date(),
        reason : "",
        amount : "",
        payment_mode : ""
    }

    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    add = () => {
        if(this.reason === "" && this.amount === ""){alert('Please fill all fields'); return; }
        else{
            let a = this.state.date
            let p = a.getMonth() + 1
            p = a.getFullYear() + '-' + '0' + p + '-' +  a.getDate()
            this.props.add_expense({"date" : p , "reason" : this.state.reason , "amount" : this.state.amount})
            //this.props.set_expense([])
            this.props.navigation.navigate('Expense')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header_style}>
                    <Text style={styles.header_title}>Add Expense</Text>
                </View>
                <TouchableOpacity style={{alignSelf:'center',alignContent:'center', justifyContent:'center' , marginTop:10 , width:100 , height:100 , borderColor:"#2a2a2a" , borderWidth:1}}>
                    <Icon name={'camera'} color='#bb8082' size={50} style={{alignSelf:'center' , alignContent:'center' , justifyContent:'center'}}/>
                </TouchableOpacity>
                <Button labelStyle={{color: '#1e5f74'}}>ADD BILL IMAGE</Button>

                <View style = {{marginTop : hp("0%")}}>
                    <TextBoxComp keyb="number-pad" label = "Amount" value={this.state.amount.toString()} getHandler={this.getHandler} state_change="amount" helper_bool={true} helper_text="* Enter amount spent"/>
                    <TextBoxComp keyb="default" label = "Reason" value={this.state.reason.toString()} getHandler={this.getHandler} state_change="reason" helper_bool={true} helper_text="* Enter reasn for expenditure"/>
                </View>
                <Button labelStyle={{color: '#1e5f74'}}> Enter Expense Date</Button>
                <DatePicker
                    style={{marginHorizontal: 10 , alignSelf : 'center'}}
                    date={this.state.date}
                    onDateChange={val => {
                    this.setState({date: val});
                    }}
                />
                <View style={styles.button_container}>
                    <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.add}>Add Expense</Button>
                </View>
            </View>
        )
    }
}

let TextBoxComp = props => {
    if(props.keyb !== "password"){
        return(
            <View>
                <TextInput label={props.label} style={styles.input} theme={themes.username_theme} keyboardType={props.keyb} mode="outlined" value={props.value} onChangeText={props.getHandler(props.state_change.toString())}/>
                <HelperText type="info" visible={props.helper_bool}>{props.helper_text}</HelperText>
            </View>
        )
    }else if(props.keyb === "password"){
        return(
            <View>
                <TextInput label={props.label} style={styles.input} secureTextEntry={true} theme={themes.username_theme} keyboardType="default" mode="outlined" value={props.value} onChangeText={props.getHandler(props.state_change.toString())}/>
                <HelperText type="info" visible={props.helper_bool}>{props.helper_text}</HelperText>
            </View>
        )
    }
}

export default connect(null , {add_expense , set_expense})(AddExpense)

const styles = StyleSheet.create({
    container : {
        backgroundColor : "#fff2df",
        flex:1
    },
    input:{
        paddingHorizontal:wp('3%'),
        elevation:6
    },
    login_button:{
        marginHorizontal:wp('3%'),
        marginBottom:hp('1.5%'),
        borderRadius : 20
    },
    clear_button:{
        marginHorizontal:wp('3%'),
        marginVertical:hp('1.5%')
    },
    button_container:{
        justifyContent:'center', 
        marginLeft:wp('12%'), 
        marginRight:wp('12%'), 
        marginVertical:hp('4%')
    },
    full_container:{
        flex:1,
    },
    center_data:{
        flex:5,
        alignContent:'center',
        marginVertical : hp("1%")
    },
    dropdown: {
        marginHorizontal:wp('3.2%'),
        marginVertical:hp('1.5%'), 
        backgroundColor:"#f5f5f5",
        paddingHorizontal:wp('3%'),
        elevation:6,
        borderRadius:5,
        borderColor : '#aeaeae',
        borderWidth : 1
    },
    card_title:{
        fontSize:hp('2.5%'),
        fontWeight:"500",
        marginTop:hp('2%'),
        marginHorizontal:wp('2%'),
        alignSelf:'auto'
    },
    header_style : {
        height : hp('20%'),
        backgroundColor : "#1e5f7f",
        borderBottomLeftRadius  :50,
        borderBottomRightRadius : 50,
        alignContent : 'flex-start',
        alignItems : 'flex-start',
        justifyContent : 'flex-end'
    },
    header_title : {
        color : "#fff",
        fontWeight : "500",
        alignSelf : 'center',
        marginVertical : hp("2.5%"),
        fontSize : 30
    }
})

const themes = {
    username_theme: { colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    password_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
}

const colors = {
    login_button_color:"#1e4f74",
    clear_button_color:"#1e4f74",
}