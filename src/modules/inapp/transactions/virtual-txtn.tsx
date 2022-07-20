import { FunctionComponent, useEffect, PropsWithChildren, ReactElement, useState } from "react";
import { connect, useDispatch } from 'react-redux';

import { InAppTemplate } from "../../../shared/templates/inapp";

import { useWindowSize } from "../../../hooks/useWindowSize";
import "../index.scss"
import { accountActions } from "../../../redux/actions/in-app/accounts/accounts.action"
import { WindowResolutions } from "../../../types"
import { TableComponent } from "../../../shared/components/table"
import FilterSearch from "../../../shared/components/search-filter"
import { Button } from "react-bootstrap";


type OwnProps = ReturnType<typeof mapStateToProps>;
const VirtualTxtnWrap = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    let breadcrumbs = "Virtual account Transactions"
    const screenResolution: WindowResolutions = useWindowSize();
    const dispatch = useDispatch();
    const [hasRequested, setHasRequested] = useState(false);
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    
    let initialParams = {params:`?CurrentPage=1&PageSize=25&CurrentSelectedPage=1`};
    useEffect(() => {
        fetchRequests(initialParams)
        // dispatch(accountActions.GetVirtualAccTransaction("CLEAR"))

    }, [])

    const ReportsTable = () => {
        return (
            <>
                <thead>
                    <tr>
                        <th>Transaction Id</th>
                        <th>Date</th>
                        <th>Transaction Type</th>
                        <th>Sender name</th>
                        <th>Sender account</th>
                        <th>Sender Bank</th>
                        <th>Amount</th>
                        <th>Commision</th>
                        <th>Narration</th>
                        <th>Beneficiary Account</th>
                        <th>Business Account</th>
                        <th>Transaction Status</th>
                        <th>Status Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TRAS1829101</td>
                        <td>12th Apr, 2022 12:26:02 PM </td>
                        <td>INFLOW</td>
                        <td>Adegbuyi</td>
                        <td>092218291</td>
                        <td>Guranatee Trust Bank</td>
                        <td>₦300,000.00</td>
                        <td>NGN 104</td>
                        <td>REF 2435 Lagos  </td>
                        <td>Mayor Business</td>
                        <td>092218291</td>
                        <td>Completed</td>
                        <td>243</td>
                    </tr>
                    <tr>
                        <td>TRAS1829101</td>
                        <td>12th Apr, 2022 12:26:02 PM </td>
                        <td>INFLOW</td>
                        <td>Adegbuyi</td>
                        <td>092218291</td>
                        <td>Guranatee Trust Bank</td>
                        <td>₦300,000.00</td>
                        <td>NGN 104</td>
                        <td>REF 2435 Lagos  </td>
                        <td>Mayor Business</td>
                        <td>092218291</td>
                        <td>Completed</td>
                        <td>243</td>
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
                        <th>Transaction Id</th>
                        <th>Date</th>
                        <th>Transaction Type</th>
                        <th>Sender name</th>
                        <th>Sender account</th>
                        <th>Sender Bank</th>
                        <th>Amount</th>
                        <th>Commision</th>
                        <th>Narration</th>
                        <th>Beneficiary Account</th>
                        <th>Business Account</th>
                        <th>Transaction Status</th>
                        <th>Status Code</th>
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>


                </tbody>
                {/* <EmptyRecords /> */}
            </>
        )
    }

    const fetchRequests = (props: any) => {
        setHasRequested(true)
        dispatch(accountActions.GetVirtualAccTransaction(props.params))
    }



    const VirtualTxtnRecords = (props: WindowResolutions) => {

        let requestResults = pageProps.getVirtualAccTxtnsRequest;
        return (
            <div className="page-content-wrap">

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
                    canExportPdf={true}
                />
                <div className="card-wrap">
                    <div className="card-heading ">
                        <div className="heading-txt">
                            Virtual account Transactions
                            {(requestResults?.is_request_processing
                                && requestResults?.request_data && requestResults.request_data?.response
                                && requestResults.request_data.response?.result.length === 0) &&
                                <span className="sub-heading-txt active">{requestResults.request_data.response.result.length} record</span>
                            }
                        </div>
                    </div>
                    <TableComponent
                        hasCta={false}
                        isEmptyRecords={false}
                        emptyRecordsMessage="No Transactions yet"
                        childComponent={<ReportsTable />}

                        
                    />
                    <TableComponent
                        hasCta={true}
                        hasRequested={hasRequested}
                        isFailed={requestResults?.request_data?.error}
                        failureMsg={requestResults?.request_data?.error}
                        requestStatus={requestResults?.is_request_processing}
                        isEmptyRecords={!requestResults?.is_request_processing &&
                            requestResults?.request_data && requestResults.request_data?.response &&
                            requestResults.request_data.response?.result.length === 0}
                        ctaCallback={() => null}
                      
                        emptyRecordsMessage="No Transactions yet"
                        waitingState={<WaitingState />}
                        childComponent={<ReportsTable />}
                    />
                </div>
            </div>
        )
    }




    return (
        <InAppTemplate breadcrumbs={breadcrumbs} hasSearchBar={false} pageHeadingTitle="Transactions" childComponent={<VirtualTxtnRecords {...screenResolution} />} />
    )
}
const mapDispatchToProps = {
    // getAllVirtualAccounts: accountActions.GetVirtualAccTransaction,
};

const mapStateToProps = (state: any) => {

    return {
        getVirtualAccTxtnsRequest: state.myAccountsReducers.getVirtualAccTxtnsReducer,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VirtualTxtnWrap);