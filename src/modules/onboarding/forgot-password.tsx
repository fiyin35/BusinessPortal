import React, { useState, FunctionComponent, PropsWithChildren, ReactElement, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../redux/actions/onboarding/outboud/access.actions"
import './index.scss';
import Logo from "../../assets/images/logo.png"
import LogoSm from "../../assets/images/logo-sm.png"
import { AlertMsg } from "../../shared/components/alert-msg"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { OnBoardingFormValues } from "../../types"



type OwnProps = ReturnType<typeof mapStateToProps>;

export const ForgotPasswordPage = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.ForgotPassword("CLEAR"))
    // dispatch(authActions.ValidatePasswordOtp("CLEAR"))
  }, [])

  let checkValidationSchema = Yup.object().shape({
    email: Yup.string().trim()
      // .email('Please provide valid email')
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
    dispatch(authActions.ForgotPassword(values));
  };

  const OnboardingForm = () => {
    let initialValues: OnBoardingFormValues = { email: "" }
    
   

  

    return (
      <div className="form-wrap login">
        <Formik
          initialValues={initialValues}
          validationSchema={checkValidationSchema}
          onSubmit={async (values) => {
            let { email } = values;
            let payload = {
              reference: email,
              resetOption: 0
              // resetOption: 1
            }
            await handleRequest(payload)
          }}
        >
          {(props: FormikProps<OnBoardingFormValues>) => {
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
                  <div className={errors.email && touched.email ? "invalid-input-wrap" : ""}>
                    <Field
                      value={values.email}
                      id="email"
                      name="email"
                      type="text"
                      onChange={handleChange}
                      placeholder="Email Address"
                      className={`form-control ${errors.email && touched.email ?
                        "is-invalid-input "
                        : !errors.email && values.email !== "" ? "valid-input" : ""}`}
                    />
                  </div>
                  <ErrorMessage name="email" className="form-input-error" component="div" />
                </div>
                {pageProps?.forgotPasswordRequest?.request_status
                  && pageProps.forgotPasswordRequest.request_status === "FORGOT_PASSWORD_FAILURE" &&
                  <AlertMsg type="error" message={pageProps.forgotPasswordRequest?.request_data.error} />
                }
                <button
                  className={`btn form-btn full-width 
                                  ${Object.keys(errors).length === 0 && Object.keys(touched).length >= 1
                              ? " btn-main " : "btn-frozen"}`
                            }
                  disabled={pageProps.forgotPasswordRequest?.is_request_processing}
                  type="submit">
                    {pageProps.forgotPasswordRequest.is_request_processing ? "Please wait..." : "Proceed"}
                  
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

    return (
      <div className="onboarding-form-wrap half-center for-login">
        <div className="form-heading">
          <h2>Forward Password</h2>
          <h4>Enter your email, we will send a reset code</h4>
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
  forgotPassword: authActions.ForgotPassword,
};

const mapStateToProps = (state: any) => ({
  // return {
    forgotPasswordRequest: state.onboardingOutboundReducers.forgotPasswordReducer,
  // confirmTenantRequest: state.authReducers.confirmTenantReducer

  // };
})
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);