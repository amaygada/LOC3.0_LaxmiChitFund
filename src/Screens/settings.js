import React from 'react'
import {View , Text , TouchableOpacity , StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {clear_user_data , change_log_status , clear_new} from './../redux/actions'


class Settings extends React.Component{

    logout = () => {
        this.props.clear_user_data({})
        this.props.change_log_status(false)
        this.props.clear_new({})
        this.props.navigation.navigate('Login')
    }

    // update_deets = () => {
    //     this.props.navigation.navigate('UpdateDetails')
    // }

    render(){
        return(
            <View style = {{flex : 1 , backgroundColor:"#fff2df"}}>

                <View style={styles.header_style}>
                    <Text style={styles.header_title}>Settings</Text>
                </View>

                <View style={{marginTop:hp("5%")}}>
                    <View style = {{flexDirection : 'row'}}>
                        <TouchableOpacity onPress={() => {}}>
                            <View style = {{width : wp('45%') , height : wp('45%') , justifyContent:'center', alignItems:'center' , marginHorizontal:wp("2.5%") , borderRadius : 10 ,marginTop: wp('5%'), backgroundColor : "#D4CAA3" , elevation:20}}>
                                <Icon name={'ambulance'} color='#bb8082' size={50} />
                                <Text style={{color : "#000" , fontSize : 20}}>Emergency</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{}}>
                            <View style = {{width : wp('45%') , justifyContent:'center', alignItems:'center' , height : wp('45%') , marginHorizontal:wp("2.5%") , borderRadius : 10 ,marginTop: wp('5%'), backgroundColor : "#bb8082" , elevation:20}}>
                                <Icon name={'home-city'} color='#D4CAA3' size={50} />
                                <Text style={{color : "#fff" , fontSize : 20}}>Home</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <TouchableOpacity>
                            <View style = {{width : wp('45%') , height : wp('45%') , justifyContent:'center', alignItems:'center' , marginHorizontal:wp("2.5%") , marginTop: wp('5%'), borderRadius : 10 , backgroundColor : "#bb8082" , elevation:20}}>
                                <Icon name={'translate'} color='#D4CAA3' size={50} />
                                <Text style={{color : "#fff" , fontSize : 20}}>Translate</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.logout}>
                            <View style = {{width : wp('45%') , height : wp('45%') , justifyContent:'center', alignItems:'center' , marginHorizontal:wp("2.5%") , marginTop: wp('5%'), backgroundColor : "#D4CAA3", borderRadius : 10 , elevation:20}}>
                                <Icon name={'account-off'} color='#bb8082' size={50} />
                                <Text style={{color : "#000" , fontSize : 20}}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(null , {clear_user_data , change_log_status , clear_new})(Settings)

const styles = StyleSheet.create({
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

