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
import { BlurView, Permissions, Contacts } from 'expo';
import { Icon } from 'react-native-elements'
import SnackBar from 'react-native-snackbar-component'
import AwesomeAlert from 'react-native-awesome-alerts';
import ServiceIcon from '../../assets/services.png'
import starIcon from '../../assets/star.png'
import starColor from '../../assets/starColor.png'
import IconFont from 'react-native-vector-icons/FontAwesome'
import Icons from '../../assets/person-dummy.jpg'


class Contact extends Component {
    constructor() {
        super()

        this.state = {
        }
    }

    componentDidMount() {
        const { contacts, allUsers, userUid } = this.props

        if (contacts && allUsers) {
            var arr = []
            allUsers.map((users) => {
                contacts.map((contacts) => {
                    if (users.phoneNo === contacts.obj.number &&
                        users.userUid !== userUid && users.services) {
                        if (arr.indexOf(users) === -1) {
                            // console.log(contacts, 'constcat here')
                            arr.push(users)
                            this.setState({ contacts: arr })
                        }
                    }
                })
            })
        }

    }

    goback() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    makeOffer(index) {
        this.setState({ offer: true, indexNum: index })
    }

    request = (items) => {
        const { data, rate } = this.state
        const { userUid } = this.props
        // console.log(data, 'data here', userUid)
        if (items && userUid && rate) {
            const { AddRequest } = this.props.actions
            var obj = {
                OfferTo: items.userUid,
                OfferFrom: userUid,
                status: 'pending',
                rate,
                seen: false,
                time: Date.now()
            }
            AddRequest(obj).then(() => {
                this.setState({ sent: true })

                setTimeout(() => {
                    this.setState({ sent: false })
                }, 1500);
            })

        }
        this.setState({
            showAlert: false,
            offer: false,
            rate: ''
        });
    }

    details(items) {
        const { navigate } = this.props.navigation
        // console.log('items here ', items)
        navigate('Details', { items })
    }

    MyCard(items, index) {
        const { offer, rate, indexNum } = this.state
        return (
            <View key={index} style={styles.card}>
                <View style={styles.cardrow2}>
                    <Image
                        style={{ width: '100%', height: 150 }}
                        source={items.displayPic ? { uri: items.displayPic } : Icons}
                    // source={Icons}
                    />
                </View>
                <View style={styles.name}>
                    <Text style={{ color: '#2089dc', fontWeight: 'bold', fontSize: 16 }}>
                        {items.services.name}
                    </Text>
                </View>
                <View style={[styles.name, { paddingBottom: 10 }]}>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={ServiceIcon}
                        /> {items.services.service}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <View style={{ paddingVertical: 15, flexGrow: 1, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.details(items)}>
                            <Text style={{ color: 'grey' }}>
                                Details
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 15, flexGrow: 1, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.makeOffer(index)}>
                            <Text style={{ color: 'rgb(29, 159, 49)' }}>
                                Request
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    offer &&
                    indexNum === index &&
                    <View style={styles.offer}>
                        <View style={styles.offerHead}>
                            <Text onPress={() => this.setState({ offer: false })} style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                X
                        </Text>
                        </View>
                        <View style={styles.offerBody}>
                            <View style={{ width: '60%' }}>
                                <TextField
                                    label='Rate'
                                    placeholder={'Enter Your Rate'}
                                    value={rate}
                                    keyboardType={'number-pad'}
                                    onChangeText={(rate) => this.setState({ rate })}
                                />
                            </View>
                        </View>
                        <View style={styles.offerFoot}>
                            <TouchableOpacity onPress={() => this.setState({ offer: false })} style={{ flexGrow: 1 }}>
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    backgroundColor: 'red'
                                }}>
                                    <Text style={{ color: 'white' }}>
                                        Cancel
                                </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.request(items)} style={{ flexGrow: 1 }}>
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    backgroundColor: 'lightgreen'
                                }}>
                                    <Text style={{ color: 'white' }}>
                                        Send
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                }
            </View>
        )
    }

    render() {
        const { contacts } = this.state
        return (
            <AppContainer back={true} goBack={() => this.goback()} routeName={'Contact'}>
                <View style={styles.container}>
                    <View style={styles.services}>
                        <Text style={{ color: 'grey', fontSize: 20, fontWeight: '400' }}>
                            My Contacts
                        </Text>
                    </View>
                    <View style={styles.scrollView}>
                        <ScrollView style={styles.scroll} contentContainerStyle={{
                            alignItems: 'center',
                            flexBasis: '100%'
                        }}>
                            {
                                contacts &&
                                contacts.map((items, index) => {
                                    return (
                                        this.MyCard(items, index)
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
            </AppContainer >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 4,
        // borderColor: 'green',
    },
    scrollView: {
        // borderWidth: 2,
        // borderColor: 'black',
        // flexGrow: 1,
        height: 400
    },
    scroll: {
        // borderWidth: 3,
        width: '100%',
        // borderColor: 'yellow',
        height: 400
    },
    services: {
        width: '96%',
        // flexGrow: 1,
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        textAlign: 'left',
        marginBottom: 10,
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'lightgrey'
    },
    offerFoot: {
        // borderWidth: 1,
        // paddingVertical: 10,
        alignItems: 'center',
        // justifyContent: 'flex-end',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    offerBody: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1
    },
    offerHead: {
        // borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 7,
        alignItems: 'flex-end',
        backgroundColor: '#2089dc'
    },
    offer: {
        position: 'absolute',
        width: '70%',
        height: 200,
        bottom: '10%',
        right: '15%',
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 10,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    cardrow1: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 12,
    },
    cardrow2: {
        width: '100%',
        // borderWidth: 1,
        overflow: 'hidden'
    },
    card: {
        width: '70%',
        // borderWidth: 1,
        borderColor: '#2089dc',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.51,
        shadowRadius: 3.16,
        elevation: 5,
        shadowColor: 'grey',
        marginVertical: 10
    },
    mainCard: {
        // width: '100%',
        height: '84%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    name: {
        width: '100%',
        paddingTop: 5,
        paddingHorizontal: 20,
        alignItems: 'center'
    }
});


function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.CURRENTUSERUID,
        myRequest: state.authReducer.MYREQUEST,
        allUsers: state.authReducer.ALLUSERS,
        flag: state.authReducer.FLAG,
        modifyReq: state.authReducer.MODIFYREQ,
        contacts: state.authReducer.MYCONTACT
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            // AddRequest
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Contact);
