import React from "react";
import { Link } from "react-router-dom";

import './index.scss';
import  Logo from "../../assets/images/logo.png"
import  LogoSm from "../../assets/images/logo-sm.png"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {OnBoardingFormValues} from "../../types"




let checkValidationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().required('Required').when("password", {
    is: (val: string | any[]) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    )
  })

});

const LandingHeader = ()=>{
  return(
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

const OnboardingForm = ()=>{
  let  initialValues :OnBoardingFormValues = {password:"", confirmPassword:""}
  return(
        <div className="form-wrap login">
          <Formik
            initialValues={initialValues}
            validationSchema ={checkValidationSchema}
            onSubmit={(values: OnBoardingFormValues, actions) => {
             
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
                <div className={errors.password && touched.password ? "invalid-input-wrap": ""}>
                  <Field
                    value={values.password}
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                    className={`form-control ${errors.password && touched.password ?
                      "is-invalid-input "
                      : !errors.password && values.password !== "" ? "valid-input" : ""}`}
                  />
                </div>
                <ErrorMessage name="password" className="form-input-error" component="div" />
              </div>
              <div className="form-group">
                <div className={errors.confirmPassword && touched.confirmPassword ? "invalid-input-wrap": ""}>
                  <Field
                    value={values.confirmPassword}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className={`form-control ${errors.confirmPassword && touched.confirmPassword ?
                      "is-invalid-input "
                      : !errors.confirmPassword && values.confirmPassword !== "" ? "valid-input" : ""}`}
                  />
                </div>
                <ErrorMessage name="confirmPassword" className="form-input-error" component="div" />
              </div>
              <button 
                className={`btn form-btn full-width 
                                  ${Object.keys(errors).length===0 && Object.keys(touched).length>=1
                                     ?" btn-main ":"btn-frozen"}`
                            }
                type="submit">
                  Create Password
              </button>
            </Form>
          )
        }}
          </Formik>
        </div>
  )

}

const OnBoardingContent = ()=>{
  return(
    <div className="onboarding-form-wrap half-center for-login">
        <div className="form-heading">
          <h2>Set Password</h2>
          <h4>Create a new password</h4>
        </div>
        <OnboardingForm/>
    </div>
  )
}





export const SetPasswordPage = () => {
  return (
        <>
          <LandingHeader/>
          <OnBoardingContent/>
        </>
  );
};