
import actionTypes from '../constant/constant'
// import swal from 'sweetalert2'
import firebase from '../../Config/Firebase'
import { Permissions, Contacts } from 'expo';
const firestore = require("firebase");

require("firebase/firestore");

const db = firebase.firestore()


export function fbLogIn() {
    return dispatch => {
        return new Promise(async function (resolve, reject) {
            const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('368019830699839', {
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const credential = firebase.auth.FacebookAuthProvider.credential(token)

                firebase.auth().signInAndRetrieveDataWithCredential(credential).then((success) => {
                    console.log(success.additionalUserInfo.profile.name, 'success******');
                    var currentUID = success.user.uid
                    var obj = {
                        Name: success.additionalUserInfo.profile.name,
                        UID: success.user.uid,
                        email: success.user.email,
                        Photo: success.user.photoURL,
                    }
                    // firebase.database().ref('/UserData/' + currentUID).update(obj);
                    db.collection('users').doc(success.user.uid).set(obj).then((success) => {
                        // resolve here 
                        console.log('users add')
                        resolve(success)
                    })
                    dispatch({ type: actionTypes.CURRENTUSER, payload: obj })
                    dispatch({ type: actionTypes.CURRENTUSERUID, payload: currentUID })

                })
                    .catch((error) => {
                        console.log(error, '********');
                        alert(error)
                    })
                console.log("fb login");

            }
        })
    }
}


export function googleSignIn() {
    return dispatch => {
        return new Promise(async function (resolve, reject) {
            const android = '385273294757-tdd8052636so487hcf9qhvh6g71vc0f7.apps.googleusercontent.com'
            const Ios = '385273294757-oe9tqudpkhafk01giei86s33v12nhq2t.apps.googleusercontent.com'
            try {
                const result = await Expo.Google.logInAsync({
                    androidClientId: android,
                    iosClientId: Ios,
                    scopes: ['profile', 'email'],
                });

                if (result.type === 'success') {
                    const { idToken, accessToken } = result;
                    // console.log(result, 'result')
                    const credential = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                    firebase
                        .auth()
                        .signInAndRetrieveDataWithCredential(credential)
                        .then(success => {
                            // user res, create your user, do whatever you want
                            // console.log('success==>', success);
                            var currentUID = success.user.uid
                            var obj = {
                                Name: success.user.displayName,
                                UID: success.user.uid,
                                email: success.user.email,
                                Photo: success.user.photoURL,
                            }
                            db.collection('users').doc(success.user.uid).set(obj).then((success) => {
                                // resolve here 
                                resolve(success)

                            })
                            dispatch({ type: actionTypes.CURRENTUSER, payload: obj })
                            dispatch({ type: actionTypes.CURRENTUSERUID, payload: currentUID })
                        })
                        .catch(error => {
                            console.log("firebase cred err:", error);
                        });
                    return result.accessToken;

                } else {
                    return { cancelled: true };
                }
            } catch (e) {
                return { error: true };
            }
        })
    }
}


export function logout() {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().signOut()
                .then(() => {
                    dispatch({ type: actionTypes.CURRENTUSERUID, payload: null })
                    dispatch({ type: actionTypes.CURRENTUSER, payload: null })
                    dispatch({ type: actionTypes.USERDATA, payload: null })

                    resolve()
                })
        })
    }
}


export function userAuth() {
    return dispatch => {
        // firebase.auth().signOut()
        return new Promise(function (resolve, reject) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var uid = user.uid;
                    dispatch({ type: actionTypes.LOADER, payload: true })

                    db.collection('users').where('UID', '==', uid).get().then((snapShot) => {
                        snapShot.forEach((docs) => {
                            // console.log(docs.data(), 'user ka data')
                            dispatch({ type: actionTypes.CURRENTUSER, payload: docs.data() })
                            dispatch({ type: actionTypes.CURRENTUSERUID, payload: uid })
                        })
                    })

                    db.collection('userData').where('userUid', '==', uid).onSnapshot((querySnapshot) => {
                        if (querySnapshot.empty) {
                            dispatch({ type: actionTypes.LOADER, payload: false })
                            reject()
                        } else {
                            resolve()
                        }
                        querySnapshot.docChanges().forEach((docs) => {
                            if (!docs.doc.exists) {

                            } else {
                                dispatch({ type: actionTypes.LOADER, payload: false })
                                // dispatch({ type: actionTypes.USERDATA, payload: docs.doc.data() })

                                if (docs.type === 'added') {
                                    // console.log(docs.doc.data(), 'docs docs.data()')
                                    dispatch({ type: actionTypes.USERDATA, payload: docs.doc.data() })
                                }
                                if (docs.type === 'modified') {
                                    // console.log(docs.doc.data(), 'docs modified here')
                                    dispatch({ type: actionTypes.USERDATA, payload: docs.doc.data() })
                                }

                            }
                        })

                    })
                }
                else {
                    // reject()
                    // dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })
                    // dispatch({ type: actionTypes.ROLE, payload: 'user' })
                }
            });
        })
    }
}



export function userDetails(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('userData').add(obj)
                .then(() => {
                    console.log('added')
                    resolve()
                })
        })
    }
}



export function addService(obj, user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('userData').where('userUid', '==', user).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((docs) => {
                        db.collection('userData').doc(docs.id).update({
                            services: obj
                        })
                            .then(() => {
                                resolve()
                            })
                    })
                })
        })
    }
}


export function AllUsers() {
    var arr = []
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('userData').onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {
                        // console.log('users datat here',docs.doc.data())
                        arr.push(docs.doc.data())
                        dispatch({ type: actionTypes.ALLUSERS, payload: arr })
                    }

                })
            })
        })
    }
}


