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
import { GetRequest, GetMessage, AddRequest, MyContacts, GetAdminMsg, GetCategories } from '../../store/action/action'
import Icon from '../../assets/person-dummy.jpg'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SnackBar from 'react-native-snackbar-component'
import ServiceIcon from '../../assets/services.png'
import geolib from 'geolib'
import { TextField } from 'react-native-material-textfield';
import { TextInput, KeyboardAvoidingView } from 'react-native';
import Icons from '../../assets/person-dummy.jpg'

// import Stac kNav from '../../DrawerNavigation/index'



class Home extends Component {
    constructor() {
        super()

        this.state = {
            currentIndex: 0,
            crousel: [1, 2, 3, 4, 5],
            notify: false,
            back: false,
            mySearch: true,
            text: ''
        }
    }

    openMenu() {
        this.props.navigation.openDrawer()
    }

    componentWillMount() {
        const { GetMessage, MyContacts, GetAdminMsg, GetCategories } = this.props.actions

        GetMessage()
        MyContacts()
        GetAdminMsg()
        GetCategories()
    }

    componentDidMount() {
        const { allUsers, userUid, userData } = this.props
        var arr = []
        if (allUsers) {
            if (userUid) {
                allUsers.map((users) => {
                    if (users.userUid !== userUid && !users.block) {
                        // console.log(this.getDistance(), 'distance here')
                        this.getDistance(users, userData)
                            .then((res) => {
                                // console.log(res, 'distance response')
                                if (res <= 10000) {
                                    arr.push(users)
                                    this.setState({ users: arr })
                                    // console.log(users, 'users without me')
                                }
                            })
                    }
                })
            }
        }
        if (userData) {
            // console.log('useruid gggg component willmount', userData)
            const { GetRequest } = this.props.actions
            GetRequest(userData.userUid)
        }

    }

    async getDistance(users, userData) {
        const direction = await geolib.getDistanceSimple(
            users.direction,
            userData.direction
        )

        return direction
    }

    componentWillReceiveProps(props) {
        const { allUsers, userUid, userData, request } = props
        var arr = []
        if (allUsers) {
            if (userUid) {
                allUsers.map((users) => {
                    if (users.userUid !== userUid && !userData.block) {
                        // console.log(this.getDistance(), 'distance here')
                        this.getDistance(users, userData)
                            .then((res) => {
                                // console.log(res, 'distance response')
                                if (res <= 10000) {
                                    arr.push(users)
                                    this.setState({ users: arr })
                                    // console.log(users, 'users without me')
                                }
                            })
                    }
                })
            }
        }
        if (request) {
            console.log(request, 'requestrequest')
            var counter = 0
            request.map((items, index) => {
                if (items.seen === false) {
                    counter++
                    if (index === request.length - 1) {
                        if (counter) {
                            this.setState({ notify: true })
                            setTimeout(() => {
                                this.setState({ notify: false })
                            }, 2000);
                        }
                    }
                }
            })
        }
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
                    < View style={styles.offer}>
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

    goback() {
        this.setState({ back: false, mySearch: true, centerComp: false, text: '', searchUsers: '' })
    }

    search() {
        this.setState({ back: true, mySearch: false, centerComp: true })
    }

    MatchSearch(text) {
        const { users } = this.state
        if (text) {
            var arr = []
            if (users && users.length) {
                users.map((users) => {
                    var f = text.toUpperCase()
                    var n = users.services.name.toUpperCase()
                    var s = users.services.service.toUpperCase()
                    var p = users.phoneNo.toUpperCase()
                    if ((n).startsWith(f) || (s).startsWith(f) || (p).startsWith(f)) {
                        arr.push(users)
                        this.setState({ searchUsers: arr })
                    } else {
                        if (arr.indexOf(users) !== -1) {
                            arr.splice(users, 1)
                        }
                        this.setState({ searchUsers: arr })
                        if (arr.length === 0) {
                            this.setState({ searchUsers: '' })
                        }
                    }
                })
            }
        }
        this.setState({ text })
    }

    myComponent() {
        const { text } = this.state
        return (
            <View>
                <TextInput
                    placeholder={'Search here...'}
                    value={text}
                    style={{ width: '100%' }}
                    autoFocus={true}
                    clearTextOnFocus={true}
                    selectionColor={'white'}
                    placeholderTextColor={'white'}
                    onChangeText={(text) => this.MatchSearch(text)}
                />
            </View>
        )
    }

    render() {
        const { users, notify, back, mySearch, centerComp, text, searchUsers, sent } = this.state
        return (
            <AppContainer routeName={'HOME'} myComp={() => this.myComponent()} centerComp={centerComp} back={back} search={mySearch} goBack={() => this.goback()} searchIcon={() => this.search()} openDrawer={() => this.openMenu()}>
                <View style={styles.services}>
                    <Text style={{ color: 'grey', fontSize: 20, fontWeight: '400' }}>
                        Services
                    </Text>
                </View>
                <View style={styles.mainCard}>
                    <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scroll}>
                        {
                            users &&
                                text ?
                                searchUsers ?
                                    searchUsers.map((items, index) => {
                                        return (
                                            items.services &&
                                            this.MyCard(items, index)
                                        )
                                    })
                                    : <View><Text style={{ color: 'grey' }}>NO Services Found!</Text></View>
                                :
                                users ?
                                    users.map((items, index) => {
                                        return (
                                            items.services &&
                                            this.MyCard(items, index)
                                        )
                                    })
                                    : <View><Text style={{ color: 'grey' }}>You have no services nearby</Text></View>
                        }
                    </ScrollView>
                    {
                        <SnackBar
                            visible={notify}
                            textMessage="You have an Offer!"
                            actionHandler={() => { console.log("snackbar button clicked!") }}
                            actionText="OK"
                        />
                    }
                    {
                        <SnackBar
                            visible={sent}
                            textMessage="Offer Sent!"
                            actionHandler={() => { console.log("snackbar button clicked!") }}
                            actionText="OK"
                        />
                    }
                </View>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        overflow: 'hidden',
        // borderColor: '#2089dc',
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
    scroll: {
        alignItems: 'center',
        paddingVertical: 20,
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
        allUsers: state.authReducer.ALLUSERS,
        userData: state.authReducer.USERDATA,
        request: state.authReducer.OTHERREQ,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            GetRequest, GetMessage, AddRequest, MyContacts, GetAdminMsg, GetCategories
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
