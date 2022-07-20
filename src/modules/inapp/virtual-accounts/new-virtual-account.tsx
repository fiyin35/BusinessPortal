import { FunctionComponent,useCallback, useEffect, PropsWithChildren, ReactElement, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { InAppTemplate } from "../../../shared/templates/inapp";
import { useWindowSize } from "../../../hooks/useWindowSize";
import "../index.scss"
import PhoneInput from 'react-phone-input-2'
import calender from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { DatePickerField } from "../../../shared/_helpers/datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { accountActions } from "../../../redux/actions/in-app/accounts/accounts.action"

import { AlertMsg } from "../../../shared/components/alert-msg"
import { WindowResolutions } from "../../../types"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import {NotificationAlert} from "../../../shared/components/toast-notification"

import { NewVirtualAcctValues } from "../../../types"



type OwnProps = ReturnType<typeof mapStateToProps>;

const AddNewVirtualAccount = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const dispatch = useDispatch();
    const [dateOfBirth, onDateChange] = useState<any>();
    
    useEffect(() => {
        dispatch(accountActions.CreateAVirtualAccount("CLEAR"))

    }, [])


    const setDOB = useCallback((elm:any)=>{
        console.log("elm", elm);
       
            
            onDateChange(elm)
        
    },[])


    let checkValidationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is Required'),
        lastName: Yup.string()
            .required('Last Name is Required'),
        email: Yup.string(),
        // .email('Valid email is required'),
        phoneNumber: Yup.string(),
        // .required('Phone Number is Required'),
        dateOfBirth: Yup.string(),
        // .required('Required'),
        biometricID: Yup.string(),
        // .required('BiometricID is Required'),
        currency: Yup.string(),
        // .required('Currency is Required'),
        gender: Yup.string(),
        // .required('Gender is Required'),
        state: Yup.string(),
        // .required('State is Required'),
        address: Yup.string(),
        // .required('Address is Required'),
        preferedAccountName: Yup.string()
            .required('Prefered Account Name isRequired'),

    });


    const handleRequest = async (values: any) => {
        // authActions.Login(values);
        dispatch(accountActions.CreateAVirtualAccount(values));
        //  props.loginAction(values);
    };

    const NewVirtualAccountForm = () => {
        let requestInfo = pageProps.createAVirtualAccountRequest
        let initialValues: NewVirtualAcctValues = {
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            phoneNumber: "",
            dateOfBirth: "",
            // dateOfBirth: new Date(),
            state: "",
            address: "",
            gender: "",
            currency: "",
            biometricID: "",
            preferedAccountName: "",
        }
        let history = useNavigate();

        return (
            <div className="form-wrap for-cards">
                <Formik
                    initialValues={initialValues}
                    validationSchema={checkValidationSchema}
                    enableReinitialize={false}
                    onSubmit={
                        async (values: NewVirtualAcctValues, actions) => {
                            let {
                                firstName,
                                lastName,
                                middleName,
                                gender,
                                dateOfBirth,
                                preferedAccountName,
                                biometricID } = values;
                            let payload = {
                                createVirtualAccountRequestModels: [{
                                    firstName,
                                    lastName,
                                    middleName,
                                    dateOfBirth:dateOfBirth.toISOString(),
                                    gender,
                                    biometricId: biometricID,
                                    nameOnAccount: preferedAccountName
                                }]
                            }
                            console.log("payload",payload)
                            // await handleRequest(payload)
                        }}
                >
                    {(props: FormikProps<NewVirtualAcctValues>) => {
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
                                <div className="two-sides-form">
                                    <div>
                                        <div className="small-form-heading">Basic Details</div>
                                        <div className="form-items-wrap">
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
                                                        onChange={(handleChange)}
                                                        className={`form-control inapp-input ${errors.lastName && touched.lastName ?
                                                            "is-invalid-input "
                                                            : !errors.lastName && values.lastName !== "" ? "valid-input" : ""}`}
                                                    />
                                                </div>
                                                <ErrorMessage name="lastName" className="form-input-error" component="div" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="firstName">Middle name</label>
                                                <div className={errors.middleName && touched.middleName ? "invalid-input-wrap" : ""}>
                                                    <Field
                                                        value={values.middleName}
                                                        name="middleName"
                                                        type="text"
                                                        onChange={handleChange}
                                                        className={`form-control inapp-input ${errors.middleName && touched.middleName ?
                                                            "is-invalid-input "
                                                            : !errors.middleName && values.middleName !== "" ? "valid-input" : ""}`}
                                                    />
                                                </div>
                                                <ErrorMessage name="middleName" className="form-input-error" component="div" />
                                            </div>
                                            {/* email */}
                                            {/* <div className="form-group">
                                                <label htmlFor="Email">Email (optional)</label>
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
                                            </div> */}


                                            {/* Date of birth */}
                                            <div className="form-group">
                                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                                <div className={errors.dateOfBirth && touched.dateOfBirth ? "invalid-input-wrap" : ""}>
                                                    {/* <calender.Control type="date" name='date_of_birth' className={`form-control inapp-input ${errors.dateOfBirth && touched.dateOfBirth ?
                                                        "is-invalid-input "
                                                        : !errors.dateOfBirth ? "valid-input" : ""}`} /> */}

                                                    {/* <DatePicker
                                                        selected={dateOfBirth}
                                                        onChange={setDOB}
                                                        className="form-control inapp-input"
                                                        // minDate={new Date("01-01-2021")}
                                                        maxDate={new Date()}
                                                        placeholderText="Start date"
                                                    /> */}
                                                    <DatePickerField 
                                                        maxDate={new Date()}
                                                        className="form-control inapp-input" 
                                                        name="dateOfBirth" />
                                                </div>
                                                <ErrorMessage name="dateOfBirth" className="form-input-error" component="div" />
                                            </div>

                                            {/* gender */}
                                            <div className="form-group">
                                                <label htmlFor="gender">Gender</label>
                                                <div className={errors.gender && touched.gender ? "invalid-input-wrap" : ""}>
                                                    <Field
                                                        value={values.gender}
                                                        name="gender"
                                                        as="select"
                                                        onChange={handleChange}
                                                        className={`form-control inapp-input ${errors.gender && touched.gender ?
                                                            "is-invalid-input "
                                                            : !errors.gender && values.gender !== "" ? "valid-input" : ""}`}
                                                    >

                                                        <option value=""></option>
                                                        <option value="1">Male</option>
                                                        <option value="2">Female</option>
                                                    </Field>
                                                </div>
                                                <ErrorMessage name="gender" className="form-input-error" component="div" />
                                            </div>

                                            {/* phone number */}
                                            {/* <div className="form-group">
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

                                                </div>
                                                <ErrorMessage name="phoneNumber" className="form-input-error" component="div" />
                                            </div> */}

                                        </div>
                                    </div>

                                    <div>
                                        <div className="small-form-heading">Account Details</div>
                                        <div className="form-items-wrap">

                                            <div className="form-group">
                                                <label htmlFor="preferedAccountName">Prefered account name</label>
                                                <div className={errors.preferedAccountName && touched.preferedAccountName ? "invalid-input-wrap" : ""}>
                                                    <Field
                                                        value={values.preferedAccountName}
                                                        name="preferedAccountName"
                                                        type="text"
                                                        onChange={handleChange}
                                                        className={`form-control inapp-input ${errors.preferedAccountName && touched.preferedAccountName ?
                                                            "is-invalid-input "
                                                            : !errors.preferedAccountName && values.preferedAccountName !== "" ? "valid-input" : ""}`}
                                                    />
                                                </div>
                                                <ErrorMessage name="preferedAccountName" className="form-input-error" component="div" />
                                            </div>

                                            {/* state*/}
                                            {/* <div className="form-group">
                                                <label htmlFor="state">State</label>
                                                <div className={errors.state && touched.state ? "invalid-input-wrap" : ""}>
                                                    <Field
                                                        value={values.state}
                                                        name="state"
                                                        as="select"
                                                        onChange={handleChange}
                                                        className={`form-control inapp-input ${errors.state && touched.state ?
                                                            "is-invalid-input "
                                                            : !errors.state && values.state !== "" ? "valid-input" : ""}`}
                                                    >

                                                        <option value=""></option>
                                                        <option value="1">Lagos</option>
                                                        <option value="2">Abuja</option>
                                                    </Field>
                                                </div>
                                                <ErrorMessage name="state" className="form-input-error" component="div" />
                                            </div> */}

                                            {/* BiometricID */}
                                            <div className="form-group">
                                                <label htmlFor="biometricID">Biometric ID</label>
                                                <div className={errors.biometricID && touched.biometricID ? "invalid-input-wrap" : ""}>
                                                    <Field
                                                        value={values.biometricID}
                                                        name="biometricID"
                                                        type="text"
                                                        onChange={handleChange}
                                                        className={`form-control inapp-input ${errors.biometricID && touched.biometricID ?
                                                            "is-invalid-input "
                                                            : !errors.biometricID ? "valid-input" : ""}`}
                                                    />
                                                </div>
                                                <ErrorMessage name="account" className="form-input-error" component="div" />
                                            </div>

                                            {/* Address */}
                                            {/* <div className="form-group">
                                                <label htmlFor="address">Address</label>
                                                <div className={errors.address && touched.address ? "invalid-input-wrap" : ""}>
                                                    <Field
                                                        value={values.address}
                                                        name="address"
                                                        type="text"
                                                        onChange={handleChange}
                                                        className={`form-control inapp-input ${errors.address && touched.address ?
                                                            "is-invalid-input "
                                                            : !errors.address && values.address !== "" ? "valid-input" : ""}`}
                                                    />
                                                </div>
                                                <ErrorMessage name="address" className="form-input-error" component="div" />
                                            </div> */}

                                            {/* Currency */}
                                            {/* <div className="form-group">
                                                <label htmlFor="currency">Currency</label>
                                                <div className={errors.currency && touched.currency ? "invalid-input-wrap" : ""}>
                                                    <Field
                                                        value={values.currency}
                                                        name="currency"
                                                        as="select"
                                                        onChange={handleChange}
                                                        className={`form-control inapp-input ${errors.currency && touched.currency ?
                                                            "is-invalid-input "
                                                            : !errors.currency && values.currency !== "" ? "valid-input" : ""}`}
                                                    >

                                                        <option value=""></option>
                                                        <option value="1">NGN</option>

                                                    </Field>
                                                </div>
                                                <ErrorMessage name="currency" className="form-input-error" component="div" />
                                            </div> */}
                                            {pageProps?.createAVirtualAccountRequest?.request_status
                                                && pageProps.createAVirtualAccountRequest.request_status === "CREATE_NEW_VIRTUAL_FAILURE" &&
                                                <AlertMsg type="error" message={pageProps.createAVirtualAccountRequest?.request_data.error} />
                                            }

                                            {pageProps?.createAVirtualAccountRequest?.request_status
                                                && pageProps.createAVirtualAccountRequest.request_status === "CREATE_NEW_VIRTUAL_SUCCESS" &&
                                                <AlertMsg type="success" message={pageProps.createAVirtualAccountRequest?.request_data.error} />
                                            }
                                            <div className="form-ctas separated">
                                                <button className="btn form-btn btn-white" type="submit">Cancel</button>
                                                <button type="submit"
                                                    // className="btn form-btn btn-main"
                                                    disabled={requestInfo.is_request_processing}
                                                    className={`btn form-btn 
                                            ${Object.keys(errors).length === 0 && Object.keys(touched).length >= 1
                                                            ? " btn-main " : "btn-frozen"}`
                                                    }
                                                >{requestInfo.is_request_processing ? "Please wait.." : "Create"}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </Form>
                        )
                    }}

                </Formik>
            </div>
        )
    }

    const NewVirtualAccountWrap = () => {
        return (
            <div className=" card-wrap">
                <div className="card-heading with-border">
                    <div className="bolden-title">New Virtual Account</div>
                </div>
                <NewVirtualAccountForm />

            </div>
        )
    }
    const FormContentWrap = (props: WindowResolutions) => {
        let history = useNavigate();
        return (
            <>
            <div className="form-content-wrap full-width">
                <div className="back-navigate" onClick={() => history(-1)}> &lt; Back </div>
                <NewVirtualAccountWrap />
            </div>
            </>
        )
    }


    const screenResolution: WindowResolutions = useWindowSize();
    let breadcrumbs = "Create New Account"
    return (
        <InAppTemplate breadcrumbs={breadcrumbs} hasSearchBar={false} pageHeadingTitle="Virtual Account" childComponent={<FormContentWrap {...screenResolution} />} />
    )
}
const mapDispatchToProps = {
    // getAllVirtualAccounts: accountActions.GetAllVirtualAccounts,
};

const mapStateToProps = (state: any) => {

    return {
        createAVirtualAccountRequest: state.myAccountsReducers.createAVirtualAccountReducer,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewVirtualAccount);