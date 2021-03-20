import React from 'react'
import {View , Text , StyleSheet , TouchableOpacity , FlatList} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {Card , FAB} from 'react-native-paper'
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import CurvedHeader from './../components/curved_header'
import Store from './../redux/store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class Expense extends React.Component{

    state = {
        data_i:[]
    }

    get_data = () => {
        this.setState({data_i : Store.getState().expense})
    }

    componentDidMount(){
        this.get_data();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.get_data();
        });
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    render(){
        //console.log(Store.getState())
        return(
            <View style={{flex:1}}>
                <CurvedHeader title="Track Expense"/>
                
                <FlatList
                    style={{flex:1}}
                    data = {this.state.data_i}
                    renderItem = {({item}) => {
                        if(typeof(item) !== 'undefined'){
                            return(
                                <ExpComp date={item.date} amount={item.amount} reason={item.reason}/>  
                            )
                        }else{
                            return(
                                <View></View>
                            )
                        }
                    }}
                    keyExtractor = {item=> item._id}
                />
                
                <View style={styles.fixedView}>
                    <FAB
                        style={styles.fab}
                        large
                        color="#fff2df"
                        icon="plus"
                        onPress={() => {this.props.navigation.navigate(("Add Expense"))}}
                    />
                </View>

            </View>
        )
    }
}

export default connect(null , {})(Expense)

class ExpComp extends React.Component{
    
    render(){
        return(
            <Card style = {styles.card}>
            <View style={{padding : 10}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Text style={styles.date}>{this.props.date}</Text>
                        </View>
                        <Text style={styles.price}>Rs {this.props.amount}</Text>
                    </View>
                    <View>
                        <Text style={styles.reason}>{this.props.reason}</Text>
                    </View>
            </View>
        </Card>
        )
    }
}

const styles = StyleSheet.create({
    card : {
        borderRadius : 10,
        marginHorizontal : wp("3%"),
        marginVertical : hp("1%"),
        elevation : 20,
        backgroundColor : "#fff2df"
    },
    date:{
        justifyContent : 'flex-start',
        fontSize : 20,
        padding : 3,
        color : "#212020"
    },
    price : {
        justifyContent : 'flex-end',
        fontSize : 20,
        padding : 3,
        marginRight : 20,
        color : "#212020"
    },
    reason : {
        padding : 3 ,
        fontSize : 22,
        color : "#212020"
    },
    fixedView : {
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: hp("2%"),
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    fab: {
        marginRight: 16,
        backgroundColor: '#bb8082',
      },

})

//p = a.getFullYear() + '-' + '0' + p + '-' +  a.getDate()