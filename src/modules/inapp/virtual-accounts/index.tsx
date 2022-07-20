import { FunctionComponent, useEffect, PropsWithChildren, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { InAppTemplate } from "../../../shared/templates/inapp";

import { useWindowSize } from "../../../hooks/useWindowSize";
import "../index.scss"
import { accountActions } from "../../../redux/actions/in-app/accounts/accounts.action"
import { WindowResolutions } from "../../../types"
import { TableComponent } from "../../../shared/components/table"
import FilterSearch from "../../../shared/components/search-filter"
//import {RowActionDrop} from "../../../shared/components/row-action-drop"
import SettingsIcon from "../../../assets/images/icons/btn-setting.png"
import ApproveIcon from "../../../assets/images/icons/done.png"
import EditIcon from "../../../assets/images/icons/edit.png"
import DisableIcon from "../../../assets/images/icons/remove.png"
// import { Button } from "react-bootstrap";

type OwnProps = ReturnType<typeof mapStateToProps>;
const VirtualAccountWrap = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const screenResolution: WindowResolutions = useWindowSize();
    const dispatch = useDispatch();
    const [hasRequested, setHasRequested] = useState(false);
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    let initialParams = {params:`?CurrentPage=1&PageSize=25&CurrentSelectedPage=1`};
    useEffect(() => {
        fetchRequests(initialParams)

    }, [])

    const RowActions = () => {
        return (
            <div className="all-row-actions">
                <div className="each-action"> <img src={EditIcon} alt="" /> Edit</div>
                <div className="each-action"> <img src={DisableIcon} alt="" />Disable</div>
                <div className="each-action"> <img src={ApproveIcon} alt="" />Approve</div>
            </div>
        )
    }

    const ReportsTable = () => {

        // let requestResults = pageProps.getAllBizUAccountsRequest;
        if (pageProps.getAllBizUAccountsRequest.request_data?.response) {
            let requestData = pageProps.getAllBizUAccountsRequest.request_data.response.result
            return (
                <>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Middle name</th>
                            <th>Account Name</th>
                            <th>Account Number</th>
                            {/* <th>Main Account Number</th> */}
                            <th> Partner Account</th>
                            <th> Partner ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requestData.map(({ eachData, index }: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{eachData.firstName}</td>
                                        <td>{eachData.lastName}</td>
                                        <td>{eachData.middleName}</td>
                                        <td>{eachData.nameOnAccount}</td>
                                        <td>{eachData.mainAccountNumber}</td>
                                        <td>{eachData.mainAccountCif}</td>
                                        <td>{eachData.accountId}</td>
                                        <td><span className="tag">{eachData.statusDescription}</span> </td>

                                    </tr>
                                )
                            })
                        }



                    </tbody>
                    {/* <EmptyRecords /> */}
                </>
            )
        } else {
            return <></>
        }
    }

    const WaitingState = () => {
        return (
            <>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Middle name</th>
                        <th>Account Name</th>
                        <th>Account Number</th>
                        {/* <th>Main Account Number</th> */}
                        <th> Partner Account</th>
                        <th> Partner ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>

                        </td>
                    </tr>


                </tbody>
                {/* <EmptyRecords /> */}
            </>
        )
    }


    const fetchRequests = (props: any) => {
        setHasRequested(true)
        dispatch(accountActions.GetAllVirtualAccounts(props.params))
    }





    // const GoToNew = ()=>{
    //     let history = useNavigate();
    //     history("/app/manage-users/add-new")
    // }


    const VirtualAccount = (props: WindowResolutions) => {
        let history = useNavigate();
        let requestResults = pageProps.getAllBizUAccountsRequest;
        return (
            <div className="page-content-wrap">
                {/* <FilterSearch
                    childComponent={<SearchFiltersOptions />}
                    callback={fetchRequests}
                    otherCtas={<button onClick={() => history("/app/virtual-accounts/new-virtual-account")}
                        className="btn form-action-btn">Create Virtual Account</button>}
                /> */}

                <FilterSearch
                    hasFilter={true}
                    // childComponent={<SearchFiltersOptions />}
                    callback={fetchRequests}
                    isFetching={requestResults?.is_request_processing}
                    filterOptions={{
                        byDate: true,
                        byStatus: true,
                        pageSize: pageSize,
                        currentPage: currentPage,
                    }}
                    otherCtas={
                        <button onClick={() => history("/app/virtual-accounts/new-virtual-account")}
                            className="btn form-action-btn">Create Virtual Acccount</button>}
                />
                <div className="card-wrap">
                    <div className="card-heading horizontal spread">
                        <div className="heading-txt">
                            Virtual Accounts
                            {(requestResults?.is_request_processing
                                && requestResults?.request_data && requestResults.request_data?.response
                                && requestResults.request_data.response?.result.length === 0) &&
                                <span className="sub-heading-txt active">{requestResults.request_data.response.result.length} record</span>
                            }
                        </div>

                    </div>
                    {/* <TableComponent
                        hasCta={true}
                        isEmptyRecords={false}
                        ctaCallback={() => history("/app/virtual-accounts/new-virtual-account")}
                        hasCtaText="Create Virtual Account"
                        emptyRecordsMessage="You have no virtual account yet
                Click “Create virtual account” to get started"
                        childComponent={<ReportsTable />}
                    /> */}
                    <TableComponent
                        hasCta={true}
                        hasRequested={hasRequested}
                        isFailed={requestResults?.request_data?.error}
                        failureMsg={requestResults?.request_data?.error}
                        requestStatus={requestResults?.is_request_processing}
                        isEmptyRecords={!requestResults?.is_request_processing &&
                            requestResults?.request_data && requestResults.request_data?.response &&
                            requestResults.request_data.response?.result.length === 0}
                        ctaCallback={() => history("/app/virtual-accounts/new-virtual-account")}
                        hasCtaText="Create Virtual Acccount "
                        emptyRecordsMessage="You have no accounts yet
                        Click Create Virtual Acccount to get started"
                        waitingState={<WaitingState />}
                        childComponent={<ReportsTable />}
                    />
                </div>
            </div>
        )
    }


    // const VirtualAccountWrap = ()=>{


    return (
        <InAppTemplate hasSearchBar={false} pageHeadingTitle="Virtual Account" childComponent={<VirtualAccount {...screenResolution} />} />
    )
}
const mapDispatchToProps = {
    getAllVirtualAccounts: accountActions.GetAllVirtualAccounts,
};

const mapStateToProps = (state: any) => {
   
    return {
        getAllBizUAccountsRequest: state.myAccountsReducers.getAllBizUAccountsReducer,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VirtualAccountWrap);