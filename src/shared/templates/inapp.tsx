import  React,{useState}  from 'react';
import SideBar from "../components/sidebar"
import {AppHeader} from "../components/inapp-header"
import {useWindowSize} from "../../hooks/useWindowSize";
import { ChildrenCompProps } from "../../types";
import "./inapp.scss"







export const InAppTemplate : React.FC<ChildrenCompProps> = (props) =>{
    const screenResolution = useWindowSize();
    const [shouldDisplaySideBar, setSiderBarVisibility] = useState(false)

    const {childComponent, pageHeadingTitle, hasSearchBar,activeBreadcrumbs, breadcrumbs} =  props;

    const updateSiderVisibilty = ()=>{
        // if(setSiderBarVisibility(true)) {
        //     return true;
        // }
        // if(screenResolution.width <= 1024){

        // }
        setSiderBarVisibility(!shouldDisplaySideBar)
        return shouldDisplaySideBar;
        
    }
    let headingProps = {
        pageHeadingTitle : pageHeadingTitle,
        screenResolution,
        callback: updateSiderVisibilty,
        hasSearchBar,
        breadcrumbs,
        activeBreadcrumbs
    }
    return(
        <div className="inapp-wrap">
            {(screenResolution.width >= 1025 || shouldDisplaySideBar) 
                && <SideBar {...headingProps}/>
            }
            <div className="page-main-content">
                <AppHeader {...headingProps}/>
                {childComponent}
            </div>
        </div>
    )
}