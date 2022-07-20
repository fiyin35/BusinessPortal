import {InAppTemplate} from "../../../shared/templates/inapp";

import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"


import {WindowResolutions} from "../../../types"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import {NotificationAlert} from "../../../shared/components/toast-notification"

import {FundWalletValues} from "../../../types"
// import { useState } from "react";


let checkValidationSchema = Yup.object().shape({
    business: Yup.string()
        .required('Required'),
    account: Yup.string()
        .required('Required'),
    unit: Yup.string()
        .required('Required'),
    charge: Yup.string()
        .required('Required'),
        
  });

  

const FundWalletForm = ()=>{
    let  initialValues :FundWalletValues = {
        business:"",
        account:"",
        unit:"",
        charge:"", 
      }
    // const [fundingStatus, setFundingStatus] =  useState("");
    //   const notify = () => toast("This business has been funded with 1200 unit!");
    return(
        <div className="form-wrap for-cards">
            <Formik
                initialValues={initialValues}
                validationSchema ={checkValidationSchema}
                onSubmit={(values: FundWalletValues, actions) => {
                    // setFundingStatus("success")
                    
                }}
            >
                    {(props: FormikProps<FundWalletValues>) => {
                        const {
                            values,
                            touched,
                            errors,
                            // handleBlur,
                            handleChange,
                            // isSubmitting,
                        } = props;
                        return (
                            <Form>
                                <div className="small-form-heading">Basic Details</div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Business</label>
                                    <div className={errors.business && touched.business ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.business}
                                            name="business"
                                            as="select"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.business && touched.business ?
                                                "is-invalid-input "
                                                : !errors.business && values.business !== "" ? "valid-input" : ""}`}
                                        >
                                            
                                            <option value=""></option>
                                            <option value="1">Business 1</option>
                                            <option value="2">Business 2</option>
                                        </Field>
                                    </div>
                                    <ErrorMessage name="business" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Account</label>
                                    <div className={errors.account && touched.account ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.account}
                                            name="account"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.account && touched.account ?
                                                "is-invalid-input "
                                                : !errors.account && values.account !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="business" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Units</label>
                                    <div className={errors.unit && touched.unit ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.unit}
                                            name="unit"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.unit && touched.unit ?
                                                "is-invalid-input "
                                                : !errors.unit && values.unit !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="unit" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Charge</label>
                                    <div className={errors.charge && touched.charge ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.charge}
                                            name="charge"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.charge && touched.charge ?
                                                "is-invalid-input "
                                                : !errors.charge && values.charge !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="charge" className="form-input-error" component="div" />
                                </div>
                                <div className="form-ctas separated">
                                    <button className="btn form-btn btn-white" type="submit">Cancel</button>
                                    <button className="btn form-btn btn-main" type="submit">Fund</button>
                                </div>
                            </Form>
                        )
                    }}

            </Formik>
            {/* {fundingStatus==="success" &&
                <NotificationAlert
                    type ={fundingStatus}
                    hasheader={true}
                    notifyId="343"
                    headerText={"Business Validation Wallet"}
                    isTriggered={true}
                    message={"This business has been funded with 1200units"}
                />
            } */}
        </div>
    )
}

const FundWalletWrap = (props:WindowResolutions)=>{
    return(
        <div className="fund-wallet-wrap card-wrap">
            <div className="card-heading with-border">
                <div className="fund-wallet-txt">Fund Validation Wallet</div>
            </div>
            <FundWalletForm />
            
        </div>
    )
}

export const FundIdentityVerify = () =>{
    const screenResolution : WindowResolutions = useWindowSize();
    let breadcrumbs = "Fund Validation Wallet"
    return(
        <InAppTemplate breadcrumbs={breadcrumbs} hasSearchBar={false} pageHeadingTitle="Identity Validation" childComponent={<FundWalletWrap {...screenResolution} /> } />
    )
}