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
                    <th>PROVIDER NAME</th>
                    <th>PROVIDER SERVICE KEY</th>
                    <th>PROVIDER ID</th>
                    <th>DESCRIPTION</th>
                    <th>ACTION</th>
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


const TerminalProvider = (props:WindowResolutions)=>{
    let history = useNavigate();
    
    return(
        <div className="page-content-wrap">
        <FilterSearch
            childComponent={<SearchFiltersOptions/>}
            searchTxt="Search accounts"
            callback={fetchRequests}
            otherCtas={<button onClick={() => history("/app/terminals/new-terminal-provider")} 
                className="btn form-action-btn">Create Terminal Provider</button>} />
        <div className="card-wrap">
            <div className="card-heading horizontal spread">
                <div className="heading-txt">Terminal Providers <span className="sub-heading-txt active">0 record</span> </div>

            </div>
            <TableComponent
                hasCta={true}
                isEmptyRecords={true}
                ctaCallback={() => history("/app/terminals/new-terminal-provider")}
                hasCtaText="Create Terminal Provider"
                emptyRecordsMessage="You have no terminal provider yet
                Click “Create terminal provider” to get started"
                childComponent={<TerminalTable />}
            />
        </div>
    </div>
    )
}


export const TerminalProviderWrap = ()=>{
    
    const screenResolution : WindowResolutions = useWindowSize();
    let breadcrumbs = "Terminal Provider"
    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="Terminals" breadcrumbs={breadcrumbs} childComponent={<TerminalProvider {...screenResolution} /> } />
    )
}