import { useState, useRef } from 'react';
import MobileMenu from "../../../assets/images/icons/mobile-menu.png"
import AppIcon from "../../../assets/images/icons/app-icon.png"
import NotifyWhite from "../../../assets/images/icons/notify-white.png"
import { Overlay, Popover, Button } from 'react-bootstrap'
import { RowActionsProps } from "../../../types";

import { useDispatch } from 'react-redux'
import { authActions } from "../../../redux/actions/onboarding/outboud/access.actions"
// import  Search from "../../../assets/images/icons/search.png"
import SearchWhite from "../../../assets/images/icons/search-white.png"
import Avatar from "../../../assets/images/icons/avatar.png"
import CaretDown from "../../../assets/images/icons/caret-down.png"
import Notify from "../../../assets/images/icons/notify.png"
import "./index.scss";

import { HeaderProps } from "../../../types"

export const AppHeader = (props: HeaderProps) => {
    let loggedAccountInfo = localStorage.getItem("lingoBizAuth") || "{}",
        parsedData =JSON.parse(loggedAccountInfo);
    
    const HeaderDrop: React.FC<RowActionsProps> = (props) => {
        const [show, setShow] = useState(false);
        const [target, setTarget] = useState(null);
        const ref = useRef(null);
        const dispatch = useDispatch();

        const handleClick = (event: any) => {
            setShow(!show);
            setTarget(event.target);
        };
        const { className } = props

        return (
            <div className={`row-actions-wrap heading-pop ${className}`}>

                <div ref={ref}>
                    {/* <Button className="action-gray row-action-trigger" onClick={handleClick}> */}
                    <div className="profile" onClick={handleClick}>
                        <img src={Avatar} alt="" />
                        <div className="user-name">
                            {parsedData?.firstName} {parsedData?.lastName}
                            <img src={CaretDown} alt="" />
                        </div>
                    </div>
                    {/* </Button> */}

                    <Overlay
                        show={show}
                        target={target}
                        placement="bottom-start"
                        container={ref}
                        containerPadding={20}
                    // rootClose={true}
                    >
                        <Popover id="popover-contained">
                            <Popover.Body>
                                <div className="each-menu">Profile</div>
                                <div className="each-menu">Setting</div>
                                <div className="each-menu"
                                    onClick={() => dispatch(authActions.Logout())}
                                >Logout
                                </div>
                            </Popover.Body>
                        </Popover>
                    </Overlay>
                </div>

            </div>

        )
    }


    const MobileHeader = (props: HeaderProps) => {
        return (
            <div className="mobile-head-wrap">
                <div className="mobile-header">
                    <div className="each-item" onClick={props.callback}>
                        <img src={MobileMenu} alt="" />
                    </div>
                    <div className="each-item">
                        <img src={AppIcon} alt="" />
                    </div>
                    <div className="each-item">
                        <div>
                            <img src={NotifyWhite} alt="" />
                        </div>
                        <div>
                            <img src={SearchWhite} alt="" />
                        </div>
                    </div>
                </div>
                {/* <div className="mobile-page-titile">
                {props.pageHeadingTitle}
            </div> */}
                <div className={props.breadcrumbs ? "mobile-page-titile with-breadcrumbs" : "mobile-page-titile"}>
                    {props.pageHeadingTitle} {props.breadcrumbs && <span>  {`>`} {props.breadcrumbs} </span>}
                </div>
            </div>
        )
    }

    const RegularHeader = (props: HeaderProps) => {
        return (
            <div className="regular-header">
                <div className="allheader-items">
                    <div className={props.breadcrumbs ? "page-title-head with-breadcrumbs" : "page-title-head"}>
                        {props.pageHeadingTitle}
                        {props.breadcrumbs &&
                            <span className={props.activeBreadcrumbs ? "active-breadcrumbs" : ""}>  {`>`} {props.breadcrumbs} </span>
                        }
                    </div>
                    {props.hasSearchBar &&
                        <div className="page-searchbar">
                            <input type="text" className="form-control" placeholder="Search business, transactions, users, terminals " />
                        </div>
                    }
                    <div className="page-header-actions">
                        <div className="notification">
                            <img src={Notify} alt="" />
                        </div>
                        <HeaderDrop />
                        {/* <div className="profile">
                        <img src={Avatar} alt="" />
                        <div className="user-name">
                            Eniola Adegbuyi
                            <img src={CaretDown} alt="" />
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
        )
    }



    return (
        <div className="app-header">
            {props.screenResolution.width <= 1024 && <MobileHeader {...props} />}
            {props.screenResolution.width >= 1025 && <RegularHeader {...props} />}

            {/* <RegularHeader {...props}/> */}
        </div>
    )
}