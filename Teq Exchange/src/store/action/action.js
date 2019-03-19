import swal from 'sweetalert2';
import actionTypes from '../constant/constant'
import firebase from '../../Config/Firebase/firebase';
import History from '../../History/History';
import { func } from 'prop-types';

const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

export function stateAuthChangeAction() {
    return dispatch => {
        // if (JSON.parse(localStorage.getItem('UserData'))) {
        //     History.push('/signup')
        // }
        var arr = []
        db.collection("banners").get().then((querySnapshot) => {
            console.log('BannersLength', querySnapshot)
            querySnapshot.forEach((doc) => {
                console.log("Image Slider*******", doc.data());
                console.log("Image Slider data*******:", doc.data());
                arr.push(doc.data())
                dispatch({ type: actionTypes.SLIDER, payload: arr })
            })
        })

        db.collection('siteInfo').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log('PRODUCTCATOGERY', doc.data())
                dispatch({ type: actionTypes.ABOUTWEBSITE, payload: doc.data() })
            })
        })

        var productCatArr = []
        db.collection('productCatogery').onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((doc) => {
                if (doc.type === 'added') {
                    console.log('productCatogeryproductCatogery', doc.doc.id, doc.doc.data())
                    productCatArr.push({ data: doc.doc.data(), key: doc.doc.id })
                    dispatch({ type: actionTypes.PRODUCTCATOGERY, payload: productCatArr })
                }
            })
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;


                // End Work For SLider

                // db.collection("users").get()
                //     .then((querySnapshot) => {
                //         querySnapshot.forEach((doc) => {
                //             if (uid === doc.data().userUid) {
                db.collection("users").get()
                    .then(doc => {
                        if (!doc.empty) {
                            db.collection("users").where('userUid', '==', uid).get()
                                .then((querySnapshot) => {
                                    console.log('querySnapshot.docs', querySnapshot.docs)
                                    if (!querySnapshot.empty) {
                                        querySnapshot.docs.forEach((doc) => {


                                            const data = doc.data();
                                            console.log('Doc.ID', doc.id)
                                            const jsonData = JSON.stringify(data)
                                            const role = JSON.parse(jsonData).role;
                                            const userObj = JSON.parse(jsonData);

                                            const allUser = []
                                            db.collection('users').get()
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach(docs => {
                                                        // if (docs.data().userUid === userUid) {
                                                        const obj = {
                                                            data: docs.data(),
                                                            key: docs.id
                                                        }
                                                        if (docs.data().role !== "admin") {
                                                            allUser.push(obj)
                                                            console.log('allUser Arrr*********', allUser)
                                                            dispatch({ type: actionTypes.USERS, payload: allUser })
                                                        }
                                                        // }
                                                    })
                                                })


                                            if (role === 'admin') {
                                                // console.log('Admin Login Hai Bhaiya')
                                                // dispatch({ type: actionTypes.CURRENTUSERUID, payload: uid })
                                                // dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                                                dispatch({ type: actionTypes.ROLE, payload: 'admin' })


                                                var orderArr = [];
                                                db.collection('order').get().then((querySnapshot) => {
                                                    querySnapshot.forEach((doc) => {
                                                        const data = doc.data();
                                                        const jsonData = JSON.stringify(data)
                                                        const userObj = JSON.parse(jsonData);
                                                        const obj = {
                                                            data: userObj,
                                                            key: doc.id
                                                        }
                                                        orderArr.push(obj)
                                                        console.log('orderArr', orderArr)
                                                        dispatch({ type: actionTypes.ALLORDERS, payload: orderArr })
                                                    })
                                                })


                                                const contactArr = []
                                                db.collection('contact').get()
                                                    .then((querySnapshot) => {
                                                        querySnapshot.forEach(docs => {
                                                            // if (docs.data().userUid === userUid) {
                                                            const obj = {
                                                                data: docs.data(),
                                                                key: docs.id
                                                            }
                                                            contactArr.push(obj)
                                                            console.log('products Arrr*********', allUser)
                                                            dispatch({ type: actionTypes.CONTACT, payload: contactArr })
                                                            // }
                                                        })
                                                    })
                                            }
                                            else {
                                                dispatch({ type: actionTypes.ROLE, payload: 'user' })
                                                const userApproval = JSON.parse(jsonData).isApproved;
                                                if (userApproval === 'true') {
                                                    dispatch({ type: actionTypes.AUTHCHANGE, payload: 'login' })
                                                    dispatch({ type: actionTypes.CURRENTUSERUID, payload: uid })
                                                    dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                                                }
                                                else {
                                                    dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })
                                                }
                                            }
                                        })
                                    }
                                    else {
                                        dispatch({ type: actionTypes.ROLE, payload: 'user' })
                                        dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })

                                        // History.push('/')
                                    }
                                })
                                .catch((e) => {
                                    console.log('Message FOr Auth', e.message)
                                })
                        }
                    });
            }
            else {
                dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })
                dispatch({ type: actionTypes.ROLE, payload: 'user' })
            }
        });

        //     }
        // });
    }
}


