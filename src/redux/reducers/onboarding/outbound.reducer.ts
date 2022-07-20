
import {authConstants} from "../../action-constants/onboarding"
// import {ReducerParams} from "../../../types"


let userLogged = localStorage.getItem('lingoBizAuth') || "{}";

let user = JSON.parse(userLogged);
const initialState = Object.keys(user).length>=1 ? { loggedIn: true, user } : {loggedIn: false};


export const loginReducer = (state = initialState, action:any)=>{
    // export const loginReducer = ({state = initialState, action}:ReducerParams)=>{
    switch (action.type) {
        case authConstants.LOGIN_USER_PENDING:
            return {
                request_status: authConstants.LOGIN_USER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case authConstants.LOGIN_USER_SUCCESS:
            return {
                request_status: authConstants.LOGIN_USER_SUCCESS,
                loggedIn: true,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.LOGIN_USER_FAILURE:
            return {
                request_status: authConstants.LOGIN_USER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.LOGIN_USER_RESET:
            return {
                request_status: authConstants.LOGIN_USER_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        case authConstants.LOGOUT:
            return {
                // test:"dsdsds",
                // request_data: action,
                ...state
              };
            
        case authConstants.LOGOUT_USER_SUCCESS:
                return {
                  ...state
                };

        default:
            return { ...state }
    }
}

export const forgotPasswordReducer = (state=initialState, action:any)=>{
    // export const forgotPasswordReducer = ({state=initialState, action}:ReducerParams)=>{
    switch (action.type) {
        case authConstants.FORGOT_PASSWORD_PENDING:
            return {
                request_status: authConstants.FORGOT_PASSWORD_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case authConstants.FORGOT_PASSWORD_SUCCESS:
            return {
                request_status: authConstants.FORGOT_PASSWORD_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.FORGOT_PASSWORD_FAILURE:
            return {
                request_status: authConstants.FORGOT_PASSWORD_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.FORGOT_PASSWORD_RESET:
            return {
                request_status: authConstants.FORGOT_PASSWORD_RESET,
                is_request_processing: false,
                request_data: {},
            };
        

        default:
            return {...state} 
    }
}

export const validatePasswordOtpReducer = (state=initialState, action:any)=>{
    // export const forgotPasswordReducer = ({state=initialState, action}:ReducerParams)=>{
    switch (action.type) {
        case authConstants.VALIDATE_PASSWORD_OTP_PENDING:
            return {
                request_status: authConstants.VALIDATE_PASSWORD_OTP_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case authConstants.VALIDATE_PASSWORD_OTP_SUCCESS:
            return {
                request_status: authConstants.VALIDATE_PASSWORD_OTP_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.VALIDATE_PASSWORD_OTP_FAILURE:
            return {
                request_status: authConstants.VALIDATE_PASSWORD_OTP_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.VALIDATE_PASSWORD_OTP_RESET:
            return {
                request_status: authConstants.VALIDATE_PASSWORD_OTP_RESET,
                is_request_processing: false,
                request_data: {},
            };
        

        default:
            return {...state} 
    }
}

export const signUpReducer = (state=initialState, action:any)=>{
    // export const forgotPasswordReducer = ({state=initialState, action}:ReducerParams)=>{
    switch (action.type) {
        case authConstants.SIGNUP_PENDING:
            return {
                request_status: authConstants.SIGNUP_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case authConstants.SIGNUP_SUCCESS:
            return {
                request_status: authConstants.SIGNUP_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.SIGNUP_FAILURE:
            return {
                request_status: authConstants.SIGNUP_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.SIGNUP_RESET:
            return {
                request_status: authConstants.SIGNUP_RESET,
                is_request_processing: false,
                request_data: {},
            };
        

        default:
            return {...state} 
    }
}