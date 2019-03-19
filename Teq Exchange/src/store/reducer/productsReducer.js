import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    PRODUCTS: null,
    ALLPRODUCTS: null,
    EMPTYPRODUCT: null,
    SEARCHPRODUCTS: null,
    SEARCHPRODUCTSTEXT: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTS:
            return ({
                ...states,
                PRODUCTS: action.payload
            })
        case actionTypes.ALLPRODUCTS:
            return ({
                ...states,
                ALLPRODUCTS: action.payload
            })
        case actionTypes.EMPTYPRODUCT:
            return ({
                ...states,
                EMPTYPRODUCT: action.payload
            })
        case actionTypes.SEARCHPRODUCTS:
            return ({
                ...states,
                SEARCHPRODUCTS: action.payload
            })
        case actionTypes.SEARCHPRODUCTSTEXT:
            return ({
                ...states,
                SEARCHPRODUCTSTEXT: action.payload
            })
        default:
            return states;
    }
}