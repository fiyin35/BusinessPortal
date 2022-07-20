import {
    signUpReducer,
    loginReducer,
    forgotPasswordReducer,
    validatePasswordOtpReducer
} from "../reducers/onboarding/outbound.reducer"

import {
    geMyBizUsersReducer,
    createMyBizUsersReducer
} from "../reducers/in-app/my-biz-users/my-biz-users.reducer"

import {
    getAllBizReducer,
    addNewBizReducer
} from "../reducers/in-app/my-biz/mybiz.reducer"

import {
    getAllBizUAccountsReducer,
    createAVirtualAccountReducer,
    getVirtualAccTxtnsReducer,
    getAccBalReducer,
    getAccHistReducer
} from "../reducers/in-app/accounts/accounts.reducer"

export const outboundReducers = {
    signUpReducer,
    loginReducer,
    forgotPasswordReducer,
    validatePasswordOtpReducer
}



export const mybizUsereducers = {
    getAllBizReducer,
    addNewBizReducer,
    geMyBizUsersReducer,
    createMyBizUsersReducer
}
export const accountReducers = {
    getAllBizUAccountsReducer,
    createAVirtualAccountReducer,
    getVirtualAccTxtnsReducer,
    getAccBalReducer,
    getAccHistReducer
}