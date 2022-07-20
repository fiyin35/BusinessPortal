import { ApiService } from "../../../../services/apiService";
import { routes } from "../../../../services/paths";
import { authConstants } from "../../../action-constants/onboarding/";

import { Dispatch } from 'redux';

import { history } from "../../../../shared/_helpers/history";
import {
    handleRequestErrors,
} from "../../../../shared/utils";




const Login =(loginPayload: any) =>{
    
    if (loginPayload !== "CLEAR") {

        let userData:any;

        return (dispatch: Dispatch) => {

            let apiConsume = ApiService.request({ url: routes.LOGIN_USER, http_method: "POST", data: loginPayload });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        userData = { ...response.data };
                        userData.lastLogForAuth = Date.now();
                        localStorage.setItem("lingoBizAuth", JSON.stringify(userData));

                        let apiConsume2 = ApiService.request({
                            url: routes.MY_BUSINESSES_LIST,
                            http_method: "GET",
                          });
                          dispatch(request(apiConsume2));
                        
                        // dispatch(success(response.data));
                        return apiConsume2
                                .then((response2:any)=>{
                                    userData.accessibleAccounts = response2.data.result
                                    localStorage.setItem("lingoBizAuth", JSON.stringify(userData));
                                    dispatch(success(response.data))
                                    history.replace("/app")
                                })
                                .catch((error: any) => {
                                    dispatch(failure(handleRequestErrors(error)));
                                });
                       
                    }
                })
                .catch((error: any) => {
                    dispatch(failure(handleRequestErrors(error)));
                });
        };
    }

    return (dispatch: Dispatch) => {
        dispatch(clear());
    };

    function request(params: any) {
        return { type: authConstants.LOGIN_USER_PENDING, params };
    }
    function success(response: any) {
        return { type: authConstants.LOGIN_USER_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: authConstants.LOGIN_USER_FAILURE, error };
    }
    function clear() {
        return { type: authConstants.LOGIN_USER_RESET, clear_data: "" };
    }
}

const ForgotPassword =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: routes.FORGOT_PW, http_method: "POST", data: actionPayload });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
                        history.push("/account/forgot-password/otp");
                    }
                })
                .catch((error: any) => {
                    dispatch(failure(handleRequestErrors(error)));
                });
        };
    }

    return (dispatch: Dispatch) => {
        dispatch(clear());
    };

    function request(params: any) {
        return { type: authConstants.FORGOT_PASSWORD_PENDING, params };
    }
    function success(response: any) {
        return { type: authConstants.FORGOT_PASSWORD_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: authConstants.FORGOT_PASSWORD_FAILURE, error };
    }
    function clear() {
        return { type: authConstants.FORGOT_PASSWORD_RESET, clear_data: "" };
    }
}

const ValidatePasswordOtp =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: routes.VALIDATE_OTP_PW, http_method: "POST", data: actionPayload });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
                        history.replace("/account/set-password")
                    }
                })
                .catch((error: any) => {
                    dispatch(failure(handleRequestErrors(error)));
                });
        };
    }

    return (dispatch: Dispatch) => {
        dispatch(clear());
    };

    function request(params: any) {
        return { type: authConstants.VALIDATE_PASSWORD_OTP_PENDING, params };
    }
    function success(response: any) {
        return { type: authConstants.VALIDATE_PASSWORD_OTP_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: authConstants.VALIDATE_PASSWORD_OTP_FAILURE, error };
    }
    function clear() {
        return { type: authConstants.VALIDATE_PASSWORD_OTP_RESET, clear_data: "" };
    }
}

const SignUp =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: routes.SIGN_UP, http_method: "POST", data: actionPayload });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
                        history.replace("/app")
                    }
                })
                .catch((error: any) => {
                    dispatch(failure(handleRequestErrors(error)));
                });
        };
    }

    return (dispatch: Dispatch) => {
        dispatch(clear());
    };

    function request(params: any) {
        return { type: authConstants.SIGNUP_PENDING, params };
    }
    function success(response: any) {
        return { type: authConstants.SIGNUP_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: authConstants.SIGNUP_FAILURE, error };
    }
    function clear() {
        return { type: authConstants.SIGNUP_RESET, clear_data: "" };
    }
}



const Logout = () => {
    localStorage.removeItem("lingoBizAuth");
    localStorage.removeItem("state");

    history.push("/account/sign-in");
    return (dispatch: Dispatch) => {

        dispatch(logout());
        
    };

    function logout() {
        return { type: authConstants.LOGOUT };
    }

}

const ForbiddenAccess = () => {
    // return null;
}

export const authActions = {
    Login,
    SignUp,
    ForgotPassword,
    ValidatePasswordOtp,
    Logout,
    ForbiddenAccess,
};
