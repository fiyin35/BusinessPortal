import React, { useState, FunctionComponent, PropsWithChildren, ReactElement, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2'
import { authActions } from "../../redux/actions/onboarding/outboud/access.actions"
import { connect, useDispatch } from 'react-redux';
import 'react-phone-input-2/lib/bootstrap.css'
import { Link } from "react-router-dom";
import './index.scss';
import Logo from "../../assets/images/logo.png"
import LogoSm from "../../assets/images/logo-sm.png"
import { Formik, Form, Field, FormikProps, ErrorMessage, } from 'formik';
import * as Yup from 'yup';

import { OnBoardingFormValues } from "../../types"
import { async } from "rxjs";
import {AlertMsg} from "../../shared/components/alert-msg"



type OwnProps = OnBoardingFormValues & ReturnType<typeof mapStateToProps>;
const SignUpPage = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.SignUp("CLEAR"))
  }, [])

  let checkValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Required'),
    lastName: Yup.string()
      .required('Required'),
    bizName: Yup.string()
      .required('Required'),
    country: Yup.string()
      .required('Required'),
    email: Yup.string().trim()
      .email('Use a valid email')
      .required('Required'),
    phoneNumber: Yup.string()
      .required('Required'),
    bizAddr: Yup.string()
      .required('Required'),
    howHear: Yup.string()
      .required('Required'),

  });

  


  const handleRequest = async (values: any) => {
    // authActions.Login(values);
    dispatch(authActions.SignUp(values));
    //  props.loginAction(values);
  };

  const LandingHeader = () => {
    return (
      <div className="landing-header">
        <div className="heading-wrap">
          <div className="logo-wrap">
            <Link to="/">
              <picture>
                <source
                  srcSet={LogoSm}
                  media="(max-width: 1024px)"
                />
                <source
                  srcSet={Logo}
                  media="(min-width: 1025px)"
                />
                <img
                  src={Logo}
                  alt="Banklingo Logo"
                />
              </picture>
            </Link>
          </div>
          <div className="header-cta">
            Already have an account?
            <Link className="linked-cta" to="/account/sign-in">Sign In</Link>
          </div>
        </div>
      </div>
    )
  }

  const OnboardingForm = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    let initialValues: OnBoardingFormValues = {
      firstName: "",
      lastName: "",
      bizName: "",
      country: "",
      email: "",
      phoneNumber: "",
      howHear: "",
      bizAddr: ""
    }

    // console.log("pageProps.signUpRequest",pageProps.signUpRequest)

    return (
      <div className="form-wrap others">
        <Formik
          initialValues={initialValues}
          validationSchema={checkValidationSchema}
          onSubmit={async (values: OnBoardingFormValues, actions) => {
           
            let { firstName, 
                lastName, bizName, 
                country, email, 
                phoneNumber,bizAddr, 
                howHear } = values;
            let payload = {
              emailAddress: email,
              countryCode: country,
              mobileNumber: phoneNumber,
              firstName,
              lastName,
              businessName: bizName,
              businessAddress: bizAddr,
              howYouHeard: howHear
            }
            await handleRequest(payload)
          }}
        >
          {(props: FormikProps<OnBoardingFormValues>) => {
            const {
              values,
              touched,
              errors,
              setFieldValue,
              setFieldTouched,
              // handleBlur,
              handleChange,
              // isSubmitting,
            } = props;

            return (
              <Form>
                <div className="double-inputs">
                  <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <div className={errors.firstName && touched.firstName ? "invalid-input-wrap" : ""}>
                      <Field
                        value={values.firstName}
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={handleChange}
                        className={`form-control ${errors.firstName && touched.firstName ?
                          "is-invalid-input "
                          : !errors.firstName && values.firstName !== "" ? "valid-input" : ""}`}
                      />
                    </div>
                    <ErrorMessage name="firstName" className="form-input-error" component="div" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <div className={errors.lastName && touched.lastName ? "invalid-input-wrap" : ""}>
                      <Field
                        value={values.lastName}
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        className={`form-control ${errors.lastName && touched.lastName ?
                          "is-invalid-input "
                          : !errors.lastName && values.lastName !== "" ? "valid-input" : ""}`}
                      />
                    </div>
                    <ErrorMessage name="lastName" className="form-input-error" component="div" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="bizName">Business name</label>
                  <div className={errors.bizName && touched.bizName ? "invalid-input-wrap" : ""}>
                    <Field
                      value={values.bizName}
                      id="bizName"
                      name="bizName"
                      type="text"
                      onChange={handleChange}
                      className={`form-control ${errors.bizName && touched.bizName ?
                        "is-invalid-input "
                        : !errors.bizName && values.bizName !== "" ? "valid-input" : ""}`}
                    />
                  </div>
                  <ErrorMessage name="bizName" className="form-input-error" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="bizAddr">Business address</label>
                  <div className={errors.bizAddr && touched.bizAddr ? "invalid-input-wrap" : ""}>
                    <Field
                      value={values.bizAddr}
                      id="bizAddr"
                      name="bizAddr"
                      type="text"
                      onChange={handleChange}
                      className={`form-control ${errors.bizAddr && touched.bizAddr ?
                        "is-invalid-input "
                        : !errors.bizAddr && values.bizAddr !== "" ? "valid-input" : ""}`}
                    />
                  </div>
                  <ErrorMessage name="bizAddr" className="form-input-error" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
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
                  {/* <div className={errors.country && touched.country ? "invalid-input-wrap" : ""}>
                    <Field
                      value={values.country}
                      id="country"
                      name="country"
                      type="text"
                      onChange={handleChange}
                      className={`form-control ${errors.country && touched.country ?
                        "is-invalid-input "
                        : !errors.country && values.country !== "" ? "valid-input" : ""}`}
                    />
                  </div> */}
                  <ErrorMessage name="country" className="form-input-error" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className={errors.email && touched.email ? "invalid-input-wrap" : ""}>
                    <Field
                      value={values.email}
                      id="email"
                      name="email"
                      type="text"
                      onChange={handleChange}
                      className={`form-control ${errors.email && touched.email ?
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
                  <label htmlFor="howHear">How did you hear about us?</label>
                  <div className={errors.howHear && touched.howHear ? "invalid-input-wrap" : ""}>
                    <Field
                      value={values.howHear}
                      id="howHear"
                      name="howHear"
                      type="text"
                      onChange={handleChange}
                      className={`form-control ${errors.howHear && touched.howHear ?
                        "is-invalid-input "
                        : !errors.howHear && values.howHear !== "" ? "valid-input" : ""}`}
                    />
                  </div>
                  <ErrorMessage name="howHear" className="form-input-error" component="div" />
                </div>
                <div className="terms-msg">
                  By clicking ‘Create Account’ and using  you agree to <span>Terms of Use and Privacy Policy.</span>
                </div>

                  {pageProps.signUpRequest?.request_status 
                    && pageProps.signUpRequest.request_status==="SIGNUP_FAILURE" &&
                    <AlertMsg type="error" message={pageProps.signUpRequest?.request_data.error } />
                  }
                <button
                  className={`btn form-btn full-width 
                                  ${Object.keys(errors).length === 0 && Object.keys(touched).length >= 1
                      ? " btn-main " : "btn-frozen"}`
                  }
                  disabled={pageProps.signUpRequest?.is_request_processing}
                  type="submit">
                    {pageProps.signUpRequest.is_request_processing ? "Please wait..." : "Create Account"}
                  
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
    )

  }

  const OnBoardingContent = () => {
    return (
      <div className="onboarding-form-wrap half-center for-others">
        <div className="form-heading">
          <h2>Sign up</h2>
          <h4>Create an account for your business  </h4>
        </div>
        <OnboardingForm />
      </div>
    )
  }


  return (
    <>
      <LandingHeader />
      <OnBoardingContent />
    </>
  );
};

const mapDispatchToProps = {
  signupAction: authActions.SignUp,
};

const mapStateToProps = (state: any) => ({
  // return {
  signUpRequest: state.onboardingOutboundReducers.signUpReducer,
  // confirmTenantRequest: state.authReducers.confirmTenantReducer

  // };
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);