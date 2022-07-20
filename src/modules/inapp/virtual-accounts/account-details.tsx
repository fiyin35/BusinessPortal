import { useNavigate, Link } from "react-router-dom";
import { InAppTemplate } from "../../../shared/templates/inapp";

import { useWindowSize } from "../../../hooks/useWindowSize";
import "../index.scss"
import { Modal } from 'react-bootstrap'

import { WindowResolutions } from "../../../types"

import EditIcon from "../../../assets/images/icons/edit.png"
import DeleteIcon from "../../../assets/images/icons/delete.png"






const VirtualAccountSummary = () => {
    return (
        <div className=" card-wrap business-summary">
            <div className="card-heading">
                <div className="bolden-title">029389302 - NGN </div>
            </div>
            
            <div className="each-business-summary basic">
                <div className="summary-heading">Basic Details</div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Full Name</div>
                    <div className="biz-info-detail">Eniola Adegbuyi</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Email</div>
                    <div className="biz-info-detail">madegbuyi@gmail.com</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Phone number</div>
                    <div className="biz-info-detail">+234 906 6216 280</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Gender</div>
                    <div className="biz-info-detail">Male</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Biometric ID</div>
                    <div className="biz-info-detail">2228931910</div>
                </div>
            </div>
            <div className="each-business-summary others">
                <div className="summary-heading">Account Details</div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Account name</div>
                    <div className="biz-info-detail">Eniola Tech</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Partner</div>
                    <div className="biz-info-detail">23892910 Mayowa Business</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Address</div>
                    <div className="biz-info-detail">10, Alhaji muniru close, Bode thomas, Surulere, Lagos</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Notification URL</div>
                    <div className="biz-info-detail">vIWQOQxiCONW0</div>
                </div>
            </div>
        </div>
    )
}




const VirtualAccountInfo = () => {
    return (

        <div className="business-info-wrap">
            <VirtualAccountSummary />
            {/* <RecentTransaction /> */}
        </div>
    )
}


const VirtualAccountDetailsContent = (props: WindowResolutions) => {
    let history = useNavigate();
    return (
        <div className="form-content-wrap full-width">
            <div className="top-actions">
                <div className="back-navigate" onClick={() => history(-1)}> &lt; Back </div>
                <div className="other-actions">
                    <button className="btn action-btn">
                        Edit
                        <img src={EditIcon} alt="" />
                    </button>
                    <button className="btn action-btn delete">
                        Delete
                        <img src={DeleteIcon} alt="" /> 
                    </button>
                </div>
            </div>

            <VirtualAccountInfo />
        </div>
    )
}

export const VirtualAccountDetailsWrap = () => {
    let breadcrumbs = "Account Page"
    const screenResolution: WindowResolutions = useWindowSize();
    return (
        <InAppTemplate hasSearchBar={false} breadcrumbs={breadcrumbs} pageHeadingTitle="Virtual Account" childComponent={<VirtualAccountDetailsContent {...screenResolution} />} />
    )
}