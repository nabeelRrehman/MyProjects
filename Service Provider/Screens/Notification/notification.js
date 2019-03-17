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
import { seenUpdate, AcceptOffer, addReview } from '../../store/action/action'
import ServiceIcon from '../../assets/services.png'
import { TextField } from 'react-native-material-textfield';
import { KeyboardAvoidingView, ActivityIndicator, Alert, Animated, Picker } from 'react-native';
import ImageIcon from '../../assets/services.png'
import { BlurView } from 'expo';
import { Icon } from 'react-native-elements'
import SnackBar from 'react-native-snackbar-component'
import AwesomeAlert from 'react-native-awesome-alerts';
import star from '../../assets/star.png'
import starColor from '../../assets/starColor.png'
import IconFont from 'react-native-vector-icons/FontAwesome'
import Icons from '../../assets/person-dummy.jpg'


class Notifications extends Component {
    constructor() {
        super()

        this.state = {
            offers: [],
            showAlert: false,
            review: false,
            UserReview: 1
        }
    }

    goback() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    componentDidMount() {
        const { request, allUser, modifyReq, userUid } = this.props
        if (request && request.length && allUser && allUser.length) {
            var arr = []
            // console.log(request, 'request here')
            allUser.map((Useritems) => {
                request.map((reqItem) => {
                    if (Useritems.userUid === reqItem.OfferFrom) {
                        console.log(Useritems, 'items herere ')
                        const obj = {
                            data: Useritems,
                            offer: reqItem
                        }
                        arr.push(obj)
                        this.setState({ offers: arr })
                    }
                })
            })

        }
        if (modifyReq && request) {
            const { offers } = this.state
            offers.map((items, index) => {
                if (items.offer.offerFrom === modifyReq.offerFrom) {
                    offers[index].offer = modifyReq
                    this.setState({ offers })
                }
            })
            request.map((items, index) => {
                if (items.offerFrom === modifyReq.offerFrom) {
                    request[index] = modifyReq
                }
            })
        }
        if (userUid) {
            const { seenUpdate } = this.props.actions
            seenUpdate(userUid)
            // console.log(userUid, 'usrejhvjhv')
        }
    }

