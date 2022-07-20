import {InAppTemplate} from "../../../shared/templates/inapp";
import { useNavigate } from "react-router-dom";
import {useWindowSize} from "../../../hooks/useWindowSize";
import "../index.scss"
import PhoneInput from 'react-phone-input-2'

import {WindowResolutions} from "../../../types"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import {NotificationAlert} from "../../../shared/components/toast-notification"

import {NewUserValues} from "../../../types"
import {useState, useContext} from 'react';
import AuthContext from "../../../context/AuthProvider";
import axios from '../../../api/index'
const ADDNEWUSER_URL = `/api/BusinessProfile/addnewbusinessuser`



let checkValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Required'),
    lastName: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Valid email is required')
        .required('Required'),
    phoneNumber: Yup.string()
        .required('Required'),
    businessRoleId: Yup.string()
        .required('Required'),
        
  });

  

const NewUserForm = ()=>{
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { auth } = useContext(AuthContext)

    let  initialValues :NewUserValues = {
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:"", 
        businessRoleId: 0, 
      }
      let history = useNavigate();
    return(
        <div className="form-wrap for-cards">
            <Formik
                initialValues={initialValues}
                validationSchema ={checkValidationSchema}
                onSubmit={ async (values: NewUserValues, actions) => {
                    // setFundingStatus("success")
                    console.log(auth)
                    const response = await axios.post(ADDNEWUSER_URL, values,
                        {
                            headers: { 'Content-Type': 'application/json',
                            Authorization: `${auth?.accessToken}`} 
                        }
                        ).then(() => {
                            setSuccessMsg('New business user added successfully');

                        })
                        .catch((error) => {
                            if(!error?.response) {
                                setErrorMsg('No Server Response');
                              } else if(error.response?.status === 400) {
                                  setErrorMsg('Incorrect ');
                              } else if(error.response?.status === 401) {
                                setErrorMsg('Unauthorized')
                              } else {
                                setErrorMsg('Unable to login, please try again')
                              }
                        })

                    
                }}
            >
                    {(props: FormikProps<NewUserValues>) => {
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
                                <div className="small-form-heading">Contact Details</div>
                                <div className="form-group">
                                    <label htmlFor="firstName">First name</label>
                                    <div className={errors.firstName && touched.firstName ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.firstName}
                                            name="firstName"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.firstName && touched.firstName ?
                                                "is-invalid-input "
                                                : !errors.firstName && values.firstName !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="firstName" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Last name</label>
                                    <div className={errors.lastName && touched.lastName ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.lastName}
                                            name="lastName"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.lastName && touched.lastName ?
                                                "is-invalid-input "
                                                : !errors.lastName && values.lastName !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="lastName" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Email</label>
                                    <div className={errors.email && touched.email ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.email}
                                            name="email"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.email && touched.email ?
                                                "is-invalid-input "
                                                : !errors.email && values.email !== "" ? "valid-input" : ""}`}
                                        />
                                    </div>
                                    <ErrorMessage name="email" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone number</label>

                                    <div className={errors.phoneNumber && touched.phoneNumber ? "invalid-input-wrap" : ""}>
                                        <PhoneInput
                                            country={'ng'}
                                            enableTerritories={false}
                                            enableSearch={true}
                                            disableSearchIcon={true}
                                            inputClass={errors.phoneNumber && touched.phoneNumber ?
                                                "is-invalid-input "
                                                : !errors.phoneNumber && values.phoneNumber !== "" ? "valid-input" : ""}
                                            value={values.phoneNumber}
                                            onChange={(phone: string): void => {

                                                setFieldTouched("phoneNumber", true)
                                                setFieldValue("phoneNumber", phone)
                                            }}
                                        />
                                        {/* <Field
                      value={values.phoneNumber}
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      onChange={handleChange}
                      className={`form-control ${errors.phoneNumber && touched.phoneNumber ?
                        "is-invalid-input "
                        : !errors.phoneNumber && values.phoneNumber !== "" ? "valid-input" : ""}`}
                    /> */}
                                    </div>
                                    <ErrorMessage name="phoneNumber" className="form-input-error" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Role</label>
                                    <div className={errors.businessRoleId && touched.businessRoleId ? "invalid-input-wrap" : ""}>
                                        <Field
                                            value={values.businessRoleId}
                                            name="businessRoleId"
                                            as="select"
                                            onChange={handleChange}
                                            className={`form-control inapp-input ${errors.businessRoleId && touched.businessRoleId ?
                                                "is-invalid-input "
                                                : !errors.businessRoleId && values.businessRoleId !== 0 ? "valid-input" : ""}`}
                                        >
                                            
                                            <option value=""></option>
                                            <option value="1">Role 1</option>
                                            <option value="2">Role 2</option>
                                        </Field>
                                    </div>
                                    <ErrorMessage name="businessRoleId" className="form-input-error" component="div" />
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

const NewUserWrap = ()=>{
    return(
        <div className=" card-wrap">
            <div className="card-heading with-border">
                <div className="bolden-title">New User</div>
            </div>
            <NewUserForm />
            
        </div>
    )
}
const FormContentWrap =(props:WindowResolutions)=>{
    let history = useNavigate();
    return(
        <div className="form-content-wrap">
            <div className="back-navigate" onClick={()=>history(-1)}> &lt; Back </div>
            <NewUserWrap />
        </div>
    )
}

export const AddNewUser = () =>{
    const screenResolution : WindowResolutions = useWindowSize();
    
    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="User Management" childComponent={<FormContentWrap {...screenResolution} /> } />
    )
}