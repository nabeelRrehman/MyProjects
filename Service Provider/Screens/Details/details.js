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
import { AddRequest, GetUserReview, checkReview, addReview, GetMyReviews } from '../../store/action/action'
import { TextField } from 'react-native-material-textfield';
import { KeyboardAvoidingView, ActivityIndicator, Alert, Animated, Picker } from 'react-native';
import ImageIcon from '../../assets/services.png'
import { BlurView } from 'expo';
import { Icon } from 'react-native-elements'
import SnackBar from 'react-native-snackbar-component'
import AwesomeAlert from 'react-native-awesome-alerts';
import starIcon from '../../assets/star.png'
import starColor from '../../assets/starColor.png'
import IconFont from 'react-native-vector-icons/FontAwesome'
import Icons from '../../assets/person-dummy.jpg'


class Details extends Component {
    constructor() {
        super()

        this.state = {
            showAlert: false,
            sent: false,
            star: [1, 2, 3, 4, 5],
            UserReview: 1,
        }
    }

    goback() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    componentDidMount() {
        const { navigation, myRequest, userUid, flag, modifyReq } = this.props

        const data = navigation.getParam('items')
        if (data) {
            console.log(data, 'data hetftkb')
            const { GetMyReviews, checkReview } = this.props.actions

            checkReview(userUid, data.userUid).then(() => {
                this.setState({ otherReview: true })
            })

            if (data.userUid) {
                GetMyReviews(data.userUid).then((res) => {
                    console.log(res, 'response')
                    this.setState({ reviewUser: res })
                })
            }
        }
        this.setState({ data })
        if (myRequest && myRequest.length || flag || !flag) {
            myRequest.map((items) => {
                if (items.OfferTo === data.userUid && items.OfferFrom === userUid) {
                    if (items.status === 'accepted') {
                        this.setState({ status: data.userUid })
                    } else {
                        this.setState({ status: '' })
                    }
                }
            })
        }

        if (modifyReq) {
            if (data.userUid === modifyReq.OfferTo && userUid === modifyReq.OfferFrom) {
                if (modifyReq.status === 'accepted') {
                    this.setState({ status: data.userUid })
                } else {
                    this.setState({ status: '' })
                }
            }
        }

    }

