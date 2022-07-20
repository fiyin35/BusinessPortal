// import { useState } from "react";
import {InAppTemplate} from "../../../shared/templates/inapp";

import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"

import {WindowResolutions} from "../../../types"
import {TableComponent} from "../../../shared/components/table"
import FilterSearch from "../../../shared/components/search-filter"
import { Button } from "react-bootstrap";




const ReportsTable = ()=>{
    return(
        <>
            <thead>
                <tr>
                    <th>Transaction Id</th>
                    <th>Date</th>
                    <th>Transaction Type</th>
                    <th>Device ID</th>
                    <th>RRN</th>
                    <th>Provider</th>
                    <th>Amount</th>
                    <th>Commision</th>
                    <th>Narration</th>
                    <th>Beneficiary Account</th>
                    <th>Business Account</th>
                    <th>Transaction Status</th>
                    <th>Status Code</th>
                </tr>
            </thead>
            {/* <EmptyRecords /> */}
        </>
    )
}

const SearchFiltersOptions = ()=>{

    return(
        <div className="all-filter-options">
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">By Transaction Type</label>
                <select name="" id="">
                    <option value="inflow">Inflow</option>
                    <option value="outflow">Outflow</option>
                </select>
            </div>
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">By Date</label>
                <select name="" id="">
                    <option value="all-time">All Time</option>
                    <option value="custom">Custom Date</option>
                </select>
            </div>
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">By Status code</label>
                <select name="" id="">
                    <option value="all-time">All Time</option>
                </select>
            </div>
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">By Business Account</label>
                <select name="" id="">
                    <option value=""></option>
                </select>
            </div>
        </div>
    )
}

const fetchRequests = ()=>{

}



const TerminalTxtnRecords = (props:WindowResolutions)=>{
    return(
        <div className="page-content-wrap">
            <FilterSearch hasFilter={true} callback={fetchRequests} canExportPdf={true} exportPdfCallback={fetchRequests} childComponent={<SearchFiltersOptions/>} />
            <div className="card-wrap">
                <div className="card-heading ">
                    <div className="heading-txt">Terminals Transacations  <span className="sub-heading-txt">0 records</span> </div>
                </div>
                <TableComponent 
                    hasCta={false}
                    isEmptyRecords={true}
                    emptyRecordsMessage="No Transactions yet" 
                    childComponent={<ReportsTable />} 
                />
            </div>
        </div>
    )
}


export const TerminalTxtnWrap = ()=>{
    let breadcrumbs = "Terminals transacations "
    const screenResolution : WindowResolutions = useWindowSize();
    return(
        <InAppTemplate breadcrumbs={breadcrumbs}  hasSearchBar={false} pageHeadingTitle="Transactions" childComponent={<TerminalTxtnRecords {...screenResolution} /> } />
    )
}