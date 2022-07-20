import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import { connect } from 'react-redux';

import { NavLink } from "react-router-dom"
import Logo from "../../../assets/images/logo.png"
import "./index.scss"
import { HeaderProps } from "../../../types"


let loggedAccountInfo = localStorage.getItem("lingoBizAuth") || "{}",
    parsedData = JSON.parse(loggedAccountInfo);

type OwnProps = HeaderProps & ReturnType<typeof mapStateToProps>;
export const SideBar = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    let loggedInData = props.loginRequest.request_data.response
    
    const BizName = () => {
        return (
            <div className="bizname-wrap">
                <div>{loggedInData.customerName}</div>
                <div> {loggedInData?.cif}</div>
            </div>
        )
    }



    const MenuItems = () => {
        return (
            <div className="all-menu-items">
                <div className="main-menu">
                    <div className="menu-item">
                        <NavLink end className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app">
                            <div className="menu-icon db">
                                {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" fill="#F2F4F7" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" fill="#F2F4F7" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg> */}
                            </div>
                            <div className="menu-txt">Dashboard</div>
                        </NavLink>
                    </div>
                </div>
                <div className="other-menus">
                    <div className="menu-title">Your Business</div>
                    <div className="menu-item">
                        <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/my-business">
                            <div className="menu-icon biz">
                                {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" fill="#F2F4F7" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" fill="#F2F4F7" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg> */}
                            </div>
                            <div className="menu-txt">Business</div>
                        </NavLink>
                    </div>
                    <div className="menu-item">
                        <NavLink  className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/manage-users">
                            <div className="menu-icon user">
                                {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" fill="#F2F4F7" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" fill="#F2F4F7" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg> */}
                            </div>
                            <div className="menu-txt">User Management</div>
                        </NavLink>
                    </div>
                    <div className="menu-item">
                        <NavLink  className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/virtual-accounts">
                            <div className="menu-icon virtual">
                                {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" fill="#F2F4F7" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" fill="#F2F4F7" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg> */}
                            </div>
                            <div className="menu-txt">Virtual Accounts</div>
                        </NavLink>
                    </div>
                    {/* <div className="menu-item">
                    <NavLink end className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/terminals">
                        <div className="menu-icon terminal">
                            
                        </div>
                        <div className="menu-txt">Terminals</div>
                    </NavLink>
                </div> */}
                    <div className="menu-item">
                        <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/identity">
                            <div className="menu-icon identity">
                                {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" fill="#F2F4F7" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" fill="#F2F4F7" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg> */}
                            </div>
                            <div className="menu-txt">Identity Validation</div>
                        </NavLink>
                    </div>
                    {/* <div className="menu-item">
                    <NavLink end className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/cross-border">
                        <div className="menu-icon cross">
                           
                        </div>
                        <div className="menu-txt">Cross Border</div>
                    </NavLink>
                </div> */}
                    <div className="menu-item">
                        <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/transactions">
                            <div className="menu-icon txtn">
                                {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" fill="#F2F4F7" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" fill="#F2F4F7" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg> */}
                            </div>
                            <div className="menu-txt">Transactions</div>
                        </NavLink>
                    </div>
                </div>
                <div className="main-menu">
                    <div className="menu-item">
                        <NavLink  className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/settings">
                            <div className="menu-icon settings">
                                {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" fill="#F2F4F7" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" fill="#F2F4F7" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" fill="#F2F4F7" /><path d="M7.33333 1.5H1.5V7.33333H7.33333V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 1.5H10.6667V7.33333H16.5V1.5Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.5 10.6667H10.6667V16.5H16.5V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.33333 10.6667H1.5V16.5H7.33333V10.6667Z" stroke="#F2F4F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg> */}
                            </div>
                            <div className="menu-txt">Settings</div>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div className="sidebar-wrap">
                <div className="sidebar-logo">
                    <img src={Logo} alt="" />
                </div>
                <BizName />
                <MenuItems />
                <div className="powered">
                    Built by <span>Banklingo</span>
                </div>


            </div>
            {
                props.screenResolution.width <= 1024 &&
                <div className="mobile-menu-overlay" onClick={props.callback}>

                </div>
            }
        </div>
    )
}
const mapDispatchToProps = {
};

const mapStateToProps = (state: any) => {
    return {
        loginRequest: state.onboardingOutboundReducers.loginReducer,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);