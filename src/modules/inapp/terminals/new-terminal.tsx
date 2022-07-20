import {InAppTemplate} from "../../../shared/templates/inapp";
import { useNavigate } from "react-router-dom";
import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"

import {WindowResolutions} from "../../../types"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import {NotificationAlert} from "../../../shared/components/toast-notification"

import { TerminalProviderValues} from "../../../types"



let checkValidationSchema = Yup.object().shape({
    terminalProvider: Yup.string()
        .required('Required'),
    deviceName: Yup.string()
        .required('Required'),
    deviceID: Yup.string()
        .required('Required'),
    serialNumber: Yup.string()
        .required('Required'),
        
  });

  

const TerminalForm = ()=>{
    let  initialValues : TerminalProviderValues = {
        terminalProvider: "",
        deviceName: "",
        deviceID: 0,
        serialNumber: ""
      }
      let history = useNavigate();
    return(
        <div className="form-wrap for-cards">
            <Formik
                initialValues={initialValues}
                validationSchema ={checkValidationSchema}
                onSubmit={(values:  TerminalProviderValues, actions) => {
                    // setFundingStatus("success")
                    
                }}
            >
                    {(props: FormikProps< TerminalProviderValues>) => {
                        const {
                            values,
                            touched,
                            errors,
                            setFieldTouched,
                            handleChange,
                            setFieldValue,
                        } = props;
                        return (
                            <Form>
                                <div className="small-form-heading">Basic Details</div>

                                 <div className="form-group">
                                    <label htmlFor="terminalProvider">Terminal Provider</label>
                                    <div className={errors.terminalProvider && touched.terminalProvider ? "invalid-input-wrap" : ""}>
                                    <Field
                                        value={values.terminalProvider}
                                        name="gender"
                                        as="select"
                                        onChange={handleChange}
                                        className={`form-control inapp-input ${errors.terminalProvider && touched.terminalProvider ?
                                                    "is-invalid-input "
                                                        : !errors.terminalProvider && values.terminalProvider !== "" ? "valid-input" : ""}`}
                                        >

                                            <option value=""></option>
                                            <option value="1">Touchwise</option>
                                        </Field>
                                    </div>
                                    <ErrorMessage name="providerName" className="form-input-error" component="div" />
                                </div> 

                                <div className="form-group">
                                    <label htmlFor="deviceName"> Device Name</label>
                                    <div className={errors.deviceName && touched.deviceName ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.deviceName}
                                            name="deviceName"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.deviceName && touched.deviceName ?
                                                "is-invalid-input "
                                                : !errors.deviceName && values.deviceName !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="deviceName" className="form-input-error" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="firstName">Device ID</label>
                                    <div className={errors.deviceID && touched.deviceID ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.deviceID}
                                            name="deviceID"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.deviceID && values.deviceID !== 0 ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="deviceID" className="form-input-error" component="div" />
                                </div>
                               
                                <div className="form-group">
                                    <label htmlFor="serialNumber">Serial Number</label>
                                    <div className={errors.serialNumber ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.serialNumber}
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.serialNumber && touched.serialNumber ?
                                                "is-invalid-input "
                                                : !errors.serialNumber && values.serialNumber !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="serialNumber"  className="form-input-error" component="div" />
                                </div>
                            
                                
                                
                                <div className="form-ctas separated">
                                    <button className="btn form-btn btn-white" type="submit">Cancel</button>
                                    <button  type="submit"
                                        // className="btn form-btn btn-main"
                                        className={`btn form-btn 
                                            ${Object.keys(errors).length===0 && Object.keys(touched).length>=1
                                                ?" btn-main ":"btn-frozen"}`
                                        }
                                    >Create</button>
                                </div>
                            </Form>
                        )
                    }}

            </Formik>
        </div>
    )
}

const NewTerminalWrap = ()=>{
    return(
        <div className=" card-wrap">
            <div className="card-heading with-border">
                <div className="bolden-title">New Terminal</div>
            </div>
            <TerminalForm />
            
        </div>
    )
}
const FormContentWrap =(props:WindowResolutions)=>{
    let history = useNavigate();
    return(
        <div className="form-content-wrap">
            <div className="back-navigate" onClick={()=>history(-1)}> &lt; Back </div>
            <NewTerminalWrap />
        </div>
    )
}

export const AddNewTerminal = () =>{
    const screenResolution : WindowResolutions = useWindowSize();
    let breadcrumbs = "Terminal"
    
    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="Terminals" breadcrumbs={breadcrumbs} childComponent={<FormContentWrap {...screenResolution} /> } />
    )
}