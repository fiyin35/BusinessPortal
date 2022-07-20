import React, { useState, FunctionComponent, PropsWithChildren, ReactElement, useEffect } from "react";
import { Overlay, Popover, Button } from 'react-bootstrap'
// import  from 'react-bootstrap/Popover'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FilterSearchProps } from "../../../types";
import "./index.scss"
import Filter from "../../../assets/images/icons/filter.png"


type OwnProps = FilterSearchProps & ReturnType<typeof mapStateToProps>;

// export const FilterSearch: React.FC<FilterSearchProps> = (props) => {
const FilterSearch = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    
    const [show, setShow] = React.useState(false);
    const [target, setTarget] = React.useState(null);
    const ref = React.useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, onStartChange] = useState<any>();
    const [endDate, onEndChange] = useState<any>();
    const [dateOption, setDateOption] = useState<any>(1);

    const handleClick = (event: any) => {
        setShow(!show);
        setTarget(event.target);
    };
    const { filterTxt,
        callback,
        childComponent,
        canExportPdf,
        hasFilter,
        isFetching,
        searchTxt,
        otherCtas,
        filterOptions,
        exportPdfCallback } = props

    let params = `\
${filterOptions?.currentPage ? `?CurrentPage=${filterOptions.currentPage}` : ""}\
${filterOptions?.pageSize ? `&PageSize=${filterOptions.pageSize}` : ""}\
${searchTerm ? `&SearchText=${searchTerm.trim()}` : ""}\
${`&ReportPeriod=${dateOption}`}\
${startDate ? `&StartDate=${startDate.toISOString()}` : ""}\
${endDate ? `&EndDate=${startDate.toISOString()}` : ""}\
`

//  console.log("props", props.getAllBizUAccountsRequest)

    const SearchTxt = () => {

        return (
            <div className="filter-searchbar">
                <input value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                type="text" 
                className="form-control search-field" 
                placeholder={searchTxt ?? "Search"} />
            </div>
        )
    }

    const SearchFiltersOptions = () => {

        return (
            <div className="all-filter-options">
                {
                    filterOptions?.byDate &&
                    <div className="each-filter-option">
                        <label htmlFor="" className="filter-label">By Date</label>
                        <select value={dateOption} onChange={(e) => {
                            onStartChange(null)
                            onEndChange(null)
                            setDateOption(parseInt(e.target.value))
                        }} name="" id="">
                            <option value="1">Today</option>
                            <option value="2">Yesterday</option>
                            <option value="3">This Month</option>
                            <option value="0">Custom Date</option>
                        </select>
                    </div>
                }
                {
                    (filterOptions?.byDate && dateOption === 0) &&
                    <div className="each-filter-option">
                        <label htmlFor="" className="filter-label">Start Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: any) => {
                                onStartChange(date)
                            }}
                            // minDate={new Date("01-01-2021")}
                            maxDate={new Date()}
                            placeholderText="Start date"
                        />
                    </div>
                }

                {
                    (filterOptions?.byDate && dateOption === 0) &&
                    <div className="each-filter-option">
                        <label htmlFor="" className="filter-label">End Date</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date: any) => {
                                onEndChange(date)
                            }}
                            // minDate={new Date("01-01-2021")}
                            maxDate={new Date()}
                            placeholderText="End date"
                        />
                    </div>
                }
                {filterOptions?.byStatus &&
                    <div className="each-filter-option">
                        <label htmlFor="" className="filter-label">By Status code</label>
                        <select name="" id="">
                            <option value="all-time">All Time</option>
                        </select>
                    </div>
                }

                {filterOptions?.byAccount &&
                    <div className="each-filter-option">
                        <label htmlFor="" className="filter-label">By Business Account</label>
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                }

            </div>
        )
    }

    return (
        <div className="table-actions-wrap">
            <div className="filter-wrap">
               {SearchTxt()}
                {hasFilter &&
                    <div ref={ref}>
                        <Button className="action-gray" onClick={handleClick}>
                            {filterTxt ?? "Filter"}
                            <img src={Filter} alt="" />
                        </Button>

                        <Overlay
                            show={show}
                            target={target}
                            placement="bottom"
                            container={ref}
                            containerPadding={20}
                        // rootClose={true}
                        >
                            <Popover id="popover-contained">
                                <Popover.Body>
                                    {/* {childComponent} */}
                                    <SearchFiltersOptions />
                                    <button 
                                        disabled={isFetching}
                                        onClick={() => callback({ params })} 
                                        type="button" className="btn form-action-btn filter-btn">{filterTxt ?? "Filter"}</button>
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                }
            </div>
            <div className="other-ctas">
                {canExportPdf && <button onClick={exportPdfCallback} type="button" className="btn form-action-btn filter-btn">Export as PDF</button>}
                {otherCtas}
            </div>
        </div>

    )
}

const mapDispatchToProps = {};
  
  const mapStateToProps = (state: any) => ({
   
    getAllBizUAccountsRequest: state.myAccountsReducers.getAllBizUAccountsReducer,
   
  })

export default connect(mapStateToProps, mapDispatchToProps)(FilterSearch);