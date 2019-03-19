import swal from 'sweetalert2';
import actionTypes from '../constant/constant'
import firebase from '../../Config/Firebase/firebase';
import History from '../../History/History';

const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

export function allProduct() {
    const allproductArr = []

    return dispatch => {
        db.collection('products')
            .onSnapshot(function (querySnapshot) {

                // db.collection('products').get()
                //     .then((querySnapshot) => {

                querySnapshot.docChanges().forEach(docs => {
                    // if (docs.data().userUid === userUid) {
                    if (docs.type === 'added') {

                        var obj = {
                            key: docs.doc.id,
                            data: docs.doc.data()
                        }
                        allproductArr.push(obj)
                        console.log('products Arrr*********', allproductArr)
                        dispatch({ type: actionTypes.ALLPRODUCTS, payload: allproductArr })
                    }
                    if (docs.type === 'modified') {
                        var obj = {
                            key: docs.doc.id,
                            data: docs.doc.data()
                        }
                        allproductArr.map((item, index) => {
                            if (item.key === docs.doc.id) {
                                allproductArr.splice(index, 1, obj)
                            }
                        })
                        dispatch({ type: actionTypes.ALLPRODUCTS, payload: allproductArr })
                    }
                })
            })
    }
}


export function products(userUid) {
    const productArr = []
    var counter = false
    return dispatch => {
        // console.log(userUid, 'ussserrrrrr')
        db.collection('products').where('userUid', '==', userUid).onSnapshot((querySnapshot) => {
            // console.log(querySnapshot,'querysnaps')
            if (querySnapshot.empty) {
                console.log(querySnapshot.empty, 'empty products true')
                dispatch({ type: actionTypes.EMPTYPRODUCT, payload: true })
            } else {
                console.log(querySnapshot.empty, 'empty products false')
                dispatch({ type: actionTypes.EMPTYPRODUCT, payload: false })
            }
            querySnapshot.docChanges().forEach(docs => {
                if (docs.type === 'added') {
                    const obj = {
                        data: docs.doc.data(),
                        key: docs.doc.id
                    }
                    productArr.push(obj)
                    console.log(productArr, 'products Arrr')
                    counter = !counter
                    dispatch({ type: actionTypes.PRODUCTS, payload: productArr })
                    dispatch({ type: actionTypes.FLAG, payload: counter })
                }
            })
        })
    }
}




export function searchProductAction(products) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            dispatch({ type: actionTypes.SEARCHPRODUCTS, payload: products })
        })
    }
}

export function searchProductTextAction(val) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            dispatch({ type: actionTypes.SEARCHPRODUCTSTEXT, payload: val })
        })
    }
}