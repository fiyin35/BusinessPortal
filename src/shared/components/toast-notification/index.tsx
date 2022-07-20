import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./index.scss"
import { NotificationAlertProps } from "../../../types";
import  CloseWhite from "../../../assets/images/icons/close-white.png"
import React, { ReactElement } from 'react';


export const NotificationAlert = (props:NotificationAlertProps)=>{
    const customId = props.notifyId;
    // const CloseNotify :React.FC = (): ReactElement =>{
    //     return(
    //         <div className="close-notify"><img src={CloseWhite} alt="" /></div>
    //     )
    // }
    const NotifyWrap :  React.FC  = () : ReactElement  =>{
        return(
            <div className={`notify-alert ${props.type}`}>
                {props.hasheader &&
                    <div className="notify-heading">
                        <div className="heading-txt">{props.headerText}</div>
                       
                    </div>
                }
                <div className="alert-msg">{props.message}</div>
            </div>
        )
    }
    console.log("here now")

    return(
        <>
            {props.isTriggered && toast(<NotifyWrap/>, {toastId:customId, autoClose: false,})}
            <ToastContainer />
        </>
    )

    
}