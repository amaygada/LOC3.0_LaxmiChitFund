import React from 'react'
import {Text , View} from'react-native'
import {Button} from 'react-native-paper'
import {login , signup , get_api_token} from './api/api.js'
import {clear_user_data , change_log_status} from './redux/actions.js'
import {connect} from 'react-redux'
import Store from './redux/store.js'

class Test extends React.Component{
    
    dabaao = async () => {
        try{
            const response = await get_api_token('Delhi')
            console.log(response)
        }catch(e){
            console.log(e);
        }
    }

    logout = () => {
        this.props.clear_user_data({})
        this.props.change_log_status(false)
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View>
                <Button onPress={this.dabaao}>dabao</Button>
                <Button onPress={this.logout}>logout</Button>
            </View>
        )
    }
}

export default connect(null , {clear_user_data , change_log_status})(Test)