import { ApiService } from "../../../../services/apiService";
import { routes } from "../../../../services/paths";
import { accountConstants } from "../../../action-constants/in-app/accounts";
import { myBizConstants } from "../../../action-constants/in-app/my-business";
import { Dispatch } from 'redux';

import { history } from "../../../../shared/_helpers/history";
import {
    handleRequestErrors,
} from "../../../../shared/utils";




const GetAllVirtualAccounts =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: `${routes.GET_VIRTUAL_ACCTS}${actionPayload}`, http_method: "GET", });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
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
        return { type: accountConstants.GET_ALL_VIRTUAL_PENDING, params };
    }
    function success(response: any) {
        return { type: accountConstants.GET_ALL_VIRTUAL_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: accountConstants.GET_ALL_VIRTUAL_FAILURE, error };
    }
    function clear() {
        return { type: accountConstants.GET_ALL_VIRTUAL_RESET, clear_data: "" };
    }
}

const CreateAVirtualAccount =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: `${routes.CREATE_VIRTUAL_ACCT}`, http_method: "POST", data: actionPayload });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
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
        return { type: accountConstants.CREATE_NEW_VIRTUAL_PENDING, params };
    }
    function success(response: any) {
        return { type: accountConstants.CREATE_NEW_VIRTUAL_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: accountConstants.CREATE_NEW_VIRTUAL_FAILURE, error };
    }
    function clear() {
        return { type: accountConstants.CREATE_NEW_VIRTUAL_RESET, clear_data: "" };
    }
}

const GetVirtualAccTransaction =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: `${routes.GET_VIRTUAL_ACCT_TRANSACTIONS}${actionPayload}`, http_method: "GET", });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
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
        return { type: accountConstants.GET_VIRTUAL_ACCOUNT_TXT_PENDING, params };
    }
    function success(response: any) {
        return { type: accountConstants.GET_VIRTUAL_ACCOUNT_TXT_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: accountConstants.GET_VIRTUAL_ACCOUNT_TXT_FAILURE, error };
    }
    function clear() {
        return { type: accountConstants.GET_VIRTUAL_ACCOUNT_TXT_RESET, clear_data: "" };
    }
}

const GetAccountBalance =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: `${routes.GET_ACC_BAL}${actionPayload}`, http_method: "GET", });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
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
        return { type: accountConstants.GET_ACC_BAL_PENDING, params };
    }
    function success(response: any) {
        return { type: accountConstants.GET_ACC_BAL_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: accountConstants.GET_ACC_BAL_FAILURE, error };
    }
    function clear() {
        return { type: accountConstants.GET_ACC_BAL_RESET, clear_data: "" };
    }
}

const GetTxtHistory =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            console.log(actionPayload)
            let apiConsume = ApiService.request({ url: `${routes.TXT_HISTORY}${actionPayload}`, http_method: "GET" });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
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
        return { type: accountConstants.GET_ACC_HIST_PENDING, params };
    }
    function success(response: any) {
        return { type: accountConstants.GET_ACC_HIST_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: accountConstants.GET_ACC_HIST_FAILURE, error };
    }
    function clear() {
        return { type: accountConstants.GET_ACC_HIST_RESET, clear_data: "" };
    }
}




export const accountActions = {
    GetAllVirtualAccounts,
    CreateAVirtualAccount,
    GetVirtualAccTransaction,
    GetAccountBalance,
    GetTxtHistory
};
