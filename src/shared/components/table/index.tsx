import  React, {useEffect} from 'react';
// import { NavLink} from 'react-router-dom';
import { Fragment } from "react";
import Table from 'react-bootstrap/Table'
import { TableProps } from "../../../types";
import { AlertMsg } from "../alert-msg"
import "./index.scss";
import EmptyTxtn from "../../../assets/images/empty.png"

const EmptyRecords = (props: TableProps) => {
    const { emptyRecordsMessage, hasCta, hasCtaText, ctaCallback } = props;
    return (
        <div className="empty-txtn">
            <img src={EmptyTxtn} alt="" />
            <div className="emtpy-msg ">
                {emptyRecordsMessage}
            </div>
            {hasCta &&
                <button onClick={ctaCallback} className="btn refresh-btn" type="submit">{hasCtaText || "Refresh"}</button>
            }
        </div>
    )
}

export const TableComponent: React.FC<TableProps> = (props) => {
    
    const { childComponent,
        classnames,
        isEmptyRecords,
        requestStatus, failureMsg,
        isFailed,
        hasRequested, waitingState } = props;

    // const RenderTable :  React.FC  = () : React.ReactElement  =>{

    //     return(

    //             // <Table  hover className={this.props.classnames}>
    //             <Table striped hover className={classnames}>
    //                 {childComponent}
    //             </Table>
    //     )


   

    const LoadingData = () => {
        return (
            <div className="loading-data">
                Please wait ...
            </div>
        )
    }





    
    return (
        <Fragment>

            <div className="tablecomponent-container">
                <div className="container">

                    {(!isEmptyRecords && hasRequested && !requestStatus && !isFailed) &&
                        <div className="row">
                            <Table hover className={classnames}>


                                {childComponent}
                            </Table>
                        </div>
                    }
                    {
                        requestStatus &&
                        <LoadingData />
                    }
                    {(!requestStatus && isFailed) &&
                        <AlertMsg type="error" message={failureMsg} />
                    }


                    {!hasRequested &&
                        <div className="row">
                            <Table hover className={classnames}>


                                {waitingState}
                            </Table>
                        </div>
                    }


                    {(isEmptyRecords && hasRequested) &&
                        <EmptyRecords {...props} />
                    }
                </div>
            </div>
        </Fragment>
    );

}





