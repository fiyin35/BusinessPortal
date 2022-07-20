// import { dispatch } from "rxjs/internal/observable/pairs";
import { Dispatch } from 'redux';
import { authActions } from "../redux/actions/onboarding/outboud/access.actions";
import { ApiRequestType} from "../types"
// import { routes } from "./paths";
const axios = require('axios');


let cancelToken:any
// let loggedAccountTenant = localStorage.getItem("lingoBizAuthTenant") || "{}"


const instance = axios.create({
    
    validateStatus: function (status:number)
    {
        
        return (status >= 200 && status <210);
    }
});





const setTokenAuthorization = (url:string)=>{
    let loggedAccountInfo = localStorage.getItem("lingoBizAuth") || "{}"
    let urlsWithoutAuthentication = [
            "/login",
            "/signup"        
        ];
        // binaryUploadUrls =[
        //     "/api/Upload"
        // ];
    if(loggedAccountInfo === null){
    // if(instance.defaults.headers.common?.Authorization){
        delete instance.defaults.headers.common.Authorization;
    // }
    }
    
        instance.defaults.headers.common['Content-Type'] = 'application/json';
    
    
    
   if(loggedAccountInfo !==null){
       
       let user = JSON.parse(loggedAccountInfo),
            serviceToTest = url.split("Fintech.CBS.Backend")[1];
          
        
       if (urlsWithoutAuthentication.indexOf(serviceToTest) === -1 || serviceToTest==="changepassword") {
        
           instance.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
        
       }
       

    //    console.log("Authorization", user)
        
        
        instance.defaults.headers.common['Accept'] = 'application/json';
   }

   
//    console.log("user.accessToken", loggedAccountInfo)
//    console.log("setTokenAuthorization", url)
}

