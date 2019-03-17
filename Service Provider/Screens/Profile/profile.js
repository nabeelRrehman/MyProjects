import React from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { userDetails, logout } from '../../store/action/action'
// import Expo from 'expo';
import Expo, { Video, ImagePicker, Location, Permissions, Constants } from 'expo';
import StepIndicator from 'react-native-step-indicator';
import Icon from '../../assets/person-dummy.jpg'
import { StackActions, NavigationActions } from 'react-navigation';
import mobile from '../../assets/mobile.png'
import uuid from 'uuid';
import { decode as atob, encode as btoa } from 'base-64'
import firebase from '../../Config/Firebase'

const labels = ["Cart", "Delivery Address"];
const customStyles = {
    // stepIndicatorSize: 25,
    // currentStepIndicatorSize: 30,
    // separatorStrokeWidth: 2,
    // currentStepStrokeWidth: 3,
    // stepStrokeCurrentColor: '#fe7013',
    // stepStrokeWidth: 3,
    // stepStrokeFinishedColor: '#fe7013',
    // stepStrokeUnFinishedColor: '#aaaaaa',
    // separatorFinishedColor: '#fe7013',
    // separatorUnFinishedColor: '#aaaaaa',
    // stepIndicatorFinishedColor: '#fe7013',
    // stepIndicatorUnFinishedColor: '#ffffff',
    // stepIndicatorCurrentColor: '#ffffff',
    // stepIndicatorLabelFontSize: 13,
    // currentStepIndicatorLabelFontSize: 13,
    // stepIndicatorLabelCurrentColor: '#fe7013',
    // stepIndicatorLabelFinishedColor: '#ffffff',
    // stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    // labelColor: '#999999',
    // labelSize: 13,
    // currentStepLabelColor: '#fe7013'
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    separatorFinishedColor: '#4aae4f',
    separatorUnFinishedColor: '#a4d4a5',
    stepIndicatorFinishedColor: '#4aae4f',
    stepIndicatorUnFinishedColor: '#a4d4a5',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: '#4aae4f'
}