    componentWillReceiveProps(props) {
        const { request, modifyReq } = props

        if (modifyReq && request) {
            const { offers } = this.state
            offers.map((items, index) => {
                if (items.offer.offerFrom === modifyReq.offerFrom) {
                    offers[index].offer = modifyReq
                    this.setState({ offers })
                }
            })
            request.map((items, index) => {
                if (items.offerFrom === modifyReq.offerFrom) {
                    request[index] = modifyReq
                }
            })
        }
        if (modifyReq && request) {
            const { offers } = this.state
            offers.map((items, index) => {
                if (items.offer.offerFrom === modifyReq.offerFrom) {
                    offers[index].offer = modifyReq
                    this.setState({ offers })
                }
            })
            request.map((items, index) => {
                if (items.offerFrom === modifyReq.offerFrom) {
                    request[index] = modifyReq
                }
            })
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

    review() {
        this.setState({ review: true })
    }

    accept(item, index) {
        const { AcceptOffer } = this.props.actions
        console.log(item, 'item')
        AcceptOffer(item.offer)
            .then(() => {
                const { offers } = this.state
                if (offers) {
                    offers.map((off, index) => {
                        if (off.offer.OfferFrom === item.offer.OfferFrom &&
                            off.offer.OfferTo === item.offer.OfferTo) {
                            offers[index].offer.status = 'accepted'
                            this.setState({ offers, showAlert: false })
                        }
                    })
                }
            })
    }

    direction(data) {
        const { navigate } = this.props.navigation

        const userLocation = {
            lat: data.direction.latitude,
            lng: data.direction.longitude
        }
        navigate('Direction', { userLocation })
    }

    send(item) {
        const { UserReview } = this.state

        if (UserReview) {
            const { addReview } = this.props.actions
            console.log(item, 'items')
            var obj = {
                review: UserReview,
                reviewFrom: item.offer.OfferTo,
                userUid: item.offer.OfferFrom
            }
            addReview(obj)
                .then(() => {
                    this.setState({ reviewSend: true, review: false })
                    setTimeout(() => {
                        this.setState({ reviewSend: false })
                    }, 2000);
                })
        }
    }

    myOffer(items, index) {
        const { showAlert, review } = this.state
        const { data, offer } = items
        return (
            <View key={index} style={styles.card}>
                <View style={[styles.cardrow2, { marginTop: 5 }]}>
                    <View
                        style={{
                            width: 100,
                            borderWidth: 2,
                            borderColor: '#2089dc',
                            overflow: 'hidden',
                            alignSelf: 'center',
                            height: 100,
                            borderRadius: 50,
                        }}
                    >
                        <Image
                            source={data.profilePic ? data.profilePic : Icons}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                </View>
                <View style={styles.name}>
                    <Text style={{ color: '#2089dc', fontWeight: 'bold', fontSize: 16 }}>
                        {data.name}
                    </Text>
                </View>
                <View style={[styles.name, { paddingBottom: 5 }]}>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                        <IconFont
                            // style={{ width: 25, height: 25 }}
                            // source={ServiceIcon}
                            size={20}
                            name={'clock'}
                        /> {new Date(offer.time).toLocaleTimeString()}
                    </Text>
                </View>
                <View style={[styles.name, { paddingBottom: 13 }]}>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                        <IconFont
                            size={20}
                            color={'green'}
                            name={'money'}
                        /> {offer.rate}
                    </Text>
                </View>
                {
                    offer.status === 'pending' ?
                        <View style={styles.offerFoot}>
                            <TouchableOpacity style={{ flexGrow: 1 }}>
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 15,
                                    borderTopWidth: 1,
                                    borderColor: '#2089dc'
                                    // backgroundColor: 'red'
                                }}>
                                    <Text style={{ color: 'red' }}>
                                        Reject
                                </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ showAlert: true })} style={{ flexGrow: 1 }}>
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 15,
                                    borderTopWidth: 1,
                                    borderColor: '#2089dc'
                                    // backgroundColor: 'lightgreen'
                                }}>
                                    <Text style={{ color: 'lightgreen' }}>
                                        Accept
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.offerFoot}>
                            <TouchableOpacity onPress={() => this.direction(data)} style={{ flexGrow: 1 }}>
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 15,
                                    borderTopWidth: 1,
                                    borderColor: '#2089dc'
                                    // backgroundColor: 'red'
                                }}>
                                    <Text style={{ color: '#2089dc' }}>
                                        View Direction
                            </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.review(items)} style={{ flexGrow: 1 }}>
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 15,
                                    borderTopWidth: 1,
                                    borderColor: '#2089dc'
                                    // backgroundColor: 'lightgreen'
                                }}>
                                    <Text style={{ color: 'red' }}>
                                        Review
                            </Text>
                                </View>
                            </TouchableOpacity>
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
                            <TouchableOpacity onPress={() => this.send(items)} style={{ flexGrow: 1 }}>
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
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Request"
                    message="you want to accept request!"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes"
                    confirmButtonColor="green"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.accept(items, index);
                    }}
                />

            </View>
        )
    }

    render() {
        const { offers, showAlert, reviewSend } = this.state
        return (
            <AppContainer back={true} goBack={() => this.goback()} routeName={'Notification'}>
                <View style={styles.services}>
                    <Text style={{ color: 'grey', fontSize: 20, fontWeight: '400' }}>
                        Offers
                    </Text>
                </View>
                <View style={{ height: '85%' }}>
                    <ScrollView contentContainerStyle={{
                        flexGrow: 1,
                        paddingVertical: 10,
                        alignItems: 'center',
                    }}>
                        {
                            offers &&
                                offers.length ?
                                offers.map((items, index) => {
                                    return this.myOffer(items, index)
                                })
                                :
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <Text style={{ color: 'grey', fontSize: 18 }}>
                                        No offers yet
                                    </Text>
                                </View>
                        }
                        <SnackBar
                            visible={reviewSend}
                            textMessage="Thank for your review!"
                            actionHandler={() => { console.log("snackbar button clicked!") }}
                            actionText="OK"
                        />
                    </ScrollView>

                </View>
            </AppContainer >
        );
    }
}

const styles = StyleSheet.create({
    name: {
        width: '100%',
        paddingTop: 5,
        paddingHorizontal: 20,
        alignItems: 'center'
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
    card: {
        width: '70%',
        borderWidth: 1,
        borderColor: '#2089dc',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        overflow: 'hidden',
        position: 'relative',
        shadowRadius: 10,
        shadowColor: 'grey',
        marginVertical: 10
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
        paddingVertical: 5,
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
});


function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.CURRENTUSERUID,
        request: state.authReducer.OTHERREQ,
        allUser: state.authReducer.ALLUSERS,
        modifyReq: state.authReducer.MODIFYREQ
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            seenUpdate, AcceptOffer, addReview
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
