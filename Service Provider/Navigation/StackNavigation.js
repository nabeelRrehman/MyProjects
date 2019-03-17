import {
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer,
} from 'react-navigation';
import SignInScreen from '../Screens/SignIn/signIn';
import ProfileScreen from '../Screens/Profile/profile'
import HomeScreen from '../Screens/Home/home'
import DrawerContent from '../Component/DrawerContent/drawerContent';
import AddServices from '../Screens/AddServices/addServices';
import Details from '../Screens/Details/details';
import Chat from '../Screens/Chat/chat';
import Notifications from '../Screens/Notification/notification';
import Maps from '../Component/Direction/Map';
import MyProfile from '../Screens/MyProfile/myProfile';
import Messages from '../Screens/Messages/messages';
import Contact from '../Screens/Contact/contact';
import AdminChat from '../Screens/AdminChat/adminChat';


const StackNavigation = createStackNavigator({
    SignIn: { screen: SignInScreen },
    Profile: { screen: ProfileScreen },
    Home: { screen: HomeScreen },
    Services: { screen: AddServices },
    Details: { screen: Details },
    Chat: { screen: Chat },
    notification: { screen: Notifications },
    Direction: { screen: Maps },
    MyProfile: { screen: MyProfile },
    Messages: { screen: Messages },
    Contact: { screen: Contact },
    AdminChat: { screen: AdminChat },
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            drawerLockMode: 'locked-closed'
        },
    });

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: StackNavigation
    },
},
    {
        drawerPosition: 'left',
        initialRouteName: 'Home',
        drawerWidth: 250,
        // drawerBackgroundColor: 'blue'
        contentComponent: DrawerContent,
        // drawerLockMode: 'locked-open'
    }
)

const Navigator = createAppContainer(DrawerNavigator)

export default Navigator



// import * as Screens from '../screens'
// import { createDrawerNavigator, createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";

// const StackNavigator = createStackNavigator({
//     Home: {
//         screen: Screens.HomeScreen
//     },
//     Login: {
//         screen: Screens.LoginScreen
//     },
//     Dashboard: {
//         screen: Screens.DashboardScreen
//     },
// })

// const TabNavigator = createMaterialTopTabNavigator({
//     Home: {
//         screen: StackNavigator
//     },
//     Profile: {
//         screen: Screens.ProfileScreen
//     }
// })

// const DrawerNavigator = createDrawerNavigator({
//     Home: {
//         screen: TabNavigator
//     },
//     Profile: {
//         screen: Screens.ProfileScreen
//     }
// })

// const Navigator = createAppContainer(DrawerNavigator)

// export default Navigator