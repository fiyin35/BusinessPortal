import {useEffect, FunctionComponent, PropsWithChildren, ReactElement, useState } from "react";
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
import SettingsIcon from "../../../assets/images/icons/btn-setting.png"
import ApproveIcon from "../../../assets/images/icons/done.png"
import EditIcon from "../../../assets/images/icons/edit.png"
import DisableIcon from "../../../assets/images/icons/remove.png"
// import { Button } from "react-bootstrap";

type OwnProps = ReturnType<typeof mapStateToProps>;
const AllUsersWrap = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
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
        return (
            <>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email Address</th>
                        <th>Phone number</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><span className="tag main-tag"></span> </td>
                        <td>
                            <RowActionDrop childComponent={<RowActions />} />
                        </td>
                    </tr>
                   
                </tbody>
                {/* <EmptyRecords /> */}
            </>
        )
    }

    const WaitingState = () => {
        return (
            <>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email Address</th>
                        <th>Phone number</th>
                        <th>Role</th>
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
        await dispatch(myBizActions.GetMyBusinessesUsers(props.params))
    }




    const GoToNew = () => {
        let history = useNavigate();
        history("/app/manage-users/add-new")
    }


    const AllUsersRecords = (props: WindowResolutions) => {
        let history = useNavigate();
        let requestResults = pageProps.getBizUsersRequest;
        return (
            <div className="page-content-wrap">
                {/* <FilterSearch callback={GoToNew} otherCtas={<button onClick={() => history("/app/manage-users/add-new")} className="btn form-action-btn">Create New User</button>} /> */}

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
                        <button onClick={() => history("/app/manage-users/add-new")} className="btn form-action-btn">Create New User</button>}
                />
                <div className="card-wrap">
                    <div className="card-heading horizontal spread">
                        <div className="heading-txt">
                            Users
                            {(requestResults?.is_request_processing
                                && requestResults?.request_data && requestResults.request_data?.response
                                && requestResults.request_data.response?.result.length === 0) &&
                                <span className="sub-heading-txt active">{requestResults.request_data.response.result} member</span>
                            }
                            </div>
                        <button type="button" className="btn action-lightgray" onClick={() => history("/app/manage-users/roles")}>
                            <span>Manage User Roles</span>
                            <img src={SettingsIcon} alt="" />
                        </button>
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
                        emptyRecordsMessage="You have no users yet
                        Click Create new user to get started"
                        waitingState={<WaitingState />}
                        childComponent={<ReportsTable />}
                    />
                </div>
            </div>
        )
    }


    // export const AllUsersWrap = ()=>{

    const screenResolution: WindowResolutions = useWindowSize();
    return (
        <InAppTemplate hasSearchBar={false} pageHeadingTitle="User Management" childComponent={<AllUsersRecords {...screenResolution} />} />
    )
}

const mapDispatchToProps = {
    getMyBusinessUsers: myBizActions.GetMyBusinessesUsers,
};

const mapStateToProps = (state: any) => ({
    // return {
    getBizUsersRequest: state.bizUserReducers.geMyBizUsersReducer,
    // confirmTenantRequest: state.authReducers.confirmTenantReducer

    // };
})
export default connect(mapStateToProps, mapDispatchToProps)(AllUsersWrap);