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
import { AddRequest, GetMyReviews } from '../../store/action/action'
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


class MyProfile extends Component {
    constructor() {
        super()

        this.state = {
            star: [1, 2, 3, 4, 5],
            services: false
        }
    }

    componentDidMount() {
        const { userData, userUid } = this.props
        const { GetMyReviews } = this.props.actions

        if (userData) {
            this.setState({ userData })
        }
        if (userUid) {
            GetMyReviews(userUid).then((res) => {
                console.log(res, 'response')
                this.setState({ review: res })
            })
        }
    }

    componentWillReceiveProps(props) {
        const { userData } = props
        if (userData) {
            this.setState({ userData })
        }
    }

    goback() {
        this.props.navigation.dispatch(NavigationActions.back())
    }



    render() {
        const { userData, star, review } = this.state
        return (
            <AppContainer back={true} goBack={() => this.goback()} routeName={'Profile'}>
                <View style={styles.services}>
                    <Text style={{ color: 'grey', fontSize: 20, fontWeight: '400' }}>
                        My Profile
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.ImageDiv}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={userData && userData.displayPic ? { uri: userData.displayPic } : Icons}
                        />
                    </View>
                    <View style={styles.name}>
                        <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold', color: '#2089dc' }}>
                            {userData && userData.name}
                        </Text>
                        <View style={styles.details}>
                            <View>
                                <Text style={{ fontSize: 12, color: 'grey' }}>
                                    Email:
                            </Text>
                            </View>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 12, color: 'black' }}>
                                    {userData && userData.email ? userData.email : 'not available'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.details}>
                            <View>
                                <Text style={{ fontSize: 12, color: 'grey' }}>
                                    Phone:
                            </Text>
                            </View>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontSize: 12, color: 'black' }}>
                                    {userData && userData.phoneNo}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.details}>
                            <View>
                                <Text style={{ fontSize: 12, color: 'grey' }}>
                                    Rating:
                                </Text>
                            </View>
                            <View style={{ marginLeft: 5, flexDirection: 'row' }}>
                                {/* <Text style={{ fontSize: 12, color: 'black' }}> */}
                                {
                                    review ?
                                        star.map((item, index) => {
                                            return (
                                                index < review ?
                                                    <Image
                                                        style={{ width: 20, height: 20 }}
                                                        source={starColor}
                                                    />
                                                    :
                                                    <Image
                                                        style={{ width: 20, height: 20 }}
                                                        source={starIcon}
                                                    />
                                            )
                                        })
                                        :
                                        star.map((item, index) => {
                                            return (
                                                <Image
                                                    style={{ width: 20, height: 20 }}
                                                    source={starIcon}
                                                />
                                            )
                                        })
                                }
                                {/* </Text> */}
                            </View>
                        </View>
                    </View>
                    <View style={styles.myservice}>
                        <View style={[styles.services, { borderBottomWidth: 0, }]}>
                            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '300' }}>
                                Services
                            </Text>
                        </View>
                        {
                            userData &&
                                userData.services ?
                                userData.services.service &&
                                <View>
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
                                                    {userData.services.service}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: 'grey' }}>
                                                    Service
                                </Text>
                                            </View>
                                        </View>
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
                                                    {userData && userData.services.experience} Years
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: 'grey' }}>
                                                    Experience
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{ flexGrow: 1, alignItems: 'center' }}>
                                    <Text style={{ color: 'grey' }}>
                                        Services not Available
                                    </Text>
                                </View>
                        }
                    </View>
                </View>
            </AppContainer >
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        // borderWidth: 3,
        alignItems: 'flex-start',
        paddingHorizontal: 5,
        flexWrap: 'wrap',
        borderColor: 'yellow',
        flexDirection: 'row'
    },
    details: {
        // borderWidth: 1,
        // flexGrow: 1,
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingVertical: 5
    },
    icon: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    contact: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 3,
        alignItems: 'flex-start',
    },
    name: {
        // borderWidth: 1,
        flexGrow: 1,
        width: '47%',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    myservice: {
        width: '100%',
        // borderWidth: 1,
    },
    ImageDiv: {
        width: '40%',
        borderWidth: 2,
        height: '30%',
        borderColor: '#2089dc',
        overflow: 'hidden',
        borderRadius: 20,
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
        userData: state.authReducer.USERDATA,
        modifyReq: state.authReducer.MODIFYREQ
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            AddRequest, GetMyReviews
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
