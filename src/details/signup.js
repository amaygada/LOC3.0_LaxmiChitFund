import * as React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {Button, TextInput, ActivityIndicator , HelperText , Card} from 'react-native-paper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'
import {user_signin_info_store} from './../redux/actions.js'
import CurvedHeader from './../components/curved_header.js'

class Signup extends React.Component{
    state = {
        first_name : "",
        last_name : "",
        email : "",
        password : "",
        confirm_password : "",

        fn_val : true,
        ln_val : true,
        email_val : true,
        password_val : true,
        confirm_password_val : true,

        disableLogin : true
    }

    getHandler = key => value =>{
        this.setState({[key] : value})
        
        const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/
        const fn_regex = /^[a-zA-Z]{2}[a-zA-Z]+$/
        const ln_regex = /^[a-zA-Z]{2}[a-zA-Z]+$/
        const mobile_regex = /^[789][0-9]{9}$/
        const aadhaar_regex = /^[0-9]{12}$/
        const pin_regex = /^[0-9]+$/
    
        if(key === 'email' && !emailRegx.exec(value.toString().toLowerCase())) this.setState({email_val : true})
        else if(key === 'email' && emailRegx.exec(value.toString().toLowerCase())) this.setState({email_val : false})
        
        if(key === 'first_name' && !fn_regex.exec(value.toString())) this.setState({fn_val : true})
        else if(key === 'first_name' && fn_regex.exec(value.toString())) this.setState({fn_val : false})

        if(key === 'last_name' && !ln_regex.exec(value.toString())) this.setState({ln_val : true})
        else if(key === 'last_name' && ln_regex.exec(value.toString())) this.setState({ln_val : false})
        
        // if(key === 'mobile' && !mobile_regex.exec(value.toString())) this.setState({mobile_val : true})
        // else if(key === 'mobile' && mobile_regex.exec(value.toString())) this.setState({mobile_val : false})
        
        // if(key === 'aadhaar' && !aadhaar_regex.exec(value.toString())) this.setState({aadhaar_val : true})
        // else if(key === 'aadhaar' && aadhaar_regex.exec(value.toString())) this.setState({aadhaar_val : false})

        // if(key === 'pin' && !pin_regex.exec(value.toString())) this.setState({pin_val : true})
        // else if(key === 'pin' && pin_regex.exec(value.toString())) this.setState({pin_val : false})

        if(key === 'password' && !passwordRegx.exec(value.toString())) this.setState({password_val : true})
        else if(key === 'password' && passwordRegx.exec(value.toString())) this.setState({password_val : false})
        
        if(key === 'confirm_password' && this.state.password !== value) this.setState({confirm_password_val : true})
        else if(key === 'confirm_password' && this.state.password === value) this.setState({confirm_password_val : false})
    }

    handle_selected = (value , index , data) =>{
        if(this.state.state !== value){
            //console.log(value)
            this.setState({state:value})
        }
    }

    validate = () => {
        
        if(!this.state.fn_val && !this.state.ln_val && !this.state.email_val && !this.state.confirm_password_val && !this.state.password_val){
            this.setState({disableLogin : false})
        }
    }

    next = () => {
        let obj = {
            "name" : this.state.first_name + " " + this.state.last_name,
            "email":this.state.email,
            "password": this.state.password
        }
        this.props.user_signin_info_store(obj);
        console.log('Sign in done')
    }

    states_arr = [{value : "Andaman and Nicobar Islands"}, {value :"Andhra Pradesh"}, {value :"Arunachal Pradesh"}, {value :"Assam"}, {value :"Bihar"}, {value :"Chandigarh"}, {value :"Chhattisgarh"}, {value :"Dadra and Nagar Haveli"}, {value :"Daman and Diu"}, {value :"Delhi"}, {value :"Goa"}, {value :"Gujarat"}, {value :"Haryana"}, {value :"Himachal Pradesh"}, {value :"Jammu and Kashmir"}, {value :"Jharkhand"}, {value :"Karnataka"}, {value :"Kerala"}, {value :"Lakshadweep"}, {value :"Madhya Pradesh"}, {value :"Maharashtra"}, {value :"Manipur"}, {value :"Meghalaya"}, {value :"Mizoram"}, {value :"Nagaland"}, {value :"Orissa"}, {value :"Pondicherry"}, {value :"Punjab"}, {value :"Rajasthan"}, {value :"Sikkim"}, {value :"Tamil Nadu"}, {value :"Tripura"}, {value :"Uttaranchal"}, {value :"Uttar Pradesh"}, {value :"West Bengal"}]

