import React, { useState, FunctionComponent, PropsWithChildren, ReactElement, useEffect } from "react";
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../redux/actions/onboarding/outboud/access.actions"
import './index.scss';
import Logo from "../../assets/images/logo.png"
import { AlertMsg } from "../../shared/components/alert-msg"
import LogoSm from "../../assets/images/logo-sm.png"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { history } from "../../shared/_helpers/history";





type OwnProps = ReturnType<typeof mapStateToProps>;

export const ValidatePasswordOtpPage = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
  const dispatch = useDispatch();

  let isRenderAllowed = pageProps.forgotPasswordRequest?.request_status === "FORGOT_PASSWORD_SUCCESS";


  const progressStatus = () => {
    if (!pageProps.forgotPasswordRequest?.request_status) {
      history.replace("/account/sign-in")
    } else {

    }
  }
  useEffect(() => {
    progressStatus()
    dispatch(authActions.ValidatePasswordOtp("CLEAR"))
  }, [])

  let checkValidationSchema = Yup.object().shape({
    otp: Yup.string().trim()
      .required('Required'),

  });

  const LandingHeader = () => {

    return (
      <div className="landing-header">
        <div className="heading-wrap centered">
          <div className="logo-wrap ">
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
        </div>
      </div>
    )
  }

  const handleRequest = async (values: any) => {
    dispatch(authActions.ValidatePasswordOtp(values));
  };

  const OnboardingForm = () => {
    let initialValues: any = { otp: "" }

    let requestTrackingId = pageProps.forgotPasswordRequest.request_data.response.result.requestTrackingId;


    console.log("pageProps", pageProps);

    return (
      <div className="form-wrap login">
        <Formik
          initialValues={initialValues}
          validationSchema={checkValidationSchema}
          onSubmit={async (values) => {
            let { otp } = values;
            let payload = {
              otp,
              requestTrackingId
            }
            await handleRequest(payload)
          }}
        >
          {(props: FormikProps<any>) => {
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
                <div className="form-group">
                  <div className={errors.otp && touched.otp ? "invalid-input-wrap" : ""}>
                    <Field
                      value={values.otp}
                      id="otp"
                      name="otp"
                      type="text"
                      onChange={handleChange}
                      placeholder="Enter OTP"
                      className={`form-control ${errors.otp && touched.otp ?
                        "is-invalid-input "
                        : !errors.otp && values.otp !== "" ? "valid-input" : ""}`}
                    />
                  </div>
                  <ErrorMessage name="otp" className="form-input-error" component="div" />
                </div>
                {pageProps?.validatePasswordOtpRequest?.request_status
                  && pageProps.validatePasswordOtpRequest.request_status === "VALIDATE_PASSWORD_OTP_FAILURE" &&
                  <AlertMsg type="error" message={pageProps.validatePasswordOtpRequest?.request_data.error} />
                }
                <button
                  className={`btn form-btn full-width 
                                  ${Object.keys(errors).length === 0 && Object.keys(touched).length >= 1
                      ? " btn-main " : "btn-frozen"}`
                  }
                  disabled={pageProps.validatePasswordOtpRequest.is_request_processing }
                  type="submit">
                    {pageProps.validatePasswordOtpRequest.is_request_processing ? "Please wait..." : "Proceed"}
                  
                </button>
                <div className="form-link">
                  <Link to="/account/sign-in">Back to log in?</Link>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    )

  }

  const OnBoardingContent = () => {
    let pageHeadingTxt = pageProps.forgotPasswordRequest.request_data.response.message;
    return (
      <div className="onboarding-form-wrap half-center for-login">
        <div className="form-heading">
          <h2>Provide OTP</h2>
          <h4>{pageHeadingTxt}</h4>
        </div>
        <OnboardingForm />
      </div>
    )
  }





  if (isRenderAllowed) {
    return (
      <>
        <LandingHeader />
        <OnBoardingContent />
      </>
    );
  }else{
    return <></>
  }
};

const mapDispatchToProps = {
  validatePwOtp: authActions.ValidatePasswordOtp,
};

const mapStateToProps = (state: any) => ({
  // return {
  forgotPasswordRequest: state.onboardingOutboundReducers.forgotPasswordReducer,
  validatePasswordOtpRequest: state.onboardingOutboundReducers.validatePasswordOtpReducer,
  // confirmTenantRequest: state.authReducers.confirmTenantReducer

  // };
})
export default connect(mapStateToProps, mapDispatchToProps)(ValidatePasswordOtpPage);