export function SignupAction(userData) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            // swal.showLoading();
            // console.log('userData****', userData);
            const useruid = firebase.auth().currentUser.uid;

            db.collection("users").add({
                ...userData,
                signupDate: new Date().toDateString(),
                userUid: useruid
            })
                .then((success) => {
                    localStorage.removeItem('UserData')
                    resolve(success)
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    if (userData.role === 'buyer') {
                        const userObj = {
                            ...userData,
                            signupDate: new Date().toDateString(),
                        }
                        dispatch({ type: actionTypes.CURRENTUSERUID, payload: useruid })
                        dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                        dispatch({ type: actionTypes.AUTHCHANGE, payload: 'login' })

                        toast({
                            type: 'success',
                            title: 'Signup successfully'
                        })
                        setTimeout(() => {
                            History.push('/')
                        }, 1000)
                    }
                    else {
                        toast({
                            type: 'success',
                            title: 'Signup successfully'
                        })
                        setTimeout(() => {
                            History.push('/')
                        }, 1000)
                    }
                })
                .catch((error) => {
                    reject(error)
                    swal({
                        type: 'error',
                        title: error.message
                    })
                    // console.error("Error writing document: ", error);
                });
        })
    }
}

export function LoginAction(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((success) => {
                    var docRef = db.collection("users");
                    docRef.get()
                        .then(doc => {
                            if (!doc.empty) {
                                db.collection("users").where('userUid', '==', success.user.uid).get()
                                    .then((querySnapshot) => {
                                        console.log('querySnapshot.docs', querySnapshot.docs)
                                        if (!querySnapshot.empty) {
                                            querySnapshot.docs.forEach((doc) => {
                                                console.log(doc.data().userUid, 'user ki uid', success.user.uid)
                                                const data = doc.data();
                                                const jsonData = JSON.stringify(data)
                                                const role = JSON.parse(jsonData).role
                                                const userObj = JSON.parse(jsonData);
                                                console.log('role', role)
                                                if (role === 'admin') {
                                                    dispatch({ type: actionTypes.ROLE, payload: 'admin' })
                                                    // dispatch({ type: actionTypes.CURRENTUSERUID, payload: doc.data().userUid })
                                                    // dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                                                    setTimeout(() => {
                                                        History.push('/')
                                                    }, 100)

                                                    const allUser = []
                                                    db.collection('users').get()
                                                        .then((querySnapshot) => {
                                                            querySnapshot.forEach(docs => {
                                                                const obj = {
                                                                    data: docs.data(),
                                                                    key: docs.id
                                                                }
                                                                allUser.push(obj)
                                                                dispatch({ type: actionTypes.USERS, payload: allUser })
                                                            })
                                                        })


                                                    var orderArr = [];
                                                    db.collection('order').get().then((querySnapshot) => {
                                                        querySnapshot.forEach((doc) => {
                                                            const data = doc.data();
                                                            const jsonData = JSON.stringify(data)
                                                            const userObj = JSON.parse(jsonData);
                                                            const obj = {
                                                                data: userObj,
                                                                key: doc.id
                                                            }
                                                            orderArr.push(obj)
                                                            console.log('orderArr', orderArr)
                                                            dispatch({ type: actionTypes.ALLORDERS, payload: orderArr })
                                                        })
                                                    })


                                                    const contactArr = []
                                                    db.collection('contact').get()
                                                        .then((querySnapshot) => {
                                                            querySnapshot.forEach(docs => {
                                                                // if (docs.data().userUid === userUid) {
                                                                const obj = {
                                                                    data: docs.data(),
                                                                    key: docs.id
                                                                }
                                                                contactArr.push(obj)
                                                                console.log('products Arrr*********', allUser)
                                                                dispatch({ type: actionTypes.CONTACT, payload: contactArr })
                                                                // }
                                                            })
                                                        })
                                                }
                                                else {
                                                    dispatch({ type: actionTypes.ROLE, payload: 'user' })
                                                    const userApproval = JSON.parse(jsonData).isApproved
                                                    console.log('userApproval', userApproval)
                                                    if (userApproval === 'true') {
                                                        // console.log(doc.data().userUid,'user ki id ')
                                                        dispatch({ type: actionTypes.CURRENTUSERUID, payload: doc.data().userUid })
                                                        dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                                                        dispatch({ type: actionTypes.AUTHCHANGE, payload: 'login' })
                                                        History.push('/')
                                                        resolve(success.user.uid, userObj.role)
                                                        const toast = swal.mixin({
                                                            toast: true,
                                                            position: 'bottom-center',
                                                            showConfirmButton: false,
                                                            timer: 2000
                                                        });

                                                        toast({
                                                            type: 'success',
                                                            title: 'Login successfully'
                                                        })
                                                        dispatch({ type: actionTypes.LOGINCOND, payload: 'Success' })
                                                    }
                                                    else if (userApproval === 'block') {
                                                        History.push('/blockAccount')
                                                    }
                                                    else if (userApproval === 'false') {
                                                        History.push('/')
                                                        swal({
                                                            type: 'error',
                                                            titleText: "Your account isn't approved"
                                                        })
                                                        dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })
                                                    }
                                                }
                                            })
                                        }
                                        else {
                                            console.log('UID Wali Else Hai')
                                            resolve(success)
                                            History.push({
                                                pathname: '/signup',
                                                state: { cond1: true, email: user.email }
                                            })
                                        }

                                    })
                                    .catch(error => {
                                        console.log('Error****', error.message)
                                        History.push({
                                            pathname: '/signup',
                                            state: { cond1: true }
                                        })
                                    });

                            } else {
                                console.log('UID k bahir Wali Else Hai')
                                resolve(success)
                                History.push({
                                    pathname: '/signup',
                                    state: { cond1: true }
                                })
                            }
                        }).catch(error => {
                            reject(error)
                            const toast = swal.mixin({
                                toast: true,
                                position: 'bottom-center',
                                showConfirmButton: false,
                                timer: 2000
                            });

                            toast({
                                type: 'error',
                                text: error.message
                            })
                        });
                })
                .catch((error) => {
                    console.log('error***', error.message)
                    dispatch({ type: actionTypes.LOGINCOND, payload: 'Error' })
                    reject(error)
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-center',
                        showConfirmButton: false,
                        timer: 2000
                    });

                    toast({
                        type: 'error',
                        text: error.message
                    })
                })
        })
    }
}