    render(){
        //console.log(this.state.state)
        return(
            <View style={{flex:1}}>
                <CurvedHeader title="Sign Up"/>

                <View style={styles.center_data}>
                <ScrollView style = {{marginTop : 5}}>
                    <TextBoxComp keyb="default" label = "First Name" value={this.state.first_name.toString()} getHandler={this.getHandler} state_change={"first_name"} helper_bool={this.state.fn_val} helper_text="* Must be atleast 3 characters long"/>
                    <TextBoxComp keyb="default" label = "Last Name" value={this.state.last_name.toString()} getHandler={this.getHandler} state_change={"last_name"} helper_bool={this.state.ln_val} helper_text="* Must be atleast 3 characters long"/>
                    <TextBoxComp keyb="default" label = "Email" value={this.state.email.toString()} getHandler={this.getHandler} state_change={"email"} helper_bool={this.state.email_val} helper_text="* Enter valid email"/>
                    <TextBoxComp keyb="password" label = "Password" value={this.state.password.toString()} getHandler={this.getHandler} state_change={"password"} helper_bool={this.state.password_val} helper_text="* Password must be 8 characters long"/>
                    <TextBoxComp keyb="password" label = "Confirm Password" value={this.state.confirm_password.toString()} getHandler={this.getHandler} state_change={"confirm_password"} helper_bool={this.state.confirm_password_val} helper_text="* Passwords don't match"/>
                    <View style={styles.button_container}>
                        <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.next}>Sign Up</Button>
                    </View>
                </ScrollView>
                </View>
            </View>
        )
    }

    componentDidUpdate= (prevProps , prevState)=>{
        if(prevState.email !== this.state.email || prevState.password !== this.state.password || prevState.confirm_password !== this.state.confirm_password || prevState.pin !== this.state.pin || prevState.first_name !== this.state.first_name || prevState.last_name !== this.state.last_name || prevState.state !== this.state.state || prevState.mobile !== this.state.mobile || prevState.aadhaar !== this.state.aadhaar){
            this.validate();
        }
    }
}

let TextBoxComp = props => {
    if(props.keyb !== "password"){
        return(
            <View>
                <TextInput label={props.label} style={styles.input} theme={themes.username_theme} keyboardType={props.keyb} mode="outlined" value={props.value.trim()} onChangeText={props.getHandler(props.state_change.toString())}/>
                <HelperText type="info" visible={props.helper_bool}>{props.helper_text}</HelperText>
            </View>
        )
    }else if(props.keyb === "password"){
        return(
            <View>
                <TextInput label={props.label} style={styles.input} secureTextEntry={true} theme={themes.username_theme} keyboardType="default" mode="outlined" value={props.value.trim()} onChangeText={props.getHandler(props.state_change.toString())}/>
                <HelperText type="info" visible={props.helper_bool}>{props.helper_text}</HelperText>
            </View>
        )
    }
}

// class Dropdown_comp extends React.Component {
//     state = {
//         height : 0
//     }

//     render(){
//         //console.log('hi')
//         const {width , height} = Dimensions.get('window')
//         return(
//             <Card style = {styles.dropdown}>
//                 <View onLayout={event => {
//                     const layout = event.nativeEvent.layout;
//                     //console.log('height:', layout.height);
//                     if(!this.state.update){this.setState({height : layout.height})}}}>
//                     <Dropdown
//                         label={this.props.label}
//                         data={this.props.data}
//                         dropdownOffset = {{top:(this.state.height + 24) , left:0}}
//                         onChangeText={this.props.handle_selected}
//                         dropdownMargins={{min:width*0.05 , max:width*0.05}}
//                     />
//                 </View>
//             </Card>
//         )
//     }    
// }

const msp = state => ({
    sign : state.sign
})

export default connect(msp , {user_signin_info_store})(Signup)

const styles = StyleSheet.create({
    input:{
        paddingHorizontal:wp('3%'),
        paddingTop:hp('1%'),
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
})

const themes = {
    username_theme: { colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    password_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
}

const colors = {
    login_button_color:"#1e4f74",
    clear_button_color:"#1e4f74",
}