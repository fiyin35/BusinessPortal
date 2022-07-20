import React, { FunctionComponent, PropsWithChildren, useContext, ReactElement, useEffect } from "react";

import { authActions } from "../../redux/actions/onboarding/outboud/access.actions"
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './index.scss';
import Logo from "../../assets/images/logo.png"
import LogoSm from "../../assets/images/logo-sm.png"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { OnBoardingFormValues, ILoginProps } from "../../types"
import { AlertMsg } from "../../shared/components/alert-msg"
import { useDispatch } from 'react-redux'


const LOGIN_URL = `api/BusinessProfile/login`


type OwnProps = ILoginProps & ReturnType<typeof mapStateToProps>;

const SignInPage = (pageProps: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.Login("CLEAR"))
    dispatch(authActions.Logout())
  }, [])
  // 
  let checkValidationSchema = Yup.object().shape({
    userName: Yup.string().trim()
      .email('Valid email is required')
      .required('Required'),
    password: Yup.string()
      .required('Required'),

  });

  const handleLogin = async (values: any) => {
    dispatch(authActions.Login(values));
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
            Don’t have an account?
            <Link className="linked-cta" to="/account/sign-up">Sign Up</Link>
          </div>
        </div>
      </div>
    )
  }

  const OnboardingForm = (props: any) => {
    let initialValues: OnBoardingFormValues = { userName: "", password: "" }






    return (
      <div className="form-wrap login">
        <Formik
          initialValues={initialValues}
          validationSchema={checkValidationSchema}
          onSubmit={async (values) => {
            let { userName, password } = values;
            let payload = {
              userName,
              password
            }
            await handleLogin(payload)
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
                  <div className={errors.userName && touched.userName ? "invalid-input-wrap" : ""}>
                    <Field
                      value={values.userName}
                      id="userName"
                      name="userName"
                      type="text"
                      onChange={handleChange('userName')}
                      placeholder="Email Address"
                      className={`form-control ${errors.userName && touched.userName ?
                        "is-invalid-input "
                        : !errors.userName && values.userName !== "" ? "valid-input" : ""}`}
                    />
                  </div>
                  <ErrorMessage name="userName" className="form-input-error" component="div" />
                </div>
                <div className="form-group">
                  <div className={errors.password && touched.password ? "invalid-input-wrap" : ""}>
                    <Field
                      id="password"
                      value={values.password}
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className={`form-control ${errors.password && touched.password ?
                        "is-invalid-input "
                        : values.password !== "" ? "valid-input" : ""}`}
                    />
                  </div>
                  <ErrorMessage name="password" className="form-input-error" component="div" />
                </div>
                {pageProps?.loginRequest?.request_status
                  && pageProps.loginRequest.request_status === "LOGIN_USER_FAILURE" &&
                  <AlertMsg type="error" message={pageProps.loginRequest?.request_data.error} />
                }
                <button
                  className={`btn form-btn full-width 
                                  ${((Object.keys(errors).length === 0 && Object.keys(touched).length >= 1)
                    )
                      ? " btn-main " : "btn-frozen"}`
                  }
                  disabled={pageProps.loginRequest?.is_request_processing}
                  type="submit">

                  {pageProps.loginRequest.is_request_processing ? "Please wait..." : "Login"}
                </button>
                <div className="form-link">
                  <Link to="/account/forgot-password">Forgot your password?</Link>
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
          <h2>Welcome back</h2>
          <h4>Login to your dashboard </h4>
        </div>
        <OnboardingForm />
      </div>
    )
  }





  // console.log(" props here=>", pageProps)
  // export const SignInPage = () => {
  return (
    <>
      <LandingHeader />
      <OnBoardingContent />
    </>
  );
};




const mapDispatchToProps = {
  loginAction: authActions.Login,
};

const mapStateToProps = (state: any) => ({
  // return {
  loginRequest: state.onboardingOutboundReducers.loginReducer,
  // confirmTenantRequest: state.authReducers.confirmTenantReducer

  // };
})



export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);