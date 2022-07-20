let BASEURL = "https://fe-api-sandbox.banklingo.app/Fintech.Onboarding/api/BusinessProfile";
let BASEURL2 = "https://fe-api-sandbox.banklingo.app/Fintech.Transfers/api/Business";


export const routes = {
    LOGIN_USER: BASEURL + "/login",
    SIGN_UP: BASEURL + "/signup",
    FORGOT_PW: BASEURL + "/initiatepasswordreset",
    VALIDATE_OTP_PW: BASEURL + "/validateotp",
    COMPLETE_PW_RESET: BASEURL + "/completepasswordreset",
    MY_BUSINESSES: BASEURL + "/businesses",
    MY_BUSINESS_USERS: BASEURL + "/businessusers",
    MY_BUSINESSES_LIST: BASEURL + "/accessiblebusinessprofile",
    NEW_BUSINESS: BASEURL + "/newbusiness",
    GET_VIRTUAL_ACCTS: BASEURL2 + "/Transfer/virutalaccounts",
    CREATE_VIRTUAL_ACCT: BASEURL2 + "/Transfer/createvirtualaccount",
    GET_ACC_BAL: BASEURL2 + "/Transfer/accountbalance",
    TXT_HISTORY: BASEURL2 + "/Transfer/transactionhistory",
    GET_VIRTUAL_ACCT_TRANSACTIONS: BASEURL2 + "/Transfer/transfers",
}
