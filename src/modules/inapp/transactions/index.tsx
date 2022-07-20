import {InAppTemplate} from "../../../shared/templates/inapp";
import { Link } from "react-router-dom";
import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"


import {WindowResolutions} from "../../../types"

const AllMenus = (props:WindowResolutions)=>{
    return(
        <div className="all-menus-wrap">
            <div className="each-menu">
                <div className="menu-title">Virtual account Transacations</div>
                <div className="item-desc">See a report of virtual account transactions. </div>
                <div className="menu-btn-wrap">
                    <Link to="/app/transactions/virtual" className="menu-btn btn">Go to transacions</Link>
                </div>
            </div>
            {/* <div className="each-menu">
                <div className="menu-title">Terminals Transacations</div>
                <div className="item-desc">See a report of terminal transactions.</div>
                <div className="menu-btn-wrap">
                    <Link to="/app/transactions/terminal" className="menu-btn btn">Go to transacions</Link>
                </div>
            </div>
            <div className="each-menu">
                <div className="menu-title">Borderless Transactions</div>
                <div className="item-desc">See a report of borderless transactions.</div>
                <div className="menu-btn-wrap">
                    <Link to="/app/transactions/borderless" className="menu-btn btn">Go to transacions</Link>
                </div>
            </div> */}
        </div>
    )
}

export const TransactionsEntry = () =>{
    const screenResolution : WindowResolutions = useWindowSize();
    

    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="Transactions" childComponent={<AllMenus {...screenResolution} /> } />
    )
}