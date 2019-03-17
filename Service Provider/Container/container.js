import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Image
} from 'react-native';
import { Header } from 'react-native-elements'

// import StackNav from '../../DrawerNavigation/index'

class Container extends Component {

    openMenu() {
        const { back } = this.props
        if (back) {
            this.props.goBack()
        } else {
            this.props.openDrawer()
        }
    }

    search() {
        const { search } = this.props

        if (search) {
            this.props.searchIcon()
        }
    }

    render() {
        const { children, routeName, back, search, centerComp } = this.props
        return (
            <View style={styles.container}>
                <View style={{ width: '100%' }}>
                    <Header
                        placement="left"
                        barStyle='default'
                        statusBarProps={{ backgroundColor: '#2089dc' }}
                        leftComponent={{ icon: back ? 'arrow-back' : 'menu', color: '#fff', onPress: () => this.openMenu() }}
                        centerComponent={!centerComp ? { text: routeName, style: { color: '#fff' } } : this.props.myComp()}
                        rightComponent={{ icon: search ? 'search' : null, color: '#fff', onPress: () => this.search() }}
                    />
                </View>
                <View style={{ width: '100%', flexGrow: 1 }}>
                    {
                        children
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 24,
        height: 24,
    }
});

export default Container;