    componentWillReceiveProps(props) {
        const { myRequest, userUid, flag, modifyReq } = props
        const { data } = this.state
        if (myRequest && myRequest.length || flag || !flag) {
            console.log('myRequest ehgjagj', myRequest)
            myRequest.map((items) => {
                if (items.OfferTo === data.userUid && items.OfferFrom === userUid) {
                    if (items.status === 'accepted') {
                        this.setState({ status: data.userUid })
                    } else {
                        this.setState({ status: '' })
                    }
                }
            })
        }

        if (modifyReq) {
            if (data.userUid === modifyReq.OfferTo && userUid === modifyReq.OfferFrom) {
                if (modifyReq.status === 'accepted') {
                    this.setState({ status: data.userUid })
                } else {
                    this.setState({ status: '' })
                }
            }
        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    request = () => {
        const { data, rate } = this.state
        const { userUid } = this.props
        // console.log(data, 'data here', userUid)
        if (data && userUid && rate) {
            const { AddRequest } = this.props.actions
            var obj = {
                OfferTo: data.userUid,
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

    direction() {
        const { navigate } = this.props.navigation
        const { data } = this.state

        const userLocation = {
            lat: data.direction.latitude,
            lng: data.direction.longitude
        }
        navigate('Direction', { userLocation })
    }

    makeOffer() {
        this.setState({ offer: true })
    }

    send() {
        const { UserReview, data } = this.state
        const { userUid } = this.props
        if (UserReview) {
            const { addReview } = this.props.actions
            var obj = {
                review: UserReview,
                reviewFrom: userUid,
                userUid: data.userUid
            }
            addReview(obj)
                .then(() => {
                    this.setState({ reviewSend: true, review: false, otherReview: false })
                    setTimeout(() => {
                        this.setState({ reviewSend: false })
                    }, 2000);
                })
        }
    }

    render() {
        const { data, status, sent, rate, offer, star, review, reviewUser, otherReview, reviewSend } = this.state
        return (
            <AppContainer back={true} goBack={() => this.goback()} routeName={'Details'}>
                <View style={styles.info}>
                    <ScrollView style={{ width: '100%' }}>
                        <View style={styles.mainContainer}>
                            <View style={styles.profilePic}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={Icons}
                                />
                            </View>
                            <View style={styles.name}>
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                                    {data && data.services.name}
                                </Text>
                            </View>
                            <View style={styles.locations}>
                                <View style={{ width: 25, height: 25, marginRight: 5 }}>
                                    <IconFont
                                        size={25}
                                        color={'white'}
                                        name={'map-marker'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: '400', color: 'white' }}>
                                        B-14 Gulshane Kaneez Fatima
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderColor: 'grey', width: '100%', alignItems: 'flex-end', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    reviewUser ?
                                        star.map((item, index) => {
                                            return (
                                                index < reviewUser ?
                                                    <Image
                                                        key={index}
                                                        style={{ width: 20, height: 20 }}
                                                        source={starColor}
                                                    />
                                                    :
                                                    <Image
                                                        key={index}
                                                        style={{ width: 20, height: 20 }}
                                                        source={starIcon}
                                                    />
                                            )
                                        })
                                        :
                                        star.map((item, index) => {
                                            return (
                                                <Image
                                                    key={index}
                                                    style={{ width: 20, height: 20 }}
                                                    source={starIcon}
                                                />
                                            )
                                        })
                                }
                            </View>
                        </View>
                        <View style={styles.contact}>
                            <View style={styles.icon}>
                                <Icon
                                    size={25}
                                    color={'grey'}
                                    name={'phone'}
                                />
                            </View>
                            <View style={{ flexGrow: 1, alignSelf: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 16 }}>
                                        {data && data.phoneNo}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'grey' }}>
                                        Mobile
                                </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', { data })}>
                                <View style={styles.icon}>
                                    <Icon
                                        size={25}
                                        color={'grey'}
                                        name={'message'}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contact}>
                            <View style={styles.icon}>
                                <IconFont
                                    size={25}
                                    color={'grey'}
                                    name={'briefcase'}
                                />
                            </View>
                            <View style={{ flexGrow: 1, alignSelf: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 16 }}>
                                        {data && data.services.experience} Years
                                </Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'grey' }}>
                                        Experience
                                </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.contact}>
                            <View style={styles.icon}>
                                <Icon
                                    size={25}
                                    color={'grey'}
                                    name={'mail'}
                                />
                            </View>
                            <View style={{ flexGrow: 1, alignSelf: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 16 }}>
                                        {data && data.services.service}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'grey' }}>
                                        Service
                                </Text>
                                </View>
                            </View>
                            {
                                otherReview ?
                                    <TouchableOpacity onPress={() => this.setState({ review: true })}>
                                        <View style={styles.icon}>
                                            <Text style={{ color: 'grey', fontSize: 13 }}>
                                                Rate This User
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                            }
                        </View>
                    </ScrollView>
                    {
                        status ?
                            status === data.userUid &&
                            <View style={styles.footer}>
                                <View style={[styles.footBtn, { backgroundColor: 'green' }]}>
                                    <TouchableOpacity onPress={() => this.direction()}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                            Direction
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.footBtn}>
                                    <TouchableOpacity onPress={() => this.makeOffer()}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                            Remake Offer
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={styles.footer}>
                                {
                                    <View style={styles.footBtn}>
                                        <TouchableOpacity onPress={() => this.makeOffer()}>
                                            <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                                Make An Offer
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                    }
                </View>
                {
                    offer &&
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
                            <TouchableOpacity onPress={() => this.request()} style={{ flexGrow: 1 }}>
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
                {
                    review &&
                    <View style={styles.offer}>
                        <View style={styles.offerHead}>
                            <Text onPress={() => this.setState({ review: false })} style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                X
                    </Text>
                        </View>
                        <View style={styles.offerBody}>
                            <View style={{ width: '60%' }}>
                                <Text>Give Review</Text>
                                <Picker
                                    selectedValue={this.state.UserReview}
                                    style={{ height: 50, width: 100 }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ UserReview: itemValue })}>
                                    <Picker.Item label="1" value={1} />
                                    <Picker.Item label="2" value={2} />
                                    <Picker.Item label="3" value={3} />
                                    <Picker.Item label="4" value={4} />
                                    <Picker.Item label="5" value={5} />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.offerFoot}>
                            <TouchableOpacity onPress={() => this.setState({ review: false })} style={{ flexGrow: 1 }}>
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
                            <TouchableOpacity onPress={() => this.send()} style={{ flexGrow: 1 }}>
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
                <SnackBar
                    visible={sent}
                    textMessage="Offer Sent!"
                    actionHandler={() => { console.log("snackbar button clicked!") }}
                    actionText="OK"
                />
                <SnackBar
                    visible={reviewSend}
                    textMessage="Thank for your review!"
                    actionHandler={() => { console.log("snackbar button clicked!") }}
                    actionText="OK"
                />
            </AppContainer >
        );
    }
}

const styles = StyleSheet.create({
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
        bottom: '50%',
        right: 50,
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
    request: {
        width: '100%',
        // borderWidth: 1,
        alignItems: 'center',
    },
    footBtn: {
        flexGrow: 1,
        paddingVertical: 15,
        // borderWidth: 1,
        backgroundColor: '#2089dc',
        alignSelf: 'flex-end'
    },
    footer: {
        width: '100%',
        flexGrow: 1,
        // borderWidth: 4,
        // borderColor: 'green',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    icon: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    contact: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#61b2f3'
    },
    locations: {
        flexDirection: 'row',
    },
    name: {
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    profilePic: {
        borderWidth: 3,
        width: 150,
        height: 150,
        borderColor: '#2089dc',
        borderRadius: 100,
        overflow: 'hidden'
    },
    info: {
        alignItems: 'center',
        flexGrow: 1,
    }
});


function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.CURRENTUSERUID,
        myRequest: state.authReducer.MYREQUEST,
        flag: state.authReducer.FLAG,
        modifyReq: state.authReducer.MODIFYREQ
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            AddRequest, GetUserReview, checkReview, addReview, GetMyReviews
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Details);
