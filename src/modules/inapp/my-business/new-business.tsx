import { useState, FunctionComponent, PropsWithChildren, ReactElement, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { InAppTemplate } from "../../../shared/templates/inapp";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2'
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { bizActions } from "../../../redux/actions/in-app/my-business/mybiz.actions"
import "../index.scss"

import { AlertMsg } from "../../../shared/components/alert-msg"
import { WindowResolutions } from "../../../types"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import {NotificationAlert} from "../../../shared/components/toast-notification"

import { NewBizValues } from "../../../types"

type OwnProps = NewBizValues & ReturnType<typeof mapStateToProps> ;
const AddNewBusiness = (pageProps?: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bizActions.AddNewBiz("CLEAR"))
    }, [])

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
        bizName: Yup.string()
            .required('Required'),
        // state: Yup.string()
        //     .required('Required'),
        address: Yup.string()
            .required('Required'),
        // account: Yup.string()
        //     .required('Required'),

    });


    const handleRequest = async (values: any) => {
        // authActions.Login(values);
        dispatch(bizActions.AddNewBiz(values));
        //  props.loginAction(values);
    };

    // console.log("pageProps", pageProps)


    const NewBusinessForm = () => {
        const [selectedCountry, setSelectedCountry] = useState("");
        let initialValues: NewBizValues = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            bizName: "",
            state: "",
            country: "",
            address: "",
            account: "",
            howHear: ""
        }
        let history = useNavigate();
        return (
            <div className="form-wrap for-cards">
                <Formik
                    initialValues={initialValues}
                    validationSchema={checkValidationSchema}
                    onSubmit={async (values: NewBizValues, actions) => {
                        let { firstName,
                            lastName, bizName,
                            country, email,
                            phoneNumber, address,
                            howHear } = values;
                        let payload = {
                            emailAddress: email,
                            countryCode: country,
                            mobileNumber: phoneNumber,
                            firstName,
                            lastName,
                            businessName: bizName,
                            businessAddress: address,
                            howYouHeard: howHear
                        }
                        await handleRequest(payload)
                        // console.log("payload", payload)

                    }}
                >
                    {(props: FormikProps<NewBizValues>) => {
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
                                        <div className="small-form-heading">Contact Details</div>
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

                                                </div>
                                                <ErrorMessage name="phoneNumber" className="form-input-error" component="div" />
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <div className="small-form-heading">Business Details</div>
                                        <div className="form-items-wrap">
                                            <div className="form-group">
                                                <label htmlFor="bizName">Business name</label>
                                                <div className={errors.bizName && touched.bizName ? "invalid-input-wrap" : ""}>
                                                    <Field
                                                        value={values.bizName}
                                                        name="bizName"
                                                        type="text"
                                                        onChange={handleChange}
                                                        className={`form-control inapp-input ${errors.bizName && touched.bizName ?
                                                            "is-invalid-input "
                                                            : !errors.bizName && values.bizName !== "" ? "valid-input" : ""}`}
                                                    />
                                                </div>
                                                <ErrorMessage name="bizName" className="form-input-error" component="div" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="state">Country</label>
                                                <ReactFlagsSelect
                                                    selected={selectedCountry}
                                                    searchable={true}
                                                    className={`form-control with-internal ${errors.country && touched.country ?
                                                        "is-invalid-input "
                                                        : !errors.country && values.country !== "" ? "valid-input" : ""}`}
                                                    onSelect={(code) => {
                                                        setSelectedCountry(code)
                                                        setFieldTouched("country", true)
                                                        setFieldValue("country", code)
                                                    }}
                                                />
                                                {/* <div className={errors.state && touched.state ? "invalid-input-wrap" : ""}>
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
                                                </div> */}
                                                <ErrorMessage name="country" className="form-input-error" component="div" />
                                                {/* <ErrorMessage name="state" className="form-input-error" component="div" /> */}
                                            </div>
                                            <div className="form-group">
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
                                            </div>
                                            {/* <div className="form-group">
                                                <label htmlFor="account">Account number</label>
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
                                                <ErrorMessage name="account" className="form-input-error" component="div" />
                                            </div> */}

                                            {pageProps?.addNewBizRequest?.request_status
                                                && pageProps.addNewBizRequest.request_status === "ADD_NEW_BIZ_FAILURE" &&
                                                <AlertMsg type="error" message={pageProps.addNewBizRequest?.request_data.error} />
                                            }

                                            {pageProps?.addNewBizRequest?.request_status
                                                && pageProps.addNewBizRequest.request_status === "ADD_NEW_BIZ_SUCCESS" &&
                                                <AlertMsg type="success" message={pageProps.addNewBizRequest?.request_data.error} />
                                            }

                                            <div className="form-ctas separated">
                                                <button className="btn form-btn btn-white" type="submit">Cancel</button>
                                                <button type="submit"
                                                    // className="btn form-btn btn-main"
                                                    className={`btn form-btn 
                                                                ${Object.keys(errors).length === 0 && Object.keys(touched).length >= 1
                                                            ? " btn-main " : "btn-frozen"}`
                                                    }
                                                >Create</button>
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

    const NewBUsinessWrap = () => {
        return (
            <div className=" card-wrap">
                <div className="card-heading with-border">
                    <div className="bolden-title">New Business</div>
                </div>
                <NewBusinessForm />

            </div>
        )
    }
    const FormContentWrap = (props: WindowResolutions) => {
        let history = useNavigate();
        return (
            <div className="form-content-wrap full-width">
                <div className="back-navigate" onClick={() => history(-1)}> &lt; Back </div>
                <NewBUsinessWrap />
            </div>
        )
    }


    const screenResolution: WindowResolutions = useWindowSize();
    let breadcrumbs = "Create Business"
    return (
        <InAppTemplate breadcrumbs={breadcrumbs} hasSearchBar={false} pageHeadingTitle="Business Registration" childComponent={<FormContentWrap {...screenResolution} />} />
    )
}

const mapDispatchToProps = {
    // signupAction: authActions.SignUp,
};

const mapStateToProps = (state: any) => ({
    // return {
    addNewBizRequest: state.bizUserReducers.addNewBizReducer,
    // confirmTenantRequest: state.authReducers.confirmTenantReducer

    // };
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewBusiness);