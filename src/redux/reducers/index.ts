import { combineReducers } from "redux";
import { authConstants } from "../action-constants/onboarding/";
import {
    outboundReducers,
    mybizUsereducers,
    accountReducers
} from "./all-reducers"
const rootReducer = (state: any, action: any) => {
    if (action.type === authConstants.LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
};

const onboardingOutboundReducers = combineReducers({
    loginReducer: outboundReducers.loginReducer,
    signUpReducer: outboundReducers.signUpReducer,
    forgotPasswordReducer: outboundReducers.forgotPasswordReducer,
    validatePasswordOtpReducer: outboundReducers.validatePasswordOtpReducer,
});

const bizUserReducers = combineReducers({
    getAllBizReducer: mybizUsereducers.getAllBizReducer,
    addNewBizReducer: mybizUsereducers.addNewBizReducer,
    geMyBizUsersReducer: mybizUsereducers.geMyBizUsersReducer,
    createMyBizUsersReducer: mybizUsereducers.createMyBizUsersReducer,
});

const myAccountsReducers = combineReducers({
    getAllBizUAccountsReducer: accountReducers.getAllBizUAccountsReducer,
    createAVirtualAccountReducer: accountReducers.createAVirtualAccountReducer,
    getVirtualAccTxtnsReducer: accountReducers.getVirtualAccTxtnsReducer,
    getAccBalReducer: accountReducers.getAccBalReducer,
    getAccHistReducer: accountReducers.getAccHistReducer,
});

const appReducer = combineReducers({
    onboardingOutboundReducers,
    bizUserReducers,
    myAccountsReducers
});

export default rootReducer;