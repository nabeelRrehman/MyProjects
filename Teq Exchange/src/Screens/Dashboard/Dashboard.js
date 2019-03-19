import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { seenBadge } from '../../store/action/chatAction'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Badge } from '@material-ui/core'
import TimeAgo from 'react-timeago'
import History from '../../History/History';
import { LogoutAction } from '../../store/action/action';
import { searchProductAction, searchProductTextAction } from '../../store/action/productAction';
import logo from '../../Assets/images/icon-01.png';

import logo1 from '../../Assets/images/headerLogo.png'
import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import firebase from '../../Config/Firebase/firebase';
import Image from '../../Assets/images/logoDesign.png'
import MessageTemplate from '../../Component/ChatBox/Message';

import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import '../Dashboard/Dashboard.css'
import { faHome, faTags, faUserEdit, faSort, faUserLock, faUser, faUserCheck, faShoppingCart, faShoppingBasket, faComment } from '@fortawesome/free-solid-svg-icons';
import ChatBox from '../../Component/ChatBox/ChatBox';
import { AirlineSeatReclineExtraOutlined } from '@material-ui/icons';
library.add(faHome, faTags, faUserEdit, faSort, faUserLock, faUser, faUserCheck, faShoppingCart, faShoppingBasket, faComment)
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        height: '55px'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
});

class PersistentDrawerLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: '',
            open: false,
            text: 'Home',
            openChatBox: false,
            currentUser: null,
            chatOpen: false,
            count: 0,
            messageList: [],
            allUsers: []
        }

        this.pageChange = this.pageChange.bind(this);
        this.logout = this.logout.bind(this);
        this.Login = this.Login.bind(this);

    }

    componentWillMount() {
        window.scrollTo(0, 0)
        const { currentUser, currentUserUID, authChange, myCart } = this.props
        if (authChange === 'login') {
            this.setState({ auth: 'login' })
        }
        else if (authChange === 'logout') {
            this.setState({ auth: 'logout' })
        }

        var total = 0
        if (myCart && myCart.length) {
            myCart.map(items => {
                total += items.quantity
            })
            this.setState({ badge: total })
        }
        this.setState({ currentUser, currentUserUID, myCart })

        if (this.props.chat) {
            if (this.props.currentUser) {

                if (this.props.currentUser.role === 'buyer') {
                    var result = Object.values(this.props.chat.reduce((c, { reciever, message, sender, time, product }) => {
                        c[reciever] = c[reciever] || { reciever, message, sender, time };
                        return c;
                    }, {}));
                    this.setState({ reciever: result }, () => {
                        // console.log(this.props.allUsers,'allUsersallUsers')
                        var arr = []
                        this.state.reciever.map(items => {
                            if (this.props.allUsers) {
                                this.props.allUsers.map(userData => {
                                    if (userData.data.userUid === items.reciever && items.reciever !== currentUserUID) {
                                        if (arr.indexOf(userData) === -1) {
                                            arr.push({
                                                ...userData,
                                                ...items
                                            })
                                        }
                                        this.setState({ messageList: arr })
                                    }
                                })
                            }
                        })
                    })
                } else {
                    var result = Object.values(this.props.chat.reduce((c, { sender, message, reciever, time }) => {
                        c[reciever] = c[reciever] || { reciever, message, sender, time };
                        return c;
                    }, {}));
                    this.setState({ sender: result }, () => {
                        // console.log(this.props.allUsers,'allUsersallUsers')
                        var arr = []
                        this.state.sender.map(items => {
                            this.props.allUsers.map(userData => {
                                if (userData.data.userUid === items.reciever && items.reciever !== currentUserUID) {
                                    if (arr.indexOf(userData) === -1) {
                                        arr.push({
                                            ...userData,
                                            ...items
                                        })
                                    }
                                    this.setState({ messageList: arr }, () => {
                                    })
                                }
                            })
                        })
                    })
                }
            }
        }


        if (this.props.notSeen) {
            console.log('props.notSeenWill', this.props.notSeen)
            var counts = 0
            var notseenarr = [];
            this.props.notSeen.map(item => {
                if (currentUserUID === item.reciever) {
                    notseenarr.push(item)
                }
            })
            this.setState({ notSeenAll: notseenarr }, () => {
                // this.setState({ notSeenAll: this.props.notSeen }, () => {
                // if (this.state.count === 0) {
                let arr = []
                setTimeout(() => {
                    const { notSeen, currentUser } = this.props;
                    const { count, messageList } = this.state;
                    console.log('MessagesListNabeel', messageList)
                    if (notSeen) {
                        // if (count === 0) {
                        if (currentUser && currentUser.role === 'seller') {
                            // this.setState({ count: count + 1 })
                            messageList.map((item, messageIndex) => {
                                notSeen.map((data, index) => {

                                    if (item.sender === data.sender) {
                                        // if (!data.seen) {
                                        counts++
                                        // }
                                    }
                                    if (index === (notSeen.length - 1)) {
                                        arr.push({
                                            badge: counts,
                                            sender: item.sender,
                                        })
                                        counts = 0
                                        this.setState({ badgeNum: arr })
                                    }
                                })
                            })
                            // this.setState({ count: 1 })
                        } else {
                            this.setState({ count: count + 1 })
                            messageList.map((item, messageIndex) => {
                                notSeen.map((data, index) => {
                                    if (item.sender === data.reciever && item.reciever === data.sender) {
                                        // if (!data.seen) {
                                        counts++
                                        // }
                                    }
                                    if (index === (notSeen.length - 1)) {
                                        arr.push({
                                            badge: counts,
                                            sender: item.sender,
                                        })
                                        counts = 0
                                        this.setState({ badgeNum: arr })
                                    }
                                })
                                // this.setState({ count: 1 })
                            })
                        }
                        // }
                    }
                }, 100);
                // }

            })
        }

        if (this.props.modifiedSeen) {
            if (this.props.notSeen) {
                this.props.notSeen.map((items, index) => {
                    if (items.time === this.props.modifiedSeen.time && items.reciever === this.props.modifiedSeen.reciever) {
                        this.props.notSeen.splice(index, 1)
                    }

                })
                this.setState({ count: 0 })
            }
        }

    }


    componentWillReceiveProps(props) {
        const { currentUser, currentUserUID, authChange, myCart, counter, flag, allUsers } = props;
        // console.log('currentUser*******', currentUser)
        if (authChange === 'login') {
            this.setState({ auth: 'login' })
        }
        else if (authChange === 'logout') {
            this.setState({ auth: 'logout' })
        }

        var total = 0
        if (myCart) {
            myCart.map(items => {
                total += items.quantity
            })
            this.setState({ badge: total })
        }
        if (props.chat) {
            setTimeout(() => {

                if (props.currentUser) {

                    if (props.currentUser.role === 'buyer') {
                        var result = Object.values(props.chat.reduce((c, { sender, message, reciever, time, product }) => {
                            c[reciever] = c[reciever] || { reciever, message, sender, time };
                            return c;
                        }, {}));
                        this.setState({ reciever: result }, () => {
                            // console.log(props.allUsers,'allUsersallUsers')
                            var arr = []
                            this.state.reciever.map(items => {
                                if (props.allUsers) {
                                    props.allUsers.map(userData => {
                                        if (userData.data.userUid === items.reciever && items.reciever !== currentUserUID) {
                                            if (arr.indexOf(userData) === -1) {
                                                arr.push({
                                                    ...userData,
                                                    ...items
                                                })
                                            }
                                            this.setState({ messageList: arr })
                                        }
                                    })
                                }
                            })
                        })
                    } else {
                        var result = Object.values(props.chat.reduce((c, { reciever, message, sender, time }) => {
                            c[sender] = c[sender] || { reciever, message, sender, time };
                            // c[productKey].product = product;
                            var keysArr = Object.keys(c);
                            if (keysArr.length) {
                                keysArr.map(key => {
                                    var obj = c[key];
                                    if (obj.sender === sender && obj.reciever === reciever) {
                                        obj.message = message;
                                        obj.time = time;
                                        obj.reciever = reciever
                                        obj.sender = sender
                                    }
                                    else {
                                        // c[sender] = { sender, reciever, message, time }
                                        c[sender] = c[sender] || { reciever, message, sender, time };
                                    }
                                })
                            }
                            return c;
                        }, {}));
                        this.setState({ sender: result }, () => {
                            console.log(this.state.sender, 'this.state.sender')
                            var arr = []
                            this.state.sender.map(items => {
                                if (props.allUsers) {
                                    props.allUsers.map(userData => {
                                        if (userData.data.userUid === items.sender && items.sender !== currentUserUID) {
                                            if (arr.indexOf(userData) === -1) {
                                                arr.push({
                                                    ...userData,
                                                    ...items
                                                })
                                            }
                                            this.setState({ messageList: arr }, () => {
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    }
                }
            }, 1000);
        }
        this.setState({ currentUser, currentUserUID })

        if (props.notSeen) {
            console.log('props.notSeen', props.notSeen)
            var counts = 0
            var notseenarr = [];
            props.notSeen.map(item => {
                if (item.reciever === currentUserUID) {
                    notseenarr.push(item)
                }
            })
            this.setState({ notSeenAll: notseenarr }, () => {
                // this.setState({ notSeenAll: props.notSeen }, () => {
                // if (this.state.count === 0) {
                console.log('props.notseen added', this.state.notSeenAll)
                let arr = []
                setTimeout(() => {
                    const { notSeen, currentUser } = this.props;
                    const { count, messageList } = this.state
                    console.log('MessagesListNabeel', messageList)
                    console.log('notSeenNabeel', notSeen)
                    if (notSeen) {
                        // if (count === 0) {
                        if (currentUser && currentUser.role === 'seller') {
                            // this.setState({ count: count + 1 })
                            messageList.map((item, messageIndex) => {
                                notSeen.map((data, index) => {

                                    // if (item.sender === data.sender) {
                                    if (item.sender === data.sender) {
                                        console.log('Datasssss seller', data, item)
                                        // if (!data.seen) {
                                        counts++
                                        // }
                                    }
                                    if (index === (notSeen.length - 1)) {
                                        arr.push({
                                            badge: counts,
                                            sender: item.sender,
                                        })
                                        counts = 0
                                        this.setState({ badgeNum: arr })
                                    }
                                })
                            })
                            // this.setState({ count: 1 })
                            // } else {
                        }
                        else if (currentUser && currentUser.role === 'buyer') {
                            this.setState({ count: count + 1 })
                            messageList.map((item, messageIndex) => {
                                notSeen.map((data, index) => {
                                    if (item.sender === data.reciever && item.reciever === data.sender) {
                                        console.log('Datasssss buyer', data, item)
                                        // if (!data.seen) {
                                        counts++
                                        // }
                                    }
                                    if (index === (notSeen.length - 1)) {
                                        arr.push({
                                            badge: counts,
                                            sender: item.sender,
                                        })
                                        counts = 0
                                        this.setState({ badgeNum: arr })
                                    }
                                })
                                // this.setState({ count: 1 })
                            })
                        }
                        // }
                    }
                }, 1000);
                // }

            })
        }



        if (props.modifiedSeen) {
            const { badgeNum } = this.state
            const { currentUser } = props
            if (props.notSeen) {
                props.notSeen.map((items, index) => {
                    if (items.time === props.modifiedSeen.time && items.reciever === props.modifiedSeen.reciever) {
                        props.notSeen.splice(index, 1)
                    }

                })
                if (badgeNum) {
                    badgeNum.map((items, index) => {
                        console.log(props.modifiedSeen, 'modified seen herre')
                        if (currentUser && currentUser.role === 'buyer') {
                            if (props.modifiedSeen.reciever === items.sender) {
                                badgeNum[index].badge = 0
                                this.setState({ badgeNum })
                            }
                        } else {
                            if (props.modifiedSeen.sender === items.sender) {
                                badgeNum[index].badge = 0
                                this.setState({ badgeNum })
                            }
                        }
                    })
                }
                console.log(this.state.badgeNum, 'badge number here')
                this.setState({ count: 0 })
            }
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    pageChange(path, text) {
        History.push(path);
        // console.log('Text', path, text);
        this.setState({ text })
    }

    logout() {
        // this.props.LogoutAction()
        this.props.actions.LogoutAction()
            .then((success) => {
                this.setState({ auth: 'logout' })
                this.props.history.index = 0;
            })
            .catch((error) => {
                this.setState({ auth: '' })
            })
    }

    Login() {
        History.push('/login')
    }

    openChatBox(items) {
        // console.log(items, 'my items here')
        this.setState({
            openChatBox: {
                reciever: items.reciever,
                sender: items.sender,
                openChatBox: true,
            },
            chatOpen: true,
            dropdownOpen: false,
        })
    }

    myChat(items, index) {
        const { badgeNum } = this.state
        const name = items.data
        const userMessages = items.message.slice(0)

        return (
            <div onClick={() => this.openChatBox(items)} className={'chat-row'}>
                <div className={'chat-image'}>
                    <div>
                        {
                            name.firstName.slice(0, 1).toUpperCase()
                        }
                    </div>
                </div>
                <div>
                    {/* {name.firstName + ' ' + name.lastName} */}
                    {`${(name.firstName.slice(0, 1)).toUpperCase()}${name.firstName.slice(1) + ' ' + name.lastName}`}
                    <span className={'msg-badge'}>{
                        badgeNum &&
                            badgeNum[index] &&
                            // badgeNum[index].sender === items.sender &&
                            badgeNum[index].badge ?
                            badgeNum[index].badge
                            : null

                    }</span>
                    <div style={{ color: 'grey', fontSize: '12px', fontWeight: '400' }}>
                        <span>
                            {
                                userMessages.length > 20 ?
                                    userMessages.slice(0, 20) + '...'
                                    :
                                    userMessages
                            }
                        </span>
                        <span style={{ float: 'right', marginRight: '10px' }}>
                            {/* <TimeAgo date={items.time} /> */}
                        </span>
                    </div>
                </div>
                <div className={'chat-hr'}>
                    <hr />
                </div>
            </div>
        )
    }

    showMore(text) {
        this.setState({ showmore: text })
    }

    closeChat() {
        this.setState({
            chatOpen: false
        })
    }

    Home() {
        this.props.actions.searchProductTextAction("")
        History.push('/')
    }


    _search = (val) => {
        const { allProducts } = this.props;
        var arr = [];
        if (allProducts && allProducts.length) {
            allProducts.map(item => {
                if (
                    (item.data.status === 'approved') &&
                    (item.data.name.toUpperCase().match(val.toUpperCase()) ||
                        item.data.brand.toUpperCase().match(val.toUpperCase()) ||
                        item.data.productType.toUpperCase().match(val.toUpperCase()) ||
                        item.data.manufacture.toUpperCase().match(val.toUpperCase()))
                ) {
                    arr.push(item)
                }
            })
        }
        this.props.actions.searchProductAction(arr)
        this.props.actions.searchProductTextAction(val)
    }


    render() {
        const { classes, theme, currentUser, currentUserUID } = this.props;
        const { open, text, badge, auth, messageList, showmore, openChatBox, dropdownOpen, notSeenAll, chatOpen } = this.state;
        // console.log('Text', text);
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    style={{ backgroundColor: '#f17b01' }}
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        {
                            currentUserUID ?

                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                :
                                null
                        }
                        <Typography variant="h6" color="inherit" noWrap>
                            {/* Persistent drawer */}
                            <div className={'logoHeader'}>
                                <img src={Image} style={{ width: 60, height: 60 }} alt="Log" />
                                <div>
                                    <h4 onClick={() => this.Home()} style={{ cursor: 'pointer' }} className={"Heading"}>Teq Exchange</h4>
                                </div>
                            </div>
                        </Typography>
                        <div className={"Logout-btn"}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    onChange={(e) => { this._search(e.target.value) }}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                            {currentUser &&
                                <div>
                                    {/* <Button size={'small'} className={'cartIconBtn'}> */}
                                    {
                                        <UncontrolledDropdown isOpen={dropdownOpen}>
                                            <DropdownToggle onClick={() => this.setState({ dropdownOpen: !dropdownOpen, chatOpen: false })} color={'#f17b01'} className={'msgIconBtn'} style={{ backgroundColor: '#f17b01', cursor: 'pointer', width: '42px' }}>
                                                {
                                                    notSeenAll &&
                                                        notSeenAll.length ?
                                                        <Badge color='primary' badgeContent={notSeenAll && notSeenAll.length}>
                                                            <FontAwesomeIcon className={'cart-Icon'} icon={'comment'} />
                                                        </Badge>
                                                        :
                                                        <FontAwesomeIcon className={'cart-Icon'} icon={'comment'} />
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu className={'messages'} right>
                                                <DropdownItem header>Messages</DropdownItem>
                                                <DropdownItem divider />
                                                {/* <DropdownItem disabled>Action</DropdownItem> */}
                                                {/* <DropdownItem> */}
                                                {
                                                    !showmore &&
                                                    <div className={'chat-notify'}>
                                                        {
                                                            messageList &&
                                                                messageList.length ?
                                                                messageList.map((items, index) => {
                                                                    return (
                                                                        index <= 3 &&
                                                                        this.myChat(items, index)
                                                                    )
                                                                }) :
                                                                <div style={{ color: 'grey', margin: '0 auto' }}>
                                                                    {'No chats available'}
                                                                </div>
                                                        }
                                                    </div>
                                                }
                                                {
                                                    showmore &&
                                                    <div className={'chat-notify scroll-View'}>
                                                        {
                                                            messageList ?
                                                                messageList.map((items, index) => {
                                                                    return (
                                                                        this.myChat(items)
                                                                    )
                                                                }) :
                                                                <div style={{ color: 'grey', margin: '0 auto' }}>
                                                                    {'No chats available'}
                                                                </div>
                                                        }
                                                    </div>
                                                }
                                                {
                                                    messageList &&
                                                    messageList.length > 3 &&
                                                    <div className={'show-more'}>
                                                        {
                                                            showmore ?
                                                                <div onClick={() => this.showMore(false)}>
                                                                    Show less
                                                                </div>
                                                                :
                                                                <div onClick={() => this.showMore(true)}>
                                                                    Show more
                                                                </div>
                                                        }
                                                    </div>
                                                }
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    }
                                    {/* </Button> */}
                                </div>
                            }
                            {currentUser && currentUser.role === 'buyer' &&
                                <Button size={'small'} onClick={() => History.push('/cart')} className={'cartIconBtn'}>
                                    {
                                        badge ?
                                            <Badge color='primary' badgeContent={badge && badge}>
                                                <FontAwesomeIcon className={'cart-Icon'} icon={'shopping-cart'} />
                                            </Badge>
                                            :
                                            <FontAwesomeIcon className={'cart-Icon'} icon={'shopping-cart'} />
                                    }
                                </Button>
                            }
                            {auth === "login" &&
                                <Button onClick={this.logout} size={"small"} variant={"outlined"} style={{ backgroundColor: 'white' }}>
                                    {/* <FontAwesomeIcon
                                            size='1x'
                                            icon={"user-lock"}
                                        /> */}
                                    Logout
                                </Button>
                            }
                            {auth === "logout" &&
                                <Button onClick={this.Login} size={"small"} variant={"outlined"} style={{ backgroundColor: 'white' }}>
                                    {/* <FontAwesomeIcon
                                            size='1x'
                                            icon={"user"}
                                        /> */}
                                    Login
                                </Button>
                            }
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <img src={logo} style={{ width: 60, height: 60 }} alt="Log" />
                        <h3 style={{ color: 'grey' }}>Teq XC</h3>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    {
                        currentUser && currentUser.role === 'seller' ?
                            < List >
                                {currentUserUID ?
                                    < List >
                                        {
                                            [{ Text: 'Home', icon: 'home', path: '/' }, { Text: 'Products', icon: 'tags', path: '/products' }, { Text: 'Order', icon: 'shopping-basket', path: '/orders' }, { Text: 'Profile', icon: 'user-check', path: '/profile' }].map((item, index) => (
                                                <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon
                                                            size='1x'
                                                            icon={`${item.icon}`}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Text} />
                                                </ListItem>
                                            ))
                                        }
                                    </ List>
                                    :
                                    < List >
                                        {
                                            [{ Text: 'Home', icon: 'home', path: '/' }].map((item, index) => (
                                                <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon
                                                            size='1x'
                                                            icon={`${item.icon}`}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Text} />
                                                </ListItem>
                                            ))
                                        }
                                    </ List>
                                }

                            </List>
                            :
                            < List >
                                {currentUserUID ?
                                    < List >
                                        {
                                            [{ Text: 'Home', icon: 'home', path: '/' }, { Text: 'Order', icon: 'shopping-basket', path: '/orders' }, { Text: 'Profile', icon: 'user-check', path: '/profile' }].map((item, index) => (
                                                <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon
                                                            size='1x'
                                                            icon={`${item.icon}`}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Text} />
                                                </ListItem>
                                            ))
                                        }
                                    </ List>
                                    :
                                    < List >
                                        {
                                            [{ Text: 'Home', icon: 'home', path: '/' }].map((item, index) => (
                                                <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon
                                                            size='1x'
                                                            icon={`${item.icon}`}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Text} />
                                                </ListItem>
                                            ))
                                        }
                                    </ List>
                                }

                            </List>
                    }
                    <Divider />
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                </main>
                {
                    currentUserUID ?
                        <div>
                            {/* <MessageTemplate otherUID={product.data.userUid} /> */}
                            {
                                chatOpen ?
                                    <MessageTemplate
                                        otherUID={currentUserUID !== openChatBox.sender ? openChatBox.sender : openChatBox.reciever}
                                        openChatMessage={openChatBox}
                                        closeChat={() => this.closeChat()}
                                        openChat={chatOpen}
                                        dropdown={dropdownOpen}
                                    />
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                }
            </div >
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        currentUser: states.authReducer.CURRENTUSER,
        allUsers: states.authReducer.USERS,
        currentUserUID: states.authReducer.CURRENTUSERUID,
        myCart: states.cartReducer.CART,
        counter: states.cartReducer.COUNTER,
        authChange: states.authReducer.AUTHCHANGE,
        flag: states.cartReducer.FLAG,
        chat: states.chatReducer.CHAT,
        notSeen: states.chatReducer.NOTSEEN,
        modifiedSeen: states.chatReducer.MODIFIEDSEEN,
        allProducts: states.productReducer.ALLPRODUCTS,

    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            LogoutAction, seenBadge, searchProductAction, searchProductTextAction
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PersistentDrawerLeft));