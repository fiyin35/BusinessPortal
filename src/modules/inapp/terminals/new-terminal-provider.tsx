import {InAppTemplate} from "../../../shared/templates/inapp";
import { useNavigate } from "react-router-dom";
import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"

import {WindowResolutions} from "../../../types"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import {NotificationAlert} from "../../../shared/components/toast-notification"

import { NewTerminalValues} from "../../../types"



let checkValidationSchema = Yup.object().shape({
    providerName: Yup.string()
        .required('Provider Name is Required'),
    providerServiceKey: Yup.string()
        .required('Provider Service Key is Required'),
    providerID: Yup.string()
        .required('ProviderID is Required'),
    description: Yup.string()
        .required('Description is Required'),
        
  });

  

const NewTerminalForm = ()=>{
    let  initialValues : NewTerminalValues = {
        providerName: "",
        providerServiceKey: "",
        providerID: 0,
        description: ""
      }
      let history = useNavigate();
    return(
        <div className="form-wrap for-cards">
            <Formik
                initialValues={initialValues}
                validationSchema ={checkValidationSchema}
                onSubmit={(values:  NewTerminalValues, actions) => {
                    // setFundingStatus("success")
                    
                }}
            >
                    {(props: FormikProps< NewTerminalValues>) => {
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
                                    <label htmlFor="providerName">Provider name</label>
                                    <div className={errors.providerName && touched.providerName ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.providerName}
                                            name="providerName"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.providerName && touched.providerName ?
                                                "is-invalid-input "
                                                : !errors.providerName && values.providerName !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="providerName" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="providerServiceKey"> Provider service key</label>
                                    <div className={errors.providerServiceKey && touched.providerServiceKey ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.providerServiceKey}
                                            name="providerServiceKey"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.providerServiceKey && touched.providerServiceKey ?
                                                "is-invalid-input "
                                                : !errors.providerServiceKey && values.providerServiceKey !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="providerServiceKey" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Provider ID</label>
                                    <div className={errors.providerID && touched.providerID ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.providerID}
                                            name="providerID"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.providerID && touched.providerID ?
                                                "is-invalid-input "
                                                : !errors.providerID && values.providerID !== 0 ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="providerID" className="form-input-error" component="div" />
                                </div>
                               
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <div className={errors.description ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.description}
                                            name="description"
                                            as="textarea"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.description && touched.description ?
                                                "is-invalid-input "
                                                : !errors.description && values.description !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="description" className="form-input-error" component="div" />
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
                <div className="bolden-title">New Terminal Provider</div>
            </div>
            <NewTerminalForm />
            
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

export const AddNewTerminalProvider = () =>{
    const screenResolution : WindowResolutions = useWindowSize();
    let breadcrumbs = "Terminal Provider"
    
    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="Terminal" breadcrumbs={breadcrumbs} childComponent={<FormContentWrap {...screenResolution} /> } />
    )
}