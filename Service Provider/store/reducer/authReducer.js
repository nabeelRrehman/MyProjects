import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    CURRENTUSER: null,
    CURRENTUSERUID: null,
    USERDATA: null,
    LOADER: false,
    ALLUSERS: null,
    ALLMESSAGES: [],
    FLAG: null,
    MYREQUEST: [],
    OTHERREQ: null,
    MODIFYREQ: null,
    MYCONTACT: null,
    ADMINMSG: null,
    CATEGORIES: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CURRENTUSER:
            return ({
                ...states,
                CURRENTUSER: action.payload
            })
        case actionTypes.CURRENTUSERUID:
            return ({
                ...states,
                CURRENTUSERUID: action.payload
            })
        case actionTypes.USERDATA:
            return ({
                ...states,
                USERDATA: action.payload
            })
        case actionTypes.LOADER:
            return ({
                ...states,
                LOADER: action.payload
            })
        case actionTypes.ALLUSERS:
            return ({
                ...states,
                ALLUSERS: action.payload
            })
        case actionTypes.ALLMESSAGES:
            return ({
                ...states,
                ALLMESSAGES: action.payload
            })
        case actionTypes.FLAG:
            return ({
                ...states,
                FLAG: action.payload
            })
        case actionTypes.MYREQUEST:
            return ({
                ...states,
                MYREQUEST: action.payload
            })
        case actionTypes.OTHERREQ:
            return ({
                ...states,
                OTHERREQ: action.payload
            })
        case actionTypes.MODIFYREQ:
            return ({
                ...states,
                MODIFYREQ: action.payload
            })
        case actionTypes.MYCONTACT:
            return ({
                ...states,
                MYCONTACT: action.payload
            })
        case actionTypes.ADMINMSG:
            return ({
                ...states,
                ADMINMSG: action.payload
            })
        case actionTypes.CATEGORIES:
            return ({
                ...states,
                CATEGORIES: action.payload
            })
        default:
            return states;
    }
}