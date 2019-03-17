import React from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { TabNavigator, StackActions, NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { Bubbles } from 'react-native-loader';
import { fbLogIn, googleSignIn, userAuth, AllUsers } from '../../store/action/action'
// import Expo from 'expo';
import { SocialIcon } from 'react-native-elements'


class SignIn extends React.Component {

    constructor() {
        super()
        this.state = {
            loader: false
        }
    }

    componentDidMount() {
        const { userAuth } = this.props.actions
        const { AllUsers } = this.props.actions

        AllUsers()

        userAuth()
            .then(() => {
                const resetToHome = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                    ],
                });
                this.props.navigation.dispatch(resetToHome)
                // navigate('Home')
            })
            .catch(() => {
                const resetToHome = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Profile' }),
                    ],
                });
                this.props.navigation.dispatch(resetToHome)
                // navigate('Profile')
            })
    }

    componentWillReceiveProps(props) {
        if (props.user) {
            // console.log(props.user, 'redux user')
        }
        if (props.userUid) {
            // console.log(props.userUid, 'userUiduserUid')
        }
        if (props.loader) {
            this.setState({ loader: props.loader })
        } else {
            this.setState({ loader: props.loader })
        }
    }

    LoginFacebook() {
        const { fbLogIn } = this.props.actions

        fbLogIn()
            .then((success) => {
                // const resetToHome = StackActions.reset({
                //     index: 0,
                //     actions: [
                //         NavigationActions.navigate({ routeName: 'Profile' }),
                //     ],
                // });
                // this.props.navigation.dispatch(resetToHome)

                console.log('bind success here')
            })
    }

    LoginGoogle() {
        const { googleSignIn } = this.props.actions

        googleSignIn()
            .then((success) => {
                // const resetToHome = StackActions.reset({
                //     index: 0,
                //     actions: [
                //         NavigationActions.navigate({ routeName: 'Profile' }),
                //     ],
                // });
                // this.props.navigation.dispatch(resetToHome)
                // navigate('Profile')
            })
    }


    render() {
        const { loader } = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btnFb}
                    onPress={() => this.LoginFacebook()}
                >
                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        style={styles.btnGoogle}
                        type='facebook'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnGoogle}
                    onPress={() => this.LoginGoogle()}
                >
                    <SocialIcon
                        title='Sign In With Google'
                        style={styles.btnGoogle}
                        button
                        type='google-plus-official'
                    />
                </TouchableOpacity>
                {
                    loader &&
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#2089dc" />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        position: 'relative'
    },
    btnFb: {
        marginVertical: 5,
        // backgroundColor: 'blue',
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    btnGoogle: {
        marginVertical: 5,
        // backgroundColor: 'red',
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    loader: {
        position: 'absolute',
        bottom: '50%'
    }
});

function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.CURRENTUSERUID,
        loader: state.authReducer.LOADER
        // resolved: state.authReducer.RESOLVED,
        // userData: state.authReducer.USERDATA,
        // notify: state.authReducer.NOTIFY
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            fbLogIn, googleSignIn, userAuth, AllUsers
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