const  request = ({url, http_method, data, headers = undefined, noStringify=false, responseType}:ApiRequestType)=>{
    let bodyData;
    let service:any, lastRefreshTime:any, currenTimestamp: any , getToken = "";
    bodyData = noStringify ? JSON.stringify(data) : data;
    
    // let dispatch:Dispatch;
    

    let 
    skipTokenRefreshForUrls =[
        "/login",
        "/signup"
    ],

    
    
    refreshTokenUrl ="/refreshtoken",
    serviceToTest = url.split("Fintech.Onboarding/api/BusinessProfile")[1];
    

    let loggedAccountInfo = localStorage.getItem("lingoBizAuth") || "{}"

    let lingoBizAuth = JSON.parse(loggedAccountInfo);

    // console.log("url", url, http_method)

    if (http_method.toLowerCase() === 'get') {
        
        
        if(headers === undefined){
            setTokenAuthorization(url);
        }
       
        else if(headers !== undefined){
            for (let [key, value] of Object.entries(headers)) {
                instance.defaults.headers.common[key] = value;
            }
        }
        let serviceResponse:any ="",
            serviceResponse2:any ="";
        
            if(url.indexOf(refreshTokenUrl)>-1){
            
               
                if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel("Operation canceled due to new request.");
                }
                cancelToken = axios.CancelToken.source();
            }
        if(lingoBizAuth?.accessToken && skipTokenRefreshForUrls.indexOf(serviceToTest) === -1){
            lastRefreshTime = lingoBizAuth.lastLogForAuth;
            currenTimestamp = Date.now();


            // If Last Token refresh is more than 3 mins, Pause GET reqeust, refresh token, and resume the GET request
            // if(((currenTimestamp -lastRefreshTime)/60000)>=3){ 
            //     let tempRequest = {
            //         url,
            //         bodyData,
            //         tempHeaders: instance.defaults.headers.common
            //     };

            //     let refreshpayload ={
            //         username:lingoBizAuth.userName,
            //         refreshToken:lingoBizAuth.refreshToken
            //     }
            //     setTokenAuthorization(getToken);
            //     let tokenService = instance.post(getToken, refreshpayload);
                    
            //     return tokenService.then(function (response:any) {
                    
            //         if(response.status>=200 && response.status<210){
            //             if(response.data.token!==undefined){
                            
            //                 let userData = JSON.parse(loggedAccountInfo);
            //                     userData.lastLogForAuth = Date.now();
            //                     userData.accessToken = response.data.token;
            //                     localStorage.setItem('lingoBizAuth', JSON.stringify(userData));

            //                 delete instance.defaults.headers.common;
            //                 instance.defaults.headers.common ={
            //                     ...tempRequest.tempHeaders
            //                 }
            //                 // responseType
            //                 instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            //                 if(responseType ===undefined){
                                
            //                     if( url.indexOf(refreshTokenUrl)>-1){
                                
            //                         service = instance.get(tempRequest.url,  { cancelToken: cancelToken.token });
            //                     }else{
            //                         service = instance.get(tempRequest.url, tempRequest.bodyData);
            //                     }
            //                 }
            //                 if(responseType ==="blob"){
            //                     service = instance.request({url:tempRequest.url, method: 'GET', data:tempRequest.bodyData, responseType: 'blob'})
            //                 }

                            
            //                 return service.then((response3:any)=>{

            //                     if(response3.status>=200 && response3.status < 210){
                                    
            //                         // return service;
            //                         if(response3.headers['content-type'].indexOf('application/json')>-1 || response3.headers['content-type'].indexOf('application/octet-stream')>-1){
                                        
            //                             return service;
                                        
            //                         }else{
                                        
            //                             serviceResponse = Promise.reject(response3);
            //                             return serviceResponse;
            //                         }

                                    
            //                     }
            //                 })
            //                 .catch(()=>{
                               
            //                     if(serviceResponse!==""){
            //                         return serviceResponse
            //                     }else{
                                    
            //                         serviceResponse2 = service;
            //                         return service;
            //                     }
                                
            //                 })
            //             }
            //         }else{
                        
                        
            //             // dispatch(authActions.Logout())
            //             authActions.Logout()
            //         }

                   
            //     }).catch(function (error:any) {
                    
                 
            //         let responseData= error.response || error;
            //         if(responseData.config.url.indexOf("Login/refreshtoken")>-1){
            //             // dispatch(authActions.Logout())
            //         }else{
            //             if(serviceResponse!==""){
            //                 return serviceResponse
            //             }else if(serviceResponse2!==""){
            //                 return serviceResponse2
            //             }
            //             else{
            //                 return tokenService;
            //             }
            //         }
                    
                    
                    
            //     });
            // }else{
                // if(responseType ===undefined){
                    // if( url.indexOf(refreshTokenUrl)>-1){
                   
                    //     service = instance.get(url, { cancelToken: cancelToken.token });
                    // }else{
                        service = instance.get(url, bodyData);
                    // }
                // }
                // if(responseType ==="blob"){
                //     service = instance.request({url:url, method: 'GET', data:bodyData, responseType: 'blob'})
                // }
                // service = instance.get(url, bodyData);
               
            // }
        }else{
            if(responseType ===undefined){
                service = instance.get(url, bodyData);
            }
            if(responseType ==="blob"){
                service = instance.request({url:url, method: 'GET', data:bodyData, responseType: 'blob'})
            }
            
            // service = instance.get(url, bodyData);
        }

        

        return service.then(function (response:any) {
          

            if(response.headers['content-type'].indexOf('application/json')>-1 || response.headers['content-type'].indexOf('application/octet-stream')>-1){
                // return response;
                return service;
            }else{
                // serviceResponse = "An error occured";
                serviceResponse = Promise.reject(response);
                return serviceResponse;
            }

            
            

            
            

           
        }).catch(function (error:any) {
            
            if (error.response) {

                if (error.response.status === 401) {
                    let currentRoute = window.location.pathname,
                        type = "unauthorized";
                        
                        // dispatch(authActions.Logout(type,currentRoute));
                        authActions.Logout()
                  
                   
                    
                }else if(error.response.status === 403){
                    // dispatch(authActions.ForbiddenAccess())
                    authActions.ForbiddenAccess()
                }else {
                    // return service;
                    if(serviceResponse!==""){
                       
                        return serviceResponse
                    }else{
                        
                     return service;
                    }
                }
                  
            }
            
            if(serviceResponse!==""){
               
                return serviceResponse
            
            }else{
              
             return service;
            }
            
        });

    }  

    
    
    if (http_method.toLowerCase() === 'post'){
        //check for header
        // if (binaryUploadUrls.indexOf(serviceToTest) === -1) {
           
        //     instance.defaults.headers.common['Content-Type'] = 'application/json';
        // }
        // if (binaryUploadUrls.indexOf(serviceToTest) > -1) {
            
        //     instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        // }

        // console.log("inPOST", url)
        
        if(headers === undefined){
            setTokenAuthorization(url);
        }
        else if(headers !== undefined){
            for (let [key, value] of Object.entries(headers)) {
                instance.defaults.headers.common[key] = value;
            }
        }
        
        if(lingoBizAuth?.accessToken && skipTokenRefreshForUrls.indexOf(serviceToTest) === -1){
            lastRefreshTime = lingoBizAuth.lastLogForAuth;
            currenTimestamp= Date.now();
            // console.log("skipTokenRefreshForUrls", url)
            // If Last Token refresh is more than 3 mins, Pause GET reqeust, refresh token, and resume the GET request
            // if(((currenTimestamp -lastRefreshTime)/60000)>=3){ 
            //     let tempRequest = {
            //         url,
            //         bodyData,
            //         tempHeaders: instance.defaults.headers.common
            //     };

            //     let refreshpayload ={
            //         username:lingoBizAuth.userName,
            //         refreshToken:lingoBizAuth.refreshToken
            //     }
            //     setTokenAuthorization(getToken);
            //     let tokenService = instance.post(getToken, refreshpayload);

            //     return tokenService.then(function (response:any) {
                    
            //         if(response.status>=200 && response.status<210){
            //             if(response.data.token!==undefined){
                            
            //                 let userData = JSON.parse(loggedAccountInfo);
            //                     userData.lastLogForAuth = Date.now();
            //                     userData.accessToken = response.data.token;
            //                     localStorage.setItem('lingoBizAuth', JSON.stringify(userData));

            //                 delete instance.defaults.headers.common;
            //                 instance.defaults.headers.common ={
            //                     ...tempRequest.tempHeaders
            //                 }
            //                 instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            //                 service = instance.post(tempRequest.url, tempRequest.bodyData);

                            
            //                 return service.then((response3:any)=>{

            //                     if(response3.status>=200 && response3.status < 210){
                                    
            //                         return service;
            //                     }
            //                 })
            //                 .catch(()=>{
            //                     return service;
            //                 })
            //             }
            //         }else{
            //             // return service;
            //             authActions.Logout()
            //             // dispatch(authActions.Logout())
            //         }

                    
                    

                   
            //     }).catch(function (error:any) {
                    
                    
            //         let responseData= error.response;
            //         if(responseData.config.url.indexOf("Login/refreshtoken")>-1){
            //             authActions.Logout()
            //             // dispatch(authActions.Logout())
            //         }else{
            //              return service;
                        
            //         }
                    
            //     });
            // }else{
                // console.log("exec", url)
                service = instance.post(url, bodyData);
               
            // }
        }else{
            // console.log("options 2", url)
            service = instance.post(url, bodyData);
        }
        return service.then(function (response:any) {
           
            return service;
        }).catch(function (error:any) {
        
          if (error.response) {
            
             if (error.response.status === 401) {

                    // let currentRoute = window.location.pathname,
                    //     type = "unauthorized";

                        authActions.Logout()
                            // dispatch(authActions.Logout(type,currentRoute));
              


                }else if(error.response.status === 403){
                    authActions.ForbiddenAccess()
                    // dispatch(authActions.ForbiddenAccess())
                }else {
                    
                    return service;
                }
        }
        // console.log("options 4", url) 
       
            return  service;
        });
    }
}

export const ApiService ={
    setTokenAuthorization,
    request
}