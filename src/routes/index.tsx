// import * as React from 'react';
import {  FunctionComponent, PropsWithChildren } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { connect } from 'react-redux';


import {PrivateRoutes} from "../types"
import {LandingPage} from "../modules/landing"
import SignUpPage from "../modules/onboarding/sign-up"
import SignInPage from "../modules/onboarding/sign-in"
import ForgotPasswordPage from "../modules/onboarding/forgot-password"
import ValidatePasswordOtpPage from "../modules/onboarding/validate-password-otp"
import {SetPasswordPage} from "../modules/onboarding/set-password"

import DashboardPage from "../modules/inapp"
import {ModuleEntry} from "../modules/inapp/identity"
import {FundIdentityVerify} from "../modules/inapp/identity/fund-wallet"
import {ValidationRequestsWrap} from "../modules/inapp/identity/validation-requests"
import {ValidationSummaryWrap} from "../modules/inapp/identity/validation-summary"

import {TransactionsEntry} from "../modules/inapp/transactions"
import VirtualTxtnWrap from "../modules/inapp/transactions/virtual-txtn"
import {TerminalTxtnWrap} from "../modules/inapp/transactions/terminals-txtn"
import {BorderlessTxtnWrap} from "../modules/inapp/transactions/borderless"
import {BorderlessTxtnDestinationWrap} from "../modules/inapp/transactions/borderless-destination"

import AllUsersWrap from "../modules/inapp/my-business-users"
import {AddNewUser} from "../modules/inapp/my-business-users/new-user"
import {RolesManagement} from "../modules/inapp/my-business-users/roles"

import MyBusinessWrap from "../modules/inapp/my-business"
import AddNewBusiness from "../modules/inapp/my-business/new-business"
import {BusinessDetailsWrap} from "../modules/inapp/my-business/business-details"
import {EditBusiness} from "../modules/inapp/my-business/edit-business"

import VirtualAccountWrap from "../modules/inapp/virtual-accounts"  
import AddNewVirtualAccount from "../modules/inapp/virtual-accounts/new-virtual-account"  
import {VirtualAccountDetailsWrap} from "../modules/inapp/virtual-accounts/account-details" 

import {TerminalEntry} from "../modules/inapp/terminals"
import {TerminalProviderWrap} from "../modules/inapp/terminals/terminal-provider"  
import {AddNewTerminalProvider} from "../modules/inapp/terminals/new-terminal-provider"
import {TerminalWrap} from "../modules/inapp/terminals/terminal"
import {AddNewTerminal} from "../modules/inapp/terminals/new-terminal"
import {AllocateNewTerminal} from "../modules/inapp/terminals/new-allocated-terminal"  
import {AllocatedTerminalWrap} from "../modules/inapp/terminals/allocated-terminal"
// import { Fragment } from "react";












const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/account/sign-in',
  children,
}:PrivateRoutes) => {

  
  if (isAllowed===false) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

type OwnProps =  ReturnType<typeof mapStateToProps>;
 /** List of App Routes */
const AppRoutes = (pageProps: PropsWithChildren<OwnProps>)=>{
  // export const AppRoutes = ()=>{
    
    return (
       
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/account/sign-in" element={<SignInPage  />} />
          <Route path="/account/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/account/forgot-password/otp" element={<ValidatePasswordOtpPage />} />
          <Route path="/account/set-password" element={<SetPasswordPage />} />
          <Route path="/account/sign-up" element={<SignUpPage />} />
          
          
          {/* <Route path="/app/" element={<DashboardPage/>} /> */}
          <Route path="/app/" element={
            <ProtectedRoute
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/app/my-business" element={
            <ProtectedRoute
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <MyBusinessWrap />
            </ProtectedRoute>
          } />
          <Route path="/app/my-business/add-new" element={
            <ProtectedRoute
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <AddNewBusiness  />
            </ProtectedRoute>
          } />
          <Route path="/app/my-business/:id/edit" element={
            <ProtectedRoute
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <EditBusiness />
            </ProtectedRoute>
          } />
          <Route path="/app/my-business/:id" element={
            <ProtectedRoute
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <BusinessDetailsWrap />
            </ProtectedRoute>
          } />

          <Route path="/app/identity" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <ModuleEntry />
            </ProtectedRoute>
          } />
          <Route path="/app/identity/fund" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <FundIdentityVerify />
            </ProtectedRoute>
          } />
          <Route path="/app/identity/requests" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <ValidationRequestsWrap />
            </ProtectedRoute>
          } />
          <Route path="/app/identity/summary" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <ValidationSummaryWrap />
            </ProtectedRoute>
          } />
          <Route path="/app/manage-users" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <AllUsersWrap />
            </ProtectedRoute>
          } />
          <Route path="/app/manage-users/add-new" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <AddNewUser />
            </ProtectedRoute>
          } />
          
          
          <Route path="/app/manage-users/roles" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <RolesManagement />
            </ProtectedRoute>
          } />
          <Route path="/app/transactions" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <TransactionsEntry />
            </ProtectedRoute>
          } />
          <Route path="/app/transactions/virtual" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <VirtualTxtnWrap />
            </ProtectedRoute>
          } />
          <Route path="/app/transactions/terminal" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <TerminalTxtnWrap />
            </ProtectedRoute>
          } />
          <Route path="/app/transactions/borderless" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <BorderlessTxtnWrap />
            </ProtectedRoute>
          } />
           <Route path="/app/transactions/borderless-destination" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <BorderlessTxtnDestinationWrap />
            </ProtectedRoute>
          } />

          <Route path="/app/virtual-accounts" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <VirtualAccountWrap />
            </ProtectedRoute>
          } />
          <Route path="/app/virtual-accounts/new-virtual-account" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <AddNewVirtualAccount />
            </ProtectedRoute>
          } />
           <Route path="/app/virtual-accounts/account-details" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <VirtualAccountDetailsWrap />
            </ProtectedRoute>
          } />
          <Route path="/app/terminals" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <TerminalEntry />
            </ProtectedRoute>
          } />
          <Route path="/app/terminals/terminal-provider" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <TerminalProviderWrap />
            </ProtectedRoute>
          } />
           <Route path="/app/terminals/new-terminal-provider" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <AddNewTerminalProvider />
            </ProtectedRoute>
          } />

          <Route path="/app/terminals/terminal" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <TerminalWrap />
            </ProtectedRoute>
          } />

          <Route path="/app/terminals/new-terminal" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <AddNewTerminal />
            </ProtectedRoute>
          } />
          <Route path="/app/terminals/allocate-new-terminal" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <AllocateNewTerminal />
            </ProtectedRoute>
          } />
          <Route path="/app/terminals/allocated-terminal" element={
            <ProtectedRoute
              
              isAllowed={
               pageProps.loginRequest.loggedIn
              }
            >
              <AllocatedTerminalWrap />
            </ProtectedRoute>
          } />
          
          
          
          

          
          {/* <Route path="/app/transactions/requests" element={<ValidationRequestsWrap/>} />
          <Route path="/app/transactions/summary" element={<ValidationSummaryWrap/>} /> */}
          

        </Routes>
    )
}



const mapStateToProps = (state: any) => ({
    loginRequest: state.onboardingOutboundReducers.loginReducer,
    forgotPwRequest: state.onboardingOutboundReducers.forgotPasswordReducer,
})



export default connect(mapStateToProps)(AppRoutes);
