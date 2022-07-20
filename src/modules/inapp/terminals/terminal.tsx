// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {InAppTemplate} from "../../../shared/templates/inapp";

import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"

import {WindowResolutions} from "../../../types"
import {TableComponent} from "../../../shared/components/table"
import FilterSearch from "../../../shared/components/search-filter"




const TerminalTable = ()=>{
    return(
        <>
            <thead>
                <tr>
                    <th>DEVICE NAME</th>
                    <th>DEVICE ID</th>
                    <th>SERIAL NUMBER</th>
                    <th>TERMINAL PROVIDER</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            {/* <EmptyRecords /> */}
        </>
    )
}


const fetchRequests = () => {

}

const SearchFiltersOptions = ()=>{

    return(
        <div className="all-filter-options">
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">Device Name</label>
                <select name="" id="">
                    <option value="device name">Device  name 1</option>
                    <option value="device name">Device name 2</option>
                </select>
            </div>
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">Device ID</label>
                <select name="" id="">
                    <option value="0">0</option>
                    <option value="1"> 1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">Serial Number</label>
                <select name="" id="">
                    <option value="number">Number 1</option>
                    <option value="number">Number 2</option>
                </select>
            </div>
            <div className="each-filter-option">
                <label htmlFor="" className="filter-label">Terminal Provider</label>
                <select name="" id="">
                    <option value="terminal">Terminal Provider 1</option>
                </select>
            </div>
        </div>
    )
}



// const GoToNew = ()=>{
//     let history = useNavigate();
//     history("/app/manage-users/add-new")
// }


const Terminal = (props:WindowResolutions)=>{
    let history = useNavigate();
    
    return(
        <div className="page-content-wrap">
        <FilterSearch
            hasFilter={true}
            searchTxt="Search providers name"
            childComponent={<SearchFiltersOptions/>}
            callback={fetchRequests}
            otherCtas={<button onClick={() => history("/app/terminals/new-terminal")} 
                className="btn form-action-btn">Create New Terminal</button>} />
        <div className="card-wrap">
            <div className="card-heading horizontal spread">
                <div className="heading-txt">Terminal <span className="sub-heading-txt active">0 record</span> </div>

            </div>
            <TableComponent
                hasCta={true}
                isEmptyRecords={true}
                ctaCallback={() => history("/app/terminals/new-terminal")}
                hasCtaText="Create New Terminal"
                emptyRecordsMessage='You have no terminal yet
                Click “Create new terminal” or "Import terminal" to get started'
                childComponent={<TerminalTable />}
            />
        </div>
    </div>
    )
}


export const TerminalWrap = ()=>{
    
    const screenResolution : WindowResolutions = useWindowSize();
    let breadcrumbs = "Terminal"
    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="Terminals" breadcrumbs={breadcrumbs} childComponent={<Terminal {...screenResolution} /> } />
    )
}