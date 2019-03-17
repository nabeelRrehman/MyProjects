import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import AppContainer from '../../Container/container';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addMessage } from '../../store/action/action'
import { TextField } from 'react-native-material-textfield';
import { TextInput } from 'react-native';
import ImageIcon from '../../assets/services.png'
import { BlurView } from 'expo';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from '../../assets/person-dummy.jpg'

class Chat extends Component {
    constructor() {
        super()

        this.state = {
            text: '',
        }
    }

    componentDidMount() {
        const { navigation, allMsg, flag } = this.props

        const data = navigation.getParam('data')
        this.setState({ data })
        console.log(data, 'datat herer')
        if (allMsg && allMsg.length || flag || !flag) {
            allMsg.sort((a, b) => {
                return a.time - b.time
            })
            this.setState({ allMsg })
            console.log(allMsg, 'allMsgmount')
        }
    }

    componentWillReceiveProps(props) {
        const { navigation, allMsg, flag } = props

        const data = navigation.getParam('data')
        this.setState({ data })
        console.log(data, 'datat herer')
        if (allMsg && allMsg.length || flag || !flag) {
            allMsg.sort((a, b) => {
                return a.time - b.time
            })
            console.log(allMsg, 'allMsgmount')
            this.setState({ allMsg })

        }
    }

    goback() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    request() {

    }

    senderDiv(item, index) {
        return (
            <View key={index} style={styles.senderDiv}>
                <View style={{ paddingRight: 20 }}>
                    <Text style={{ color: 'white' }}>
                        {item.message}
                    </Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ fontSize: 10, color: 'white' }}>
                        {new Date(item.time).toLocaleTimeString()}
                    </Text>
                </View>
            </View>
        )
    }

    recieverDiv(item, index) {
        return (
            <View key={index} style={styles.recieverDiv}>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ color: 'black' }}>
                        {item.message}
                    </Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ fontSize: 10, color: 'black' }}>
                        {new Date(item.time).toLocaleTimeString()}
                    </Text>
                </View>
            </View>
        )
    }

    messageSend() {
        const { text, data } = this.state

        if (text) {
            const { userUid } = this.props
            const { addMessage } = this.props.actions
            var obj = {
                sender: userUid,
                reciever: data.userUid,
                time: Date.now(),
                message: text
            }
            addMessage(obj).then(() => {

            })
        }
        this.setState({ text: '' })
    }

    sortMessageDiv(item, index) {
        const { userUid } = this.props
        const { data } = this.state
        if (item.sender === userUid && item.reciever === data.userUid) {
            return this.senderDiv(item, index)
        }
        else if (item.sender === data.userUid && item.reciever === userUid) {
            return this.recieverDiv(item, index)
        }
    }

    render() {
        const { text, data, allMsg } = this.state
        return (
            <AppContainer back={true} goBack={() => this.goback()} routeName={data && data.name}>
                <View style={styles.chat}>
                    <ScrollView
                        ref={'scrollView'}
                        onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}
                    >
                        {
                            allMsg &&
                                allMsg.length ?
                                allMsg.map((item, index) => {
                                    return this.sortMessageDiv(item, index)
                                })
                                :
                                <View style={{ alignItems: 'center', width: '100%', marginTop: 2 }}>
                                    <Text style={{ color: 'grey' }}>No chats</Text>
                                </View>
                        }
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <ScrollView style={{ width: '80%' }}>
                        <View style={{
                            paddingVertical: 5,
                            paddingHorizontal: 20,
                            flexGrow: 1,
                            borderColor: 'grey',
                            marginVertical: 5,
                            borderWidth: 1,
                            borderRadius: 40,
                            width: '100%',
                            height: 50,
                        }}>
                            <TextInput
                                multiline={true}
                                numberOfLines={3}
                                placeholder={'Enter Message'}
                                value={text}
                                onChangeText={(text) => this.setState({ text })}
                            />
                        </View>
                    </ScrollView>
                    <View style={{
                        width: '20%',
                        // borderWidth: 1,
                        // borderColor: 'green',
                        alignSelf: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 5
                    }}>
                        <TouchableOpacity onPress={() => this.messageSend()}>
                            <View style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#2089dc',
                                borderRadius: 40,
                            }}>
                                <Icon
                                    color={'white'}
                                    size={20}
                                    name={'send'}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </AppContainer >
        );
    }
}

const styles = StyleSheet.create({
    recieverDiv: {
        // borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 9,
        marginVertical: 2,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
        maxWidth: 200,
    },
    senderDiv: {
        // borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 9,
        marginVertical: 2,
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        backgroundColor: '#2089dc',
        paddingHorizontal: 15,
        maxWidth: 200,
    },
    footer: {
        borderWidth: 1,
        // height: '21%',
        // borderColor: 'red',
        flexDirection: 'row'
    },
    chat: {
        // borderWidth: 4,
        // borderColor: 'yellow',
        height: '78%',
        flexGrow: 1,
        paddingTop: 3,
        paddingHorizontal: 3,
        paddingBottom: 5,
    },
    request: {
        width: '100%',
        borderWidth: 1,
        alignItems: 'center',
    },

});


function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.CURRENTUSERUID,
        allMsg: state.authReducer.ALLMESSAGES,
        flag: state.authReducer.FLAG
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            addMessage
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
