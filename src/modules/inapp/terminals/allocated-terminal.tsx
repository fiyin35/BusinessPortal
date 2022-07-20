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
                    <th>AGENT</th>
                    <th>ACCOUNT NUMBER</th>
                    <th>DATE ALLOCATED</th>
                    <th>ALLOCATED BY</th>
                    <th>DEVICE ID</th>
                    <th>TERMINAL</th>
                </tr>
            </thead>
            {/* <EmptyRecords /> */}
        </>
    )
}


const fetchRequests = () => {

}

const SearchFiltersOptions = () => {

    return (
        <div className="all-filter-options">
            
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
            childComponent={<SearchFiltersOptions/>}
            searchTxt="Search providers name"
            callback={fetchRequests}
            otherCtas={<button onClick={() => history("/app/terminals/allocate-new-terminal")} 
            className="btn form-action-btn">Allocate Terminal</button>} />

        <div className="card-wrap">
            <div className="card-heading horizontal spread">
                <div className="heading-txt">Terminal allocated <span className="sub-heading-txt active">0 records</span> </div>

            </div>
            <TableComponent
                hasCta={true}
                isEmptyRecords={true}
                ctaCallback={() => history("/app/terminals/allocate-new-terminal")}
                hasCtaText="Allocate Terminal"
                emptyRecordsMessage='You have no terminal allocated yet
                Click “Allocate Terminal” to get started'
                childComponent={<TerminalTable />}
            />
        </div>
    </div>
    )
}


export const AllocatedTerminalWrap = ()=>{
    
    const screenResolution : WindowResolutions = useWindowSize();
    let breadcrumbs = "Allocated Terminal"
    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="Terminals" breadcrumbs={breadcrumbs} childComponent={<Terminal {...screenResolution} /> } />
    )
}