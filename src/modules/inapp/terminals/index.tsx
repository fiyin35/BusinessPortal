import {InAppTemplate} from "../../../shared/templates/inapp";
import { Link } from "react-router-dom";
import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"


import {WindowResolutions} from "../../../types"

const Terminal = (props:WindowResolutions)=>{
    return(
        <div className="all-menus-wrap">
            <div className="each-menu">
                <div className="menu-title">Terminal Providers</div>
                <div className="item-desc">Add a new terminal provider. 
                See a list of terminal providers and perform certain actions</div>
                <div className="menu-btn-wrap">
                    <Link to="/app/terminals/terminal-provider" className="menu-btn btn">Terminal Providers</Link>
                </div>
            </div>
            <div className="each-menu">
                <div className="menu-title">Terminals</div>
                <div className="item-desc">Create or upload a new terminal. 
                See a list of terminals created and perform certain actions</div>
                <div className="menu-btn-wrap">
                    <Link to="/app/terminals/terminal" className="menu-btn btn">Terminal</Link>
                </div>
            </div>
            <div className="each-menu">
                <div className="menu-title">Terminal Allocation </div>
                <div className="item-desc">Allocate terminals to clients or agents. See and perform various</div>
                <div className="menu-btn-wrap">
                    <Link to="/app/terminals/allocated-terminal" className="menu-btn btn">Allocated Terminals</Link>
                </div> 
            </div>
        </div>
    )
}

export const TerminalEntry = () =>{
    const screenResolution : WindowResolutions = useWindowSize();

    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="Terminal Management" childComponent={<Terminal {...screenResolution} /> } />
    )
}