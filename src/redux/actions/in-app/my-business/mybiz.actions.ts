import { ApiService } from "../../../../services/apiService";
import { routes } from "../../../../services/paths";
import { myBizUsers } from "../../../action-constants/in-app/my-biz-users";
import { myBizConstants } from "../../../action-constants/in-app/my-business";
import { Dispatch } from 'redux';

import { history } from "../../../../shared/_helpers/history";
import {
    handleRequestErrors,
} from "../../../../shared/utils";




const AddNewBiz =(actionPayload: any) =>{
    
    if (actionPayload !== "CLEAR") {

        

        return (dispatch: Dispatch) => {
            
            let apiConsume = ApiService.request({ url: routes.NEW_BUSINESS, http_method: "POST", data: actionPayload });
            dispatch(request(apiConsume));
            return apiConsume
                .then((response: any) => {
                    if (response?.data) {
                        
                        dispatch(success(response.data));
                        history.replace("/app/my-business/s343")
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
        return { type: myBizConstants.ADD_NEW_BIZ_PENDING, params };
    }
    function success(response: any) {
        return { type: myBizConstants.ADD_NEW_BIZ_SUCCESS, response };
    }
    function failure(error: any) {
        return { type: myBizConstants.ADD_NEW_BIZ_FAILURE, error };
    }
    function clear() {
        return { type: myBizConstants.ADD_NEW_BIZ_RESET, clear_data: "" };
    }
}




export const bizActions = {
    AddNewBiz,
};
