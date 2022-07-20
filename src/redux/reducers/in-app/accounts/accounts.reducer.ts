

import { accountConstants } from "../../../action-constants/in-app/accounts";
// import {ReducerParams} from "../../../../types"



export const getAllBizUAccountsReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case accountConstants.GET_ALL_VIRTUAL_PENDING:
            return {
                ...state,
                request_status: accountConstants.GET_ALL_VIRTUAL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountConstants.GET_ALL_VIRTUAL_SUCCESS:
            return {
                ...state,
                request_status: accountConstants.GET_ALL_VIRTUAL_SUCCESS,
                
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.GET_ALL_VIRTUAL_FAILURE:
            return {
                ...state,
                request_status: accountConstants.GET_ALL_VIRTUAL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.GET_ALL_VIRTUAL_RESET:
            return {
                ...state,
                request_status: accountConstants.GET_ALL_VIRTUAL_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}

export const createAVirtualAccountReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case accountConstants.CREATE_NEW_VIRTUAL_PENDING:
            return {
                ...state,
                request_status: accountConstants.CREATE_NEW_VIRTUAL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountConstants.CREATE_NEW_VIRTUAL_SUCCESS:
            return {
                ...state,
                request_status: accountConstants.CREATE_NEW_VIRTUAL_SUCCESS,
                
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.CREATE_NEW_VIRTUAL_FAILURE:
            return {
                ...state,
                request_status: accountConstants.CREATE_NEW_VIRTUAL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.CREATE_NEW_VIRTUAL_RESET:
            return {
                ...state,
                request_status: accountConstants.CREATE_NEW_VIRTUAL_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}

export const getVirtualAccTxtnsReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case accountConstants.GET_VIRTUAL_ACCOUNT_TXT_PENDING:
            return {
                ...state,
                request_status: accountConstants.GET_VIRTUAL_ACCOUNT_TXT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountConstants.GET_VIRTUAL_ACCOUNT_TXT_SUCCESS:
            return {
                ...state,
                request_status: accountConstants.GET_VIRTUAL_ACCOUNT_TXT_SUCCESS,
                
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.GET_VIRTUAL_ACCOUNT_TXT_FAILURE:
            return {
                ...state,
                request_status: accountConstants.GET_VIRTUAL_ACCOUNT_TXT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.GET_VIRTUAL_ACCOUNT_TXT_RESET:
            return {
                ...state,
                request_status: accountConstants.GET_VIRTUAL_ACCOUNT_TXT_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}

export const getAccBalReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case accountConstants.GET_ACC_BAL_PENDING:
            return {
                ...state,
                request_status: accountConstants.GET_ACC_BAL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountConstants.GET_ACC_BAL_SUCCESS:
            return {
                ...state,
                request_status: accountConstants.GET_ACC_BAL_SUCCESS,
                
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.GET_ACC_BAL_FAILURE:
            return {
                ...state,
                request_status: accountConstants.GET_ACC_BAL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.GET_ACC_BAL_RESET:
            return {
                ...state,
                request_status: accountConstants.GET_ACC_BAL_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}

export const getAccHistReducer = (state=[], action:any)=>{
   
    switch (action.type) {
        case accountConstants.GET_ACC_HIST_PENDING:
            return {
                ...state,
                request_status: accountConstants.GET_ACC_HIST_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountConstants.GET_ACC_HIST_SUCCESS:
            return {
                ...state,
                request_status: accountConstants.GET_ACC_HIST_SUCCESS,
                
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.GET_ACC_HIST_FAILURE:
            return {
                ...state,
                request_status: accountConstants.GET_ACC_HIST_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case accountConstants.GET_ACC_HIST_RESET:
            return {
                ...state,
                request_status: accountConstants.GET_ACC_HIST_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        

        default:
            return { ...state }
    }
}



