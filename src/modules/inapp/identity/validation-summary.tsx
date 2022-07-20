// import { useState } from "react";
import {InAppTemplate} from "../../../shared/templates/inapp";

import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"

import {WindowResolutions} from "../../../types"
import {TableComponent} from "../../../shared/components/table"
import FilterSearch from "../../../shared/components/search-filter"
// import { Button } from "react-bootstrap";




const ReportsTable = ()=>{
    return(
        <>
            <thead>
                <tr>
                    <th>Business</th>
                    <th>Business ID</th>
                    <th>Total Unit</th>
                    <th>Total Charge (NGN)</th>
                    <th>Unit Balance</th>
                    <th>Action</th>
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
                <label htmlFor="" className="filter-label">By Business ID</label>
                <select name="" id="">
                    <option value="all-time">All Time</option>
                </select>
            </div>
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">By Date</label>
                <select name="" id="">
                    <option value="all-time">All Time</option>
                </select>
            </div>
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">By Status code</label>
                <select name="" id="">
                    <option value="all-time">All Time</option>
                </select>
            </div>
        </div>
    )
}

const fetchRequests = ()=>{

}



const ValidationSummary = (props:WindowResolutions)=>{
    return(
        <div className="page-content-wrap">
            <FilterSearch hasFilter={true} callback={fetchRequests} childComponent={<SearchFiltersOptions/>} />
            <div className="card-wrap">
                <div className="card-heading ">
                    <div className="heading-txt">Validation Summary <span className="sub-heading-txt">0 records</span> </div>
                </div>
                <TableComponent 
                    hasCta={true}
                    isEmptyRecords={true}
                    emptyRecordsMessage="You have no validation summary yet. Click “Refresh” to check for recents" 
                    childComponent={<ReportsTable />} 
                />
            </div>
        </div>
    )
}


export const ValidationSummaryWrap = ()=>{
    let breadcrumbs = "Validation Summary"
    const screenResolution : WindowResolutions = useWindowSize();
    return(
        <InAppTemplate breadcrumbs={breadcrumbs}  hasSearchBar={false} pageHeadingTitle="Identity Validation" childComponent={<ValidationSummary {...screenResolution} /> } />
    )
}