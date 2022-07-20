import * as React from 'react';
import {Overlay, Popover, Button} from 'react-bootstrap'
// import  from 'react-bootstrap/Popover'
import { RowActionsProps } from "../../../types";
import "./index.scss"
import  RowAction from "../../../assets/images/icons/row-action.png"




export const RowActionDrop : React.FC<RowActionsProps> =(props)=>{
    const [show, setShow] = React.useState(false);
    const [target, setTarget] = React.useState(null);
    const ref = React.useRef(null);

    const handleClick = (event: any) => {
        setShow(!show);
        setTarget(event.target);
    };
    const{childComponent, className} = props

    return(
        <div className={`row-actions-wrap ${className}`}>
                
                    <div ref={ref}>
                        <Button className="action-gray row-action-trigger" onClick={handleClick}>
                            <img src={RowAction} alt="" />
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
                                    {childComponent}
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                
        </div>

    )
}