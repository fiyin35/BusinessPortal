import {InAppTemplate} from "../../../shared/templates/inapp";
import { Link } from "react-router-dom";
import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"


import {WindowResolutions} from "../../../types"

const AllMenus = (props:WindowResolutions)=>{
    return(
        <div className="all-menus-wrap">
            <div className="each-menu">
                <div className="menu-title">Fund Validation Wallet</div>
                <div className="item-desc">Fund your business validation wallet. </div>
                <div className="menu-btn-wrap">
                    <Link to="/app/identity/fund" className="menu-btn btn">Fund Validation Wallet</Link>
                </div>
            </div>
            <div className="each-menu">
                <div className="menu-title">Validation Requests</div>
                <div className="item-desc">See a summary of identity validations requests report.</div>
                <div className="menu-btn-wrap">
                    <Link to="/app/identity/requests" className="menu-btn btn">Validation Request</Link>
                </div>
            </div>
            <div className="each-menu">
                <div className="menu-title">Validation Summary</div>
                <div className="item-desc">See a report of identity validation.</div>
                <div className="menu-btn-wrap">
                    <Link to="/app/identity/summary" className="menu-btn btn">Validation Summary</Link>
                </div>
            </div>
        </div>
    )
}

export const ModuleEntry = () =>{
    const screenResolution : WindowResolutions = useWindowSize();
    

    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="Identity Validation" childComponent={<AllMenus {...screenResolution} /> } />
    )
}