export function forgotPasswordAction(email) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            // console.log('Email Address', email)
            var auth = firebase.auth();

            auth.sendPasswordResetEmail(email)
                .then((success) => {
                    resolve(success)
                    // Email sent.
                    // console.log('success***', success)
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    toast({
                        type: 'success',
                        title: 'Reset Password',
                        text: 'Check email to reset your password!'
                    })
                    setTimeout(() => {
                        History.push('/login')
                    }, 1500)
                })
                .catch((error) => {
                    // An error happened.
                    reject(error)
                    setTimeout(() => {
                        // console.log('error***', error);
                        const toast = swal.mixin({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        toast({
                            type: 'error',
                            text: error.message
                        })
                    }, 1200)
                })
        })
    }
}

// ProductForm Work

export function addProductAction(productObj, userUID) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            // swal.showLoading();
            const addProduct = db.collection("products")
            addProduct.add(productObj)
                .then((success) => {
                    swal({
                        type: 'success',
                        title: 'Successfully Added',
                        timer: 900,
                        showConfirmButton: false
                    })
                    resolve(success)
                })
                .catch((error) => {
                    swal({
                        type: 'error',
                        title: error.message,
                    })
                    reject(error)
                })
        })
    }
}


export function editProductAction(productObj, productKey) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            swal.showLoading();
            const addProduct = db.collection("products").doc(productKey)
            addProduct.set(productObj)
                .then((success) => {
                    resolve(success)
                    swal({
                        type: 'success',
                        title: 'Updated',
                        timer: 1000,
                        showConfirmButton: false
                    })
                    setTimeout(() => {
                        History.push('/')
                    }, 1000)
                })
                .catch((error) => {
                    reject(error)
                    swal({
                        type: 'error',
                        title: error.message,
                    })
                })
        })
    }
}

export function editProfile(userProfile, userUID) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            var user = firebase.auth().currentUser;

            user.updateEmail(userProfile.contactEmail)
                .then(() => {
                    // Update successful.
                    db.collection("users").where("userUid", "==", userUID)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                console.log(doc.id, " => ", doc.data());

                                db.collection("users").doc(doc.id).set({ ...userProfile })
                                    .then(success => {
                                        resolve(success)
                                    })
                                    .catch(error => {
                                        reject(error)
                                    })
                            });
                        })
                }).catch((error) => {
                    // An error happened.
                });
        })
    }
}


export function LogoutAction() {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().signOut()
                .then(success => {
                    // console.log('Signed Out');
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1200
                    });

                    toast({
                        type: 'success',
                        title: 'Logout successfully'
                    })
                    History.push('/')
                    // History.replace('/');
                    // setTimeout(() => {
                    dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })
                    dispatch({ type: actionTypes.ROLE, payload: 'user' })
                    dispatch({ type: actionTypes.CURRENTUSERUID, payload: null })
                    dispatch({ type: actionTypes.CURRENTUSER, payload: null })
                    dispatch({ type: actionTypes.NOTSEEN, payload: null })
                    dispatch({ type: actionTypes.ALLORDERS, payload: null })
                    dispatch({ type: actionTypes.ORDERS, payload: null })
                    dispatch({ type: actionTypes.MODIFIEDSEEN, payload: null })
                    dispatch({ type: actionTypes.CART, payload: null })
                    dispatch({ type: actionTypes.SELLERORDER, payload: null })
                    // dispatch({ type: actionTypes.NOTSEEN, payload: null })
                    // dispatch({ type: actionTypes.NOTSEEN, payload: null })
                    resolve(success)
                    // }, 1000);

                })
                .catch(error => {
                    // console.log('error', error.message)
                    reject(error)
                })
        })

    }
}



export function sendMessage(message) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection("contact").add({ ...message })
                .then(success => {
                    resolve(success)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}
