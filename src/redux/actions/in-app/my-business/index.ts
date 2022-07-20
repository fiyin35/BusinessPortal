import { ApiService } from "../../../../services/apiService";
import { routes } from "../../../../services/paths";
import { myBizConstants } from "../../../action-constants/in-app/my-business";
import { myBizUsers } from "../../../action-constants/in-app/my-biz-users";
import { Dispatch } from 'redux';
import { history } from "../../../../shared/_helpers/history";
import {
    handleRequestErrors,
} from "../../../../shared/utils";

const GetMyBusinesses =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        let userData;

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: `${routes.MY_BUSINESSES}${actionPayload}`, http_method: "GET" });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    dispatch(success(response.data));
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
        return { type: myBizConstants.GET_ALL_BIZ_PENDING, params };
    }
    function success(response: any) {
        return { type: myBizConstants.GET_ALL_BIZ_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: myBizConstants.GET_ALL_BIZ_FAILURE, error };
    }
    function clear() {
        return { type: myBizConstants.GET_ALL_BIZ_RESET, clear_data: "" };
    }
}

const GetMyBusinessesUsers =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {


        return (dispatch: Dispatch) => {
            console.log("actionPayload", actionPayload)
            let apiConsume = ApiService.request({ url: `${routes.MY_BUSINESS_USERS}${actionPayload}`, http_method: "GET" });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    dispatch(success(response.data));
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
        return { type: myBizUsers.GET_ALL_MYUSERS_PENDING, params };
    }
    function success(response: any) {
        return { type: myBizUsers.GET_ALL_MYUSERS_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: myBizUsers.GET_ALL_MYUSERS_FAILURE, error };
    }
    function clear() {
        return { type: myBizUsers.GET_ALL_MYUSERS_RESET, clear_data: "" };
    }
}


export const myBizActions = {
    GetMyBusinesses,
    GetMyBusinessesUsers
};