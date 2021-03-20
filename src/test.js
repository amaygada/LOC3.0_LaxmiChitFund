import React from 'react'
import {Text , View , Image} from'react-native'
import {Button} from 'react-native-paper'
import {login , signup , get_cities_attr , get_image_city} from './api/api.js'
import {clear_user_data , change_log_status , clear_new} from './redux/actions.js'
import {connect} from 'react-redux'
import Store from './redux/store.js'

class Test extends React.Component{
    
    dabaao = async () => {
        try{
            const response = await get_cities_attr("Australia")
            console.log(response.data["suggestions"][1]["entities"])//use "web" for web compatible images
        }catch(e){
            console.log(e);
        }
    }

    logout = () => {
        this.props.clear_user_data({})
        this.props.change_log_status(false)
        this.props.clear_new({})
        this.props.navigation.navigate('Login')
    }

    render(){
        let im = {uri : "https://d13k13wj6adfdf.cloudfront.net/urban_areas/mumbai-03cddd9bd2.jpg"}
        return(
            <View>
                <Button onPress={this.dabaao}>dabao</Button>
                <Button onPress={this.logout}>logout</Button>
                <Image source= {im} style={{height : 200 , width : 200}}/>
            </View>
        )
    }
}

export default connect(null , {clear_user_data , change_log_status , clear_new})(Test)