class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPosition: 0,
            loader: false,
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        // console.log("location===>>>>", location)

    };

    componentWillMount() {
        if (!Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
            console.log("not ios ")
        } else {
            this._getLocationAsync();
        }
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity

    };

    useLibraryHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            exif: true,
            mediaTypes: 'Images'
        });
        if (!result.cancelled) {
            if (result.type === 'image') {
                // console.log(result, 'result here from librarry')
                this.setState({ ImageUri: result.uri, myFile: result })
            }
        } else {
            return { cancelled: true }
        }
    };

    next() {
        const { currentPosition } = this.state
        this.setState({ currentPosition: currentPosition + 1 });
    }

    renderStep(position) {
        // console.log(position, 'position')
        this.setState({ currentPosition: position })
    }

    async uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const ref = firebase
            .storage()
            .ref()
            .child(uuid.v4());
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();

        return await snapshot.ref.getDownloadURL();
    }

    pickImage = async (uri) => {

        return uploadUrl = await this.uploadImageAsync(uri);
    }

    finish() {
        const { ImageUri, text, location, myFile } = this.state
        const { userUid, user } = this.props
        const that = this
        if (ImageUri && text && userUid) {
            if (location) {
                this.setState({ loader: true })

                this.pickImage(ImageUri).then((res) => {
                    // console.log(res, 'url>>>>>>>>>>>>>')
                    const { userDetails } = that.props.actions
                    const obj = {
                        displayPic: res,
                        phoneNo: text,
                        userUid,
                        email: user.email,
                        name: user.Name,
                        block: false,
                        direction: {
                            latitude: location ? location.coords.latitude : null,
                            longitude: location ? location.coords.longitude : null
                        }
                    }
                    userDetails(obj)
                        .then(() => {
                            const { navigate } = that.props.navigation
    
                            navigate('Home')
                        })
                })
            } else {
                this._getLocationAsync()
                console.log('please on Your location')
                Alert.alert(
                    'Warning',
                    'Please On Your location',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            }

        } else {
            Alert.alert(
                'Warning',
                'Image/phone no required',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
    }

    logout() {
        const { logout } = this.props.actions

        logout().then(() => {
            const resetToHome = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'SignIn' }),
                ],
            });
            this.props.navigation.dispatch(resetToHome)
        })
    }

    render() {
        const { currentPosition, ImageUri, loader } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text style={{ alignSelf: 'flex-end', color: 'white', paddingRight: 10 }}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.steps}>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                        // labels={labels}
                        stepCount={2}
                        labels={['Display Picture', 'Personal Info']}
                        onPress={(position) => this.renderStep(position)}
                    />
                </View>
                {
                    currentPosition === 0 &&
                    <View style={styles.body}>
                        <View style={styles.imageSet}>
                            {
                                ImageUri ?
                                    <Image
                                        style={styles.setImage}
                                        source={{ uri: ImageUri }}
                                    />
                                    :
                                    <Image
                                        style={styles.setImage}
                                        source={Icon}
                                    />
                            }
                        </View>
                        <TouchableOpacity style={styles.imageSetBtn} onPress={() => this.useLibraryHandler()}>
                            <View>
                                <Text>
                                    Select Image
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                {
                    currentPosition === 1 &&
                    <View style={styles.body2}>
                        <View style={styles.personalInfo}>
                            <Text style={{ fontSize: 18, marginLeft: 15, color: 'grey', textDecorationLine: 'underline' }}>
                                Personal Information
                            </Text>
                        </View>
                        {/* <View style={styles.inputField}>
                            <TextInput
                                placeholder='Enter Your First Name'
                                style={{ width: '60%', height: 40, paddingHorizontal: 10, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(fname) => this.setState({ fname })}
                                value={this.state.fname}
                            />
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                placeholder='Enter Your Last Name'
                                style={{ width: '60%', height: 40, paddingHorizontal: 10, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(lname) => this.setState({ lname })}
                                value={this.state.lname}
                            />
                        </View> */}
                        <View style={styles.inputField}>
                            <Image
                                source={mobile}
                                fadeDuration={0}
                                style={{ width: 25, height: 25, marginRight: 15, marginLeft: 20 }}
                            />
                            <TextInput
                                keyboardType='numeric'
                                maxLength={11}
                                placeholder='Enter Your Mobile Number'
                                style={{ width: '60%', height: 40, paddingHorizontal: 10, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(text) => this.setState({ text: text.replace(/[^0-9]/g, '') })}
                                value={this.state.text}
                            />
                        </View>
                    </View>
                }
                <View style={styles.footer}>
                    {
                        currentPosition === 1 ?
                            <TouchableOpacity onPress={() => this.finish()}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                    Done
                        </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.next()}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                    Next
                        </Text>
                            </TouchableOpacity>
                    }
                </View>
                {
                    loader &&
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#0000ff" />
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
        justifyContent: 'flex-start',
        position: 'relative',
    },
    loader: {
        position: 'absolute',
        bottom: '50%'
    },
    contentContainer: {
        // width: '100%',
        // paddingVertical: '100%',
        // paddingHorizontal: 30
    },
    personalInfo: {
        // borderLeftWidth: 2,
        // borderBottomWidth: 2,
        // borderTopWidth: 2,
        // borderRightWidth: 2,
        width: '100%',
        marginBottom: 40,
        paddingVertical: 15,
    },
    header: {
        width: '100%',
        backgroundColor: '#2089dc',
        paddingVertical: 15
    },
    steps: {
        width: '90%',
        paddingVertical: 10,
    },
    body: {
        flex: 1,
        width: '100%',
        flexGrow: 1,
        // borderLeftWidth: 2,
        // borderBottomWidth: 2,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 2,
        // borderRightWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    body2: {
        flex: 1,
        width: '100%',
        flexGrow: 1,
        // borderLeftWidth: 2,
        // borderBottomWidth: 2,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 2,
        // borderRightWidth: 2,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    imageSet: {
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderLeftColor: '#e5e5e5',
        borderBottomColor: '#e5e5e5',
        borderTopColor: '#e5e5e5',
        borderRightColor: '#e5e5e5',
        width: '50%',
        height: '50%',
        borderRadius: 20,
        // flexGrow: 1,
        // height: 40
    },
    imageSetBtn: {
        backgroundColor: '#e5e5e5',
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        width: '50%',
        borderRadius: 5,
    },
    setImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    footer: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#2089dc'
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        width: '100%',
        alignSelf: 'center'
    }
});

function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.CURRENTUSERUID
        // resolved: state.authReducer.RESOLVED,
        // userData: state.authReducer.USERDATA,
        // notify: state.authReducer.NOTIFY
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            userDetails, logout
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
