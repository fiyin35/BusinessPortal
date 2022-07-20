
import {myBizUsers} from "../../../action-constants/in-app/my-biz-users"
// import {ReducerParams} from "../../../../types"



export const geMyBizUsersReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case myBizUsers.GET_ALL_MYUSERS_PENDING:
            return {
                request_status: myBizUsers.GET_ALL_MYUSERS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case myBizUsers.GET_ALL_MYUSERS_SUCCESS:
            return {
                request_status: myBizUsers.GET_ALL_MYUSERS_SUCCESS,
                loggedIn: true,
                is_request_processing: false,
                request_data: action
            };
        case myBizUsers.GET_ALL_MYUSERS_FAILURE:
            return {
                request_status: myBizUsers.GET_ALL_MYUSERS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case myBizUsers.GET_ALL_MYUSERS_RESET:
            return {
                request_status: myBizUsers.GET_ALL_MYUSERS_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}

export const createMyBizUsersReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case myBizUsers.CREATE_NEW_USERS_PENDING:
            return {
                request_status: myBizUsers.CREATE_NEW_USERS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case myBizUsers.CREATE_NEW_USERS_SUCCESS:
            return {
                request_status: myBizUsers.CREATE_NEW_USERS_SUCCESS,
                loggedIn: true,
                is_request_processing: false,
                request_data: action
            };
        case myBizUsers.CREATE_NEW_USERS_FAILURE:
            return {
                request_status: myBizUsers.CREATE_NEW_USERS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case myBizUsers.CREATE_NEW_USERS_RESET:
            return {
                request_status: myBizUsers.CREATE_NEW_USERS_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}

