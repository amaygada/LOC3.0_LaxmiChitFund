import React from 'react'
import {View , Text , StyleSheet , Linking , Alert , Platform , TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Button} from 'react-native-paper'
import CurvedHeader from './../../components/curved_header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

let data = {
    "India" : {
        "p" : 100,
        "f" : 101,
        "a" : 102
    },
    "Australia" : {
        "p" : "000",
        "f" : "000",
        "a" : "000",
    },
    "Austria" : {
        "p" : 133,
        "f" : 144,
        "a" : 122
    },
    "France" : {
        "p" : 17,
        "f" : 18,
        "a" : 15
    },
    "Switzerland" : {
        "p" : 117,
        "f" : 118,
        "a" : 144
    }
}

class EM extends React.Component{

    callNumber = phone => {
        //console.log('callNumber ----> ', phone);
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
          phoneNumber = `telprompt:${phone}`;
        }
        else  {
          phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
        .then(supported => {
          if (!supported) {
            Alert.alert('Phone number is not available');
          } else {
            return Linking.openURL(phoneNumber);
          }
        })
        .catch(err => console.log(err));
      };

    render(){
        return(
            <View style = {{flex : 1 , backgroundColor:"#fff2df"}}>
                <CurvedHeader title="Emergency Contacts"/>
                <View style={{marginTop:hp("5%")}}>
                    <View style = {{flexDirection : 'row'}}>
                        <TouchableOpacity onPress={() => {this.callNumber(100)}}>
                            <View style = {{width : wp('45%') , height : wp('45%') , justifyContent:'center', alignItems:'center' , marginHorizontal:wp("2.5%") , borderRadius : 10 ,marginTop: wp('5%'), backgroundColor : "#D4CAA3" , elevation:20}}>
                                <Icon name={'police-badge'} color='#bb8082' size={50} />
                                <Text style={{color : "#000" , fontSize : 20}}>Police</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.callNumber(101)}}>
                            <View style = {{width : wp('45%') , justifyContent:'center', alignItems:'center' , height : wp('45%') , marginHorizontal:wp("2.5%") , borderRadius : 10 ,marginTop: wp('5%'), backgroundColor : "#bb8082" , elevation:20}}>
                                <Icon name={'fire-truck'} color='#D4CAA3' size={50} />
                                <Text style={{color : "#fff" , fontSize : 20}}>Fire Rescue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <TouchableOpacity onPress={()=>{this.callNumber(102)}}>
                            <View style = {{width : wp('45%') , height : wp('45%') , justifyContent:'center', alignItems:'center' , marginHorizontal:wp("2.5%") , marginTop: wp('5%'), borderRadius : 10 , backgroundColor : "#bb8082" , elevation:20}}>
                                <Icon name={'ambulance'} color='#D4CAA3' size={50} />
                                <Text style={{color : "#fff" , fontSize : 20}}>Ambulance</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{}}>
                            <View style = {{width : wp('45%') , height : wp('45%') , justifyContent:'center', alignItems:'center' , marginHorizontal:wp("2.5%") , marginTop: wp('5%'), backgroundColor : "#D4CAA3", borderRadius : 10 , elevation:20}}>
                                <Icon name={'plus'} color='#bb8082' size={50} />
                                <Text style={{color : "#000" , fontSize : 20}}>Add</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(null , {})(EM)