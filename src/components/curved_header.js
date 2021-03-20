import React from 'react'
import {StyleSheet , View , Text} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class CurvedHeader extends React.Component{

    render(){
        return(
            <View style={styles.header_style}>
                <Text style={styles.header_title}>{this.props.title}</Text>
            </View>
        )
    }

}

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

