import { FunctionComponent, useEffect, PropsWithChildren, ReactElement, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { InAppTemplate } from "../../shared/templates/inapp";
import { accountActions } from "../../redux/actions/in-app/accounts/accounts.action"
import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import { TableComponent } from "../../shared/components/table"
import "./index.scss"
import Arrowright from "../../assets/images/icons/arrow-right.png"
// import EmptyTxtn from "../../assets/images/empty.png"

import { WindowResolutions } from "../../types"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
//   import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


type OwnProps = ReturnType<typeof mapStateToProps>;

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top' as const,
        },
        title: {
            display: false,
            // text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const labelValues = [10000, 22000, 32939, 24489, 60343, 74323, 26882, 10368, 20376, 37432, 23638];

const data = {
    labels,
    datasets: [
        {
            label: '',
            data: labelValues,
            borderColor: 'rgb(255, 99, 132)',
            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },

    ],
};
const DashboardPage = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const dispatch = useDispatch();
    const [isBalanceLoading, setLoadingBal] = useState(false);
    const [hasRequestedHistory, setHasRequestedHistory] = useState(false);
    const [allBalances, setBalances] = useState<any>();
    const [isHistoryLoading, setLoadingHistory] = useState(false);
    const [historyData, setHistoryData] = useState<any>([]);
    const defaultAccount = pageProps.loginRequest.request_data.response.defaultAccount;

    useEffect(() => {

        if (defaultAccount) {
            setLoadingBal(true)
            getAccountBalance().then(() => {

                setLoadingBal(false)
                if (pageProps.getAccBalRequest.request_status === "GET_ACC_BAL_SUCCESS") {
                    
                    setBalances(pageProps.getAccBalRequest.request_data.response.result)
                }
            })
            setLoadingHistory(true)
            setHasRequestedHistory(true)
            getAccountHistory().then(() => {
                setLoadingHistory(false)
                if (pageProps.getAccHistRequest.request_status === "GET_ACC_HIST_SUCCESS") {
                    setHistoryData(pageProps.getAccHistRequest.request_data.response.result)
                }
            })
        }

    }, [defaultAccount])


    const getAccountBalance = async () => {
        let params = `?AccountNumber=${defaultAccount}`;
        await dispatch(accountActions.GetAccountBalance(params))
    }

    const getAccountHistory = async () => {
        let params = `?AccountNumber=${defaultAccount}&pageSize=25&currentPage=1`;
        await dispatch(accountActions.GetTxtHistory(params))
    }

    const BalanceCard = () => {
        return (
            <div className="balance-card-wrap">
                {isBalanceLoading &&
                    <div className="loading-txt">
                        Loading Account balance
                    </div>
                }
                {
                    (!isBalanceLoading && allBalances) &&
                    <div className="each-balance-section">
                        <div className="each-balance-item">
                            <div className="balance-item">Available Balance</div>
                            <div className="balance-value">₦{allBalances?.availableBalance}</div>
                        </div>
                        <div className="each-balance-item">

                        </div>
                    </div>
                }
                {(!isBalanceLoading && allBalances) &&
                    <div className="each-balance-section">
                        <div className="each-balance-item">
                            <div className="balance-item">Book Balance</div>
                            <div className="balance-value">₦{allBalances?.bookBalance}</div>
                        </div>
                        <div className="each-balance-item">
                            <div className="balance-item">Uncleared Balance</div>
                            <div className="balance-value">₦{allBalances?.ledgerBalance}</div>
                        </div>
                        <div className="each-balance-item">
                            <div className="balance-item">Lien Balance</div>
                            <div className="balance-value">₦{allBalances?.lienBalance}</div>
                        </div>
                        <div className="withdraw-cta">
                            Withdraw
                            <img src={Arrowright} alt="" />
                        </div>
                    </div>
                }
            </div>
        )
    }

    const ChartCard = () => {
        return (
            <div className="trend-wrap">
                <div className="mybalances">
                    {/* <div className="balance-amount">₦0.00</div> */}
                    <div className="select-balance-filter">
                        <select name="" id="">
                            <option value={defaultAccount}>{defaultAccount} </option>
                        </select>
                    </div>
                    <div className="select-balance-filter">
                        <select name="" id="">
                            <option value="">All time</option>
                        </select>
                    </div>
                </div>
                <div className="chart-wrap ">
                    <Line options={options} data={data} />
                </div>
            </div>
        )
    }

    // const EmptyTxtnHistoryList = () => {
    //     return (
    //         <div className="empty-txtn">
    //             <img src={EmptyTxtn} alt="" />
    //             <div className="emtpy-msg">
    //                 No Transaction yet
    //             </div>
    //         </div>
    //     )
    // }

    // const LoadingTxtnHistory = () => {
    //     return (
    //         <div className="empty-txtn">
    //             <div className="emtpy-msg">
    //                 Fetching transactions...
    //             </div>
    //         </div>
    //     )
    // }

    const WaitingState = () => {
        return (
            <>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>


                </tbody>
                {/* <EmptyRecords /> */}
            </>
        )
    }

    const ReportsTable = () => {
       
        if(pageProps.getAccHistRequest.request_data?.response){
            let requestData = pageProps.getAccHistRequest.request_data.response.result
        return (
            <>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requestData.map(({ eachData, index }: any) => {
                            return (
                                <tr key={index}>
                                    <td>{eachData.transactionReference}</td>
                                    <td>{eachData.actualAmount}</td>
                                </tr>
                            )
                        })
                    }



                </tbody>
                {/* <EmptyRecords /> */}
            </>
        )
                }else{
                    return <></>
                }
    }
    const TxtnHistoryList = () => {
        return (
            <div className="txtn-list">
                <TableComponent
                    hasCta={true}
                    hasRequested={hasRequestedHistory}
                    isFailed={pageProps.getAccHistRequest?.request_data?.error}
                    failureMsg={pageProps.getAccHistRequest?.request_data?.error}
                    requestStatus={pageProps.getAccHistRequest?.is_request_processing}
                    isEmptyRecords={!pageProps.getAccHistRequest?.is_request_processing &&
                        pageProps.getAccHistRequest?.request_data && pageProps.getAccHistRequest.request_data?.response &&
                        pageProps.getAccHistRequest.request_data.response?.result.length === 0}
                    
                    hasCtaText="Refresh"
                    ctaCallback={getAccountHistory}
                    emptyRecordsMessage="There are no records found"
                    waitingState={<WaitingState />}
                    childComponent={<ReportsTable />}
                />
            </div>
        )
    }


    const TxtnHistory = () => {
        return (
            <div className="alltransactions">
                <TxtnHistoryList />

            </div>
        )
    }

    const TxtnHistoryCard = () => {
        return (
            <div className="txtn-history card-wrap">
                <div className="card-heading horizontal centered spread">
                    <div className="card-title-txt">Transaction History</div>
                    <div className="card-actions">
                        <Link to="/app/transactions">View All</Link>
                    </div>
                </div>

                <TxtnHistory />
            </div>
        )
    }


    const PageContent = (props: WindowResolutions) => {


        return (
            <div className="in-app-page">
                <div className="top-section">
                    <BalanceCard />
                    <ChartCard />
                </div>
                <TxtnHistoryCard />

            </div>
        )
    }


    const screenResolution: WindowResolutions = useWindowSize();
    return (
        <InAppTemplate hasSearchBar={true} pageHeadingTitle="Dashboard" childComponent={<PageContent {...screenResolution} />} />
    )
}

const mapDispatchToProps = {
    // getAllVirtualAccounts: accountActions.GetVirtualAccTransaction,
};

const mapStateToProps = (state: any) => {

    return {
        getVirtualAccTxtnsRequest: state.myAccountsReducers.getVirtualAccTxtnsReducer,
        getAccBalRequest: state.myAccountsReducers.getAccBalReducer,
        getAccHistRequest: state.myAccountsReducers.getAccHistReducer,
        loginRequest: state.onboardingOutboundReducers.loginReducer,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);