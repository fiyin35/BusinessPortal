import { FunctionComponent, PropsWithChildren, ReactElement, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { InAppTemplate } from "../../../shared/templates/inapp";



import { useWindowSize } from "../../../hooks/useWindowSize";
import "../index.scss"
import { myBizActions } from "../../../redux/actions/in-app/my-business/index"
import { WindowResolutions } from "../../../types"
import { TableComponent } from "../../../shared/components/table"
import FilterSearch from "../../../shared/components/search-filter"
import { RowActionDrop } from "../../../shared/components/row-action-drop"

import ApproveIcon from "../../../assets/images/icons/done.png"
import EditIcon from "../../../assets/images/icons/edit.png"
import DisableIcon from "../../../assets/images/icons/remove.png"
import FundIcon from "../../../assets/images/icons/fund.png"


type OwnProps = ReturnType<typeof mapStateToProps>;
const MyBusinessWrap = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const dispatch = useDispatch();
    const [hasRequested, setHasRequested] = useState(false);
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);

    let initialParams = {params:`?CurrentPage=1&PageSize=25&CurrentSelectedPage=1`};
    useEffect(() => {

        // if (defaultAccount) {
            // setLoadingBal(true)
            
            fetchRequests(initialParams).then(() => {

                // setLoadingBal(false)
                // if (pageProps.getAccBalRequest.request_status === "GET_ACC_BAL_SUCCESS") {
                    
                //     setBalances(pageProps.getAccBalRequest.request_data.response.result)
                // }
            })
            
        // }

    }, [])

    const RowActions = () => {
        return (
            <div className="all-row-actions table-actions">
                <Link to="/app/my-business/4343/edit" className="each-action">
                    <img src={EditIcon} alt="" /> Edit
                </Link>
                <div className="each-action"> <img src={DisableIcon} alt="" />Disable</div>
                <div className="each-action"> <img src={ApproveIcon} alt="" />Approve</div>
                <div className="each-action"> <img src={FundIcon} alt="" />Fund Validation Wallet</div>
            </div>
        )
    }

    const ReportsTable = () => {

        if (pageProps.getAllBizRequest.request_data?.response) {
            let requestData = pageProps.getAllBizRequest.request_data.response.result
            
            return (
                <>
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Email Address</th>
                            <th>Account ID</th>
                            <th>Bank Account</th>
                            <th>Profile Status</th>
                            <th>Hierarchy</th>
                            <th>Business Level</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requestData.map((eachData:any, index:any) => {
                                return (
                                    <tr key={index}>
                                        <td>{eachData.businessName}</td>
                                        <td>{eachData.emailAddress}</td>
                                        <td>{eachData.defaultCIF}</td>
                                        <td>{eachData.defaultAccount}</td>
                                        <td>{eachData.profileStatusDescription}</td>
                                        <td>{eachData.hierarchyLevelDescription}</td>
                                        <td><span className="tag">{eachData.businessLevelDescription}</span> </td>
                                        <td>
                                            <RowActionDrop childComponent={<RowActions />} />
                                        </td>
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
                        <th>Business Name</th>
                        <th>Email Address</th>
                        <th>Account ID</th>
                        <th>Bank Account</th>
                        <th>Profile Status</th>
                        <th>Hierarchy</th>
                        <th>Business Level</th>
                        <th>Action</th>
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

    const fetchRequests = async(props: any) => {
        setHasRequested(true)
        await dispatch(myBizActions.GetMyBusinesses(props.params))
    }




    const AllBusinessesRecords = (props: WindowResolutions) => {
        let history = useNavigate();
        let requestResults = pageProps.getAllBizRequest;

        return (
            <div className="page-content-wrap">
                <FilterSearch
                    hasFilter={true}
                    // childComponent={<SearchFiltersOptions />}
                    callback={fetchRequests}
                    isFetching={pageProps.getAllBizRequest?.is_request_processing}
                    filterOptions={{
                        byDate: true,
                        byStatus: true,
                        pageSize: pageSize,
                        currentPage: currentPage,
                    }}
                    otherCtas={
                        <button onClick={() => history("/app/my-business/add-new")}
                            className="btn form-action-btn">Create New Business</button>}
                />

                <div className="card-wrap">
                    <div className="card-heading horizontal spread">
                        <div className="heading-txt">Business
                            {(requestResults?.is_request_processing
                                && requestResults?.request_data && requestResults.request_data?.response
                                && requestResults.request_data.response?.result.length === 0) &&
                                <span className="sub-heading-txt active">{requestResults.request_data.response.result.length} record</span>
                            }

                        </div>
                    </div>
                    <TableComponent
                        hasCta={true}
                        hasRequested={hasRequested}
                        isFailed={requestResults?.request_data?.error}
                        failureMsg={requestResults?.request_data?.error}
                        requestStatus={requestResults?.is_request_processing}
                        isEmptyRecords={!requestResults?.is_request_processing &&
                            requestResults?.request_data && requestResults.request_data?.response &&
                            requestResults.request_data.response?.result.length === 0}
                        ctaCallback={() => history("/app/my-business/add-new")}
                        hasCtaText="Setup new Business"
                        emptyRecordsMessage="You have no business yet
                        Click Create new Business” to get started"
                        waitingState={<WaitingState />}
                        childComponent={<ReportsTable />}
                    />
                </div>
            </div>
        )
    }




    const screenResolution: WindowResolutions = useWindowSize();
    return (
        <InAppTemplate hasSearchBar={false} pageHeadingTitle="Business Registration" childComponent={<AllBusinessesRecords {...screenResolution} />} />
    )
}
const mapDispatchToProps = {
    getMyBusinesses: myBizActions.GetMyBusinesses,
};

const mapStateToProps = (state: any) => ({
    // return {
    getAllBizRequest: state.bizUserReducers.getAllBizReducer,
    // confirmTenantRequest: state.authReducers.confirmTenantReducer

    // };
})
export default connect(mapStateToProps, mapDispatchToProps)(MyBusinessWrap);