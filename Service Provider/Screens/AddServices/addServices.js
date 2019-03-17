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
import { addService } from '../../store/action/action'
import { TextField } from 'react-native-material-textfield';
import { KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import ImageIcon from '../../assets/services.png'

class AddServices extends Component {
    constructor() {
        super()

        this.state = {
            loader: false,
            phone: '',
            name: '',
            // categories: ['Plumber', 'Electrician', 'Mechanic', 'Fumigation', 'Plumber']
        }
    }

    goback() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    componentDidMount() {
        if (this.props.userUid) {
            this.setState({ currentUser: this.props.userUid })
        }
        if (this.props.category) {
            this.setState({ categories: this.props.category })
        }
    }

    componentWillReceiveProps(props) {
        if (props.userUid) {
            this.setState({ currentUser: props.userUid })
        }
        if (props.category) {
            this.setState({ categories: props.category })
        }
    }

    myCategory(items, index) {
        const { Num } = this.state
        return (
            <View key={index} style={[styles.categoryIcon, Num && Num === index + 1 ? styles.selected : null]}>
                <TouchableOpacity onPress={() => this.setState({ Num: index + 1, value: items })}>
                    <View style={{ width: 60, height: 60, alignSelf: 'center' }}>
                        <Image
                            style={styles.ImgIcon}
                            source={ImageIcon}
                        />
                    </View>
                    <View style={styles.catName}>
                        <Text style={{ fontSize: 16, color: Num && Num === index + 1 ? 'white' : 'black' }}>
                            {items}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    done() {
        const { value, phone, name } = this.state
        const { user } = this.props
        const { currentUser } = this.state

        if (value && phone && currentUser && name) {
            this.setState({ loader: true })
            const { addService } = this.props.actions
            var obj = {
                name,
                service: value,
                experience: phone,
                email: user.email ? user.email : 'not available'
            }
            addService(obj, currentUser).then(() => {
                this.setState({ loader: false })
                this.props.navigation.navigate('Home')
            })
        } else {
            Alert.alert(
                'Warning',
                'Fill all fields',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        const { phone, categories, loader, name } = this.state
        return (
            <AppContainer back={true} goBack={() => this.goback()} routeName={'Add Services'}>
                <KeyboardAvoidingView  behavior={'padding'} enabled>
                <ScrollView style={{ flexGrow: 1 }}>
                    <View style={styles.services}>
                        <Text style={{ color: 'grey', fontSize: 20, fontWeight: '400' }}>
                            Categories
                            </Text>
                    </View>
                    <View style={styles.categories}>
                        {
                            categories &&
                                categories.length ?
                                categories.map((items, index) => {
                                    return (
                                        this.myCategory(items, index)
                                    )
                                })
                                : null
                        }

                    </View>
                    <View style={[styles.fields, { width: '80%' }]}>
                        <View style={{ flexGrow: 1 }}>
                            <TextField
                                label='Name'
                                placeholder={'Your Name'}
                                value={name}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </View>
                    </View>
                    <View style={styles.fields}>
                        <View style={{ flexGrow: 1 }}>
                            <TextField
                                label='Experience'
                                placeholder={'Your Experience'}
                                value={phone}
                                maxLength={2}
                                onChangeText={(phone) => this.setState({ phone: phone.replace(/[^0-9]/g, '') })}
                            />
                        </View>
                        <View style={{ alignSelf: 'flex-end', paddingBottom: 10, paddingHorizontal: 5 }}>
                            <Text>
                                Years
                            </Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => this.done()}>
                            <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
                {
                    loader &&
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    selected: {
        backgroundColor: '#61b2f3',
        borderColor: '#2089dc'
    },
    loader: {
        position: 'absolute',
        bottom: '50%',
        left: '50%'
    },
    fields: {
        // borderWidth: 2,
        width: '50%',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    footer: {
        flex: 1,
        flexBasis: '100%',
        paddingVertical: 15,
        marginTop: 20,
        backgroundColor: '#2089dc',
    },
    catName: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ImgIcon: {
        width: '100%',
        height: '100%'
    },
    services: {
        width: '96%',
        flexGrow: 1,
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        textAlign: 'left',
        marginBottom: 10,
    },
    categoryIcon: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: 'grey',
        marginHorizontal: 3,
        marginVertical: 3,
        flexDirection: 'column'
    },
    categories: {
        width: '100%',
        // borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 5
    }
});


function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.CURRENTUSERUID,
        category: state.authReducer.CATEGORIES
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            addService
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(AddServices);
