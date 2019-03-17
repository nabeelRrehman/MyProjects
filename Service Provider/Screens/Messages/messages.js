import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import AppContainer from '../../Container/container';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { AddRequest } from '../../store/action/action'
import { TextField } from 'react-native-material-textfield';
import { KeyboardAvoidingView, ActivityIndicator, Alert, Animated } from 'react-native';
import ImageIcon from '../../assets/services.png'
import { BlurView } from 'expo';
import { Icon } from 'react-native-elements'
import SnackBar from 'react-native-snackbar-component'
import AwesomeAlert from 'react-native-awesome-alerts';
import starIcon from '../../assets/star.png'
import starColor from '../../assets/starColor.png'
import IconFont from 'react-native-vector-icons/FontAwesome'
import Icons from '../../assets/person-dummy.jpg'


class Messages extends Component {
    constructor() {
        super()

        this.state = {
        }
    }

    getUnique(arr, comp) {

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }

    componentDidMount() {
        const { allMessage, userUid, allUsers, adminMsg } = this.props

        if (allMessage) {
            var arr = []
            var messages = []
            console.log(allMessage, 'allmessages')
            allMessage.map((msgs) => {
                if (msgs.reciever === userUid) {
                    if (arr.indexOf(msgs.sender) === -1) {
                        arr.push(msgs.sender)
                    }
                    this.setState({ sender: arr }, () => {
                        this.state.sender.map((msg) => {
                            if (allUsers) {
                                allUsers.map((users) => {
                                    if (users.userUid === msg) {
                                        // if (messages.indexOf(users) === -1) {
                                        messages.push(users)
                                        this.setState({ messages: this.getUnique(messages, msg) })
                                        // }
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
        if (adminMsg) {
            var arr = []
            adminMsg.map((msgs) => {
                if (msgs.reciever === userUid) {
                    if (arr.indexOf(msgs.sender) === -1) {
                        arr.push(msgs.sender)
                    }
                    this.setState({ admin: arr })
                }
            })
        }
    }

    goMessages(items) {
        const data = items
        console.log(items, 'items from admin')
        this.props.navigation.navigate('Chat', { data })
    }

    messages(items) {
        console.log(items, 'itmes messages')
        return (
            <TouchableOpacity onPress={() => this.goMessages(items)}>
                <View style={styles.message}>
                    <View style={styles.ImageDiv}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={items.displayPic ? { uri: items.displayPic } : Icons}
                        // source={Icons}
                        />
                    </View>
                    <View style={styles.name}>
                        <View style={{

                        }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: '#2089dc' }}>
                                {items.name}
                            </Text>
                        </View>
                        <View style={{

                        }}>
                            <Text style={{ fontSize: 13, fontWeight: '300', color: 'grey' }}>
                                {items && items.email ? items.email : 'not available'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.forward}>
                        <Text style={{ color: 'grey', fontSize: 20, fontWeight: '200' }}>
                            {'>'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    goback() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    GoAdminMessages(items) {
        var obj = {
            userUid: items,
            name: 'Admin'
        }
        const data = obj
        console.log(items, 'items from admin')
        this.props.navigation.navigate('AdminChat', { data })
    }

    AdminMessages(items) {
        return (
            <TouchableOpacity onPress={() => this.GoAdminMessages(items)}>
                <View style={styles.message}>
                    <View style={styles.ImageDiv}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            // source={items.displayPic ? { uri: items.displayPic } : Icons}
                            source={Icons}
                        />
                    </View>
                    <View style={styles.name}>
                        <View style={{

                        }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: '#2089dc' }}>
                                {'Admin'}
                            </Text>
                        </View>
                        <View style={{

                        }}>
                            <Text style={{ fontSize: 13, fontWeight: '300', color: 'grey' }}>
                                {/* {items && items.email ? items.email : 'not available'} */}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.forward}>
                        <Text style={{ color: 'grey', fontSize: 20, fontWeight: '200' }}>
                            {'>'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { messages, admin } = this.state
        return (
            <AppContainer back={true} goBack={() => this.goback()} routeName={'Messages'}>
                <View style={styles.container}>
                    {
                        admin &&
                        admin.map((items) => {
                            return this.AdminMessages(items)
                        })

                    }
                    {
                        messages ?
                            messages.map((items) => {
                                return (
                                    this.messages(items)
                                )
                            })
                            :
                            <View style={{ flexGrow: 1, alignItems: 'center' }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>
                                    No messages
                            </Text>
                            </View>
                    }

                </View>
            </AppContainer >
        );
    }
}

const styles = StyleSheet.create({
    message: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingVertical: 7,
        paddingHorizontal: 5
    },
    forward: {
        // borderWidth: 1,
        paddingHorizontal: 10,
        // alignItems: 'center',
        alignSelf: 'center',
    },
    name: {
        flexGrow: 1,
        // borderWidth: 1,
        alignSelf: 'center',
        paddingHorizontal: 10
    },
    ImageDiv: {
        width: 70,
        height: 70,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2089dc'
    },
    container: {
        flexGrow: 1,
        // borderWidth: 3,
        borderColor: 'yellow',
    },
});


function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.CURRENTUSERUID,
        myRequest: state.authReducer.MYREQUEST,
        flag: state.authReducer.FLAG,
        userData: state.authReducer.USERDATA,
        allUsers: state.authReducer.ALLUSERS,
        allMessage: state.authReducer.ALLMESSAGES,
        modifyReq: state.authReducer.MODIFYREQ,
        adminMsg: state.authReducer.ADMINMSG,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            // AddRequest
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Messages);
