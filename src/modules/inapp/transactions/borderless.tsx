// import { useState } from "react";
import { NavLink } from "react-router-dom"
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
                    <th>Sender Institution</th>
                    <th>Settlement Code</th>
                    <th>Destination Institution</th>
                    <th>Institution Id</th>
                    <th>Transaction Id</th>
                    <th>Transaction Date</th>
                    <th>Sent Amount</th>
                    <th>Sender Currency</th>
                    <th>Exchange Rate (1USD - 560 NGN)</th>
                    <th>Markup</th>
                    <th>Receiver's Currency</th>
                    <th>Receiving Amount</th>
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



const BorderlessTxtnRecords = (props:WindowResolutions)=>{
    return(
        <div className="page-content-wrap">
            <FilterSearch hasFilter={true} callback={fetchRequests} canExportPdf={true} exportPdfCallback={fetchRequests} childComponent={<SearchFiltersOptions/>} />
            <div className="table-top-nav">
            <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/transactions/borderless">
                Sender Institution
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/app/transactions/borderless-destination">
                Destination Institution
            </NavLink>
            </div>
            <div className="card-wrap">
                <div className="card-heading ">
                    <div className="heading-txt">Sender Institution <span className="sub-heading-txt">0 records</span> </div>
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


export const BorderlessTxtnWrap = ()=>{
    let breadcrumbs = "Borderless Transactions"
    const screenResolution : WindowResolutions = useWindowSize();
    return(
        <InAppTemplate breadcrumbs={breadcrumbs}  hasSearchBar={false} pageHeadingTitle="Transactions" childComponent={<BorderlessTxtnRecords {...screenResolution} /> } />
    )
}