
import {myBizConstants} from "../../../action-constants/in-app/my-business/index"
// import {ReducerParams} from "../../../../types"



export const getAllBizReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case myBizConstants.GET_ALL_BIZ_PENDING:
            return {
                request_status: myBizConstants.GET_ALL_BIZ_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case myBizConstants.GET_ALL_BIZ_SUCCESS:
            return {
                request_status: myBizConstants.GET_ALL_BIZ_SUCCESS,
                loggedIn: true,
                is_request_processing: false,
                request_data: action
            };
        case myBizConstants.GET_ALL_BIZ_FAILURE:
            return {
                request_status: myBizConstants.GET_ALL_BIZ_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case myBizConstants.GET_ALL_BIZ_RESET:
            return {
                request_status: myBizConstants.GET_ALL_BIZ_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}

export const addNewBizReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case myBizConstants.ADD_NEW_BIZ_PENDING:
            return {
                request_status: myBizConstants.ADD_NEW_BIZ_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case myBizConstants.ADD_NEW_BIZ_SUCCESS:
            return {
                request_status: myBizConstants.ADD_NEW_BIZ_SUCCESS,
                loggedIn: true,
                is_request_processing: false,
                request_data: action
            };
        case myBizConstants.ADD_NEW_BIZ_FAILURE:
            return {
                request_status: myBizConstants.ADD_NEW_BIZ_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case myBizConstants.ADD_NEW_BIZ_RESET:
            return {
                request_status: myBizConstants.ADD_NEW_BIZ_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}