export function AddRequest(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('request').doc(obj.OfferFrom).set(obj).then(() => {
                resolve()
            })
        })
    }
}



export function addMessage(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('messages').add(obj).then(() => {
                resolve()
            })
        })
    }
}



export function GetMessage(user) {
    var senderMsg = []
    let flag = false
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('messages').onSnapshot((sender) => {
                sender.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {
                        flag = !flag
                        senderMsg.push(docs.doc.data())
                        dispatch({ type: actionTypes.FLAG, payload: flag })
                        dispatch({ type: actionTypes.ALLMESSAGES, payload: senderMsg })
                    }
                })
            })
        })
    }
}


export function GetRequest(user) {
    var requestTo = []
    var requestFrom = []
    var flag = false
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log(user, 'ye user mill rha ha')
            db.collection('request').where('OfferFrom', '==', user).onSnapshot((querySnapshot) => {
                if (querySnapshot.empty) {

                }
                querySnapshot.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {
                        flag = !flag
                        requestFrom.push(docs.doc.data())
                        dispatch({ type: actionTypes.MYREQUEST, payload: requestFrom })
                        dispatch({ type: actionTypes.FLAG, payload: flag })
                    }
                    if (docs.type === 'modified') {
                        dispatch({ type: actionTypes.MODIFYREQ, payload: docs.doc.data() })
                    }
                })
            })

            db.collection('request').where('OfferTo', '==', user).onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {
                        flag = !flag
                        requestTo.push(docs.doc.data())
                        dispatch({ type: actionTypes.OTHERREQ, payload: requestTo })
                        dispatch({ type: actionTypes.FLAG, payload: flag })
                    }
                    if (docs.type === 'modified') {
                        dispatch({ type: actionTypes.MODIFYREQ, payload: docs.doc.data() })
                    }
                })
            })
        })
    }
}


export function seenUpdate(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('request').where('OfferTo', '==', user).get().then((querySnapshot) => {
                querySnapshot.forEach((docs) => {
                    db.collection('request').doc(docs.id).update({
                        seen: true
                    })
                })
            })
        })
    }
}


export function AcceptOffer(offer) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('request').where('OfferFrom', '==', offer.OfferFrom).where('OfferTo', '==', offer.OfferTo)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((docs) => {
                        db.collection('request').doc(docs.id).update({
                            status: 'accepted'
                        })
                            .then(() => {
                                resolve()
                            })
                    })
                })
        })
    }
}


export function addReview(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('ratings').add(obj)
                .then(() => {
                    resolve()
                })
        })
    }
}



export function GetUserReview(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            let counter = 0
            db.collection('ratings').where('userUid', '==', user).get()
                .then((querySnapshot) => {
                    console.log(querySnapshot, 'sasada')
                    querySnapshot.forEach((docs) => {
                        counter += Number(docs.data().review)
                        console.log(counter)
                    })
                })
        })
    }
}

var counter = 0

export function checkReview(user, otherUser) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            let counter = 0
            db.collection('ratings').where('userUid', '==', user).where('reviewFrom', '==', otherUser)
                .get().then((querySnapshot) => {
                    counter++
                    if (querySnapshot.empty) {

                    } else {
                        if (counter === querySnapshot.size) {
                            resolve()
                        }
                    }
                })
        })
    }
}

export function GetMyReviews(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            let counter = 0
            let count = 0
            db.collection('ratings').where('userUid', '==', user)
                .onSnapshot((querySnapshot) => {
                    querySnapshot.docChanges().forEach((docs) => {
                        if (docs.type === 'added') {
                            count++
                            counter += docs.doc.data().review
                            if (count === querySnapshot.size) {
                                var review = Math.floor(counter / querySnapshot.size)
                                resolve(review)
                            }
                        }
                    })
                })
        })
    }
}

const getContacts = async () => {
    console.log('ye bhi chala')
    const permission = await Permissions.askAsync(Permissions.CONTACTS)
    if (permission.status !== 'granted') {
        // Permission was denied...
        return;
    }
    const { data } = await Contacts.getContactsAsync({
        fields: [
            Contacts.PHONE_NUMBERS,
            Contacts.EMAILS,
        ]
    })
    if (data.length > 0) {
        var phoneContact = [];
        setTimeout(() => {
            const objj = {
                phoneContacts: phoneContact
            }
            // firebase.database().ref('/UserData/' + currentUID).update(objj);
        }, 100)
        data.map((i) => {
            const name = i.name;
            i.phoneNumbers.map((n) => {
                const obj = {
                    name: name,
                    number: n.number
                }
                // console.log(obj, 'Contact==>>')
                phoneContact.push({ obj })
                // this.setState({ contacts: phoneContact })
            })
        })
        return phoneContact
    }
}

export function MyContacts() {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log('chala');

            getContacts().then((res) => {
                // console.log(res,'res')
                dispatch({ type: actionTypes.MYCONTACT, payload: res })
            })
        })
    }
}

export function addAdminMsg(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('AdminMessages').add(obj)
        })
    }
}

export function GetAdminMsg() {
    var arr = []
    var flag = false
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('AdminMessages').onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {
                        flag = !flag
                        arr.push(docs.doc.data())
                        dispatch({ type: actionTypes.FLAG, payload: flag })
                        dispatch({ type: actionTypes.ADMINMSG, payload: arr })
                    }
                })
            })
        })
    }
}

export function GetCategories() {
    var arr = []
    var flag = false
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('categories').get().then((querySnapshot) => {
                querySnapshot.forEach((docs) => {
                    arr.push(docs.data().category)
                    dispatch({ type: actionTypes.CATEGORIES, payload: arr })

                })
            })
        })
    }
}

