import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { InAppTemplate } from "../../../shared/templates/inapp";

import { useWindowSize } from "../../../hooks/useWindowSize";
import "../index.scss"
import { Modal } from 'react-bootstrap'

import { WindowResolutions } from "../../../types"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';



import ApproveIcon from "../../../assets/images/icons/done.png"
import EditIcon from "../../../assets/images/icons/edit.png"
import DisableIcon from "../../../assets/images/icons/remove.png"
import DeleteIcon from "../../../assets/images/icons/delete.png"
import NgnIcon from "../../../assets/images/icons/ngn-tag.png"

import { ActivateBorderlessValues, FundBorderlessValues, GatewayDetailsValues } from "../../../types"





const EnableBorderlessModal = (props: { show: boolean; handleClose: any; }) => {
    let borderlessValidationSchema = Yup.object().shape({
        currency: Yup.string()
            .required('Required'),
        max: Yup.string()
            .required('Required'),

    });

    let initialValues: ActivateBorderlessValues = {
        currency: "",
        max: "",
    }

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="spread">
                        Borderless transcation
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={borderlessValidationSchema}
                    onSubmit={(values: ActivateBorderlessValues, actions) => {
                        // setFundingStatus("success")

                    }}
                >
                    {(props: FormikProps<ActivateBorderlessValues>) => {
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
                                <Modal.Body>
                                    <div className="form-group">
                                        <label htmlFor="currency">Select currency</label>
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
                                                <option value="1">NGN</option>
                                                <option value="2">USD</option>
                                                <option value="3">POUNDS</option>
                                                <option value="4">CAD</option>
                                            </Field>
                                        </div>
                                        <ErrorMessage name="currency" className="form-input-error" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="max">Max. trading Amount</label>
                                        <div className={errors.max && touched.max ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.max}
                                                name="max"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.max && touched.max ?
                                                    "is-invalid-input "
                                                    : !errors.max && values.max !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="max" className="form-input-error" component="div" />
                                    </div>

                                </Modal.Body>

                                <Modal.Footer className="form-ctas separated">
                                    <button className="btn form-btn btn-white" type="submit">Cancel</button>
                                    <button type="submit"
                                        // className="btn form-btn btn-main"
                                        className={`btn form-btn 
                                            ${Object.keys(errors).length === 0 && Object.keys(touched).length >= 1
                                                ? " btn-main " : "btn-frozen"}`
                                        }
                                    >Enable</button>
                                </Modal.Footer>

                            </Form>
                        )
                    }}

                </Formik>


            </Modal>
        </>

    )
}

const GatewayModal = (props: { show: boolean; handleClose: any; }) => {
    let borderlessValidationSchema = Yup.object().shape({
        url: Yup.string()
            .required('Required'),
        clientId: Yup.string()
            .required('Required'),
        clientSecret: Yup.string()
            .required('Required'),
        nonce: Yup.string()
            .required('Required'),

    });

    let initialValues: GatewayDetailsValues = {
        url: "",
        clientId: "",
        clientSecret: "",
        nonce: "",
    }

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="spread">
                        Update Gateway Settings
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={borderlessValidationSchema}
                    onSubmit={(values: GatewayDetailsValues, actions) => {
                        // setFundingStatus("success")

                    }}
                >
                    {(props: FormikProps<GatewayDetailsValues>) => {
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
                                <Modal.Body>

                                    <div className="form-group">
                                        <label htmlFor="url"> Gateway URL</label>
                                        <div className={errors.url && touched.url ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.url}
                                                name="url"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.url && touched.url ?
                                                    "is-invalid-input "
                                                    : !errors.url && values.url !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="url" className="form-input-error" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="clientId"> Client ID</label>
                                        <div className={errors.clientId && touched.clientId ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.clientId}
                                                name="clientId"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.clientId && touched.clientId ?
                                                    "is-invalid-input "
                                                    : !errors.clientId && values.clientId !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="clientId" className="form-input-error" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="clientSecret"> Client Secret</label>
                                        <div className={errors.clientSecret && touched.clientSecret ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.clientSecret}
                                                name="clientSecret"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.clientSecret && touched.clientSecret ?
                                                    "is-invalid-input "
                                                    : !errors.clientSecret && values.clientSecret !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="clientSecret" className="form-input-error" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nonce"> Nonce</label>
                                        <div className={errors.nonce && touched.nonce ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.nonce}
                                                name="nonce"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.nonce && touched.nonce ?
                                                    "is-invalid-input "
                                                    : !errors.nonce && values.nonce !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="nonce" className="form-input-error" component="div" />
                                    </div>

                                </Modal.Body>

                                <Modal.Footer className="form-ctas separated">
                                    <button className="btn form-btn btn-white" type="submit">Cancel</button>
                                    <button type="submit"
                                        // className="btn form-btn btn-main"
                                        className={`btn form-btn 
                                            ${Object.keys(errors).length === 0 && Object.keys(touched).length >= 1
                                                ? " btn-main " : "btn-frozen"}`
                                        }
                                    >Update</button>
                                </Modal.Footer>

                            </Form>
                        )
                    }}

                </Formik>


            </Modal>
        </>

    )
}

const FundGatewayModal = (props: { show: boolean; handleClose: any; }) => {
    let borderlessValidationSchema = Yup.object().shape({
        amount: Yup.string()
            .required('Required'),
        ref: Yup.string()
            .required('Required'),
        narration: Yup.string()
            .required('Required'),

    });

    let initialValues: FundBorderlessValues = {
        amount: "",
        ref: "",
        narration: "",
    }

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="spread">
                        Fund Border Wallet
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={borderlessValidationSchema}
                    onSubmit={(values: FundBorderlessValues, actions) => {
                        // setFundingStatus("success")

                    }}
                >
                    {(props: FormikProps<FundBorderlessValues>) => {
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
                                <Modal.Body>

                                    <div className="form-group">
                                        <label htmlFor="amount"> Amount (NGN)</label>
                                        <div className={errors.amount && touched.amount ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.amount}
                                                name="amount"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.amount && touched.amount ?
                                                    "is-invalid-input "
                                                    : !errors.amount && values.amount !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="amount" className="form-input-error" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ref"> Reference</label>
                                        <div className={errors.ref && touched.ref ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.ref}
                                                name="ref"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.ref && touched.ref ?
                                                    "is-invalid-input "
                                                    : !errors.ref && values.ref !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="clientId" className="form-input-error" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="narration"> Narration</label>
                                        <div className={errors.narration && touched.narration ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.narration}
                                                name="narration"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.narration && touched.narration ?
                                                    "is-invalid-input "
                                                    : !errors.narration && values.narration !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="clientSecret" className="form-input-error" component="div" />
                                    </div>
                                </Modal.Body>

                                <Modal.Footer className="form-ctas separated">
                                    <button className="btn form-btn btn-white" type="submit">Cancel</button>
                                    <button type="submit"
                                        // className="btn form-btn btn-main"
                                        className={`btn form-btn 
                                            ${Object.keys(errors).length === 0 && Object.keys(touched).length >= 1
                                                ? " btn-main " : "btn-frozen"}`
                                        }
                                    >Fund</button>
                                </Modal.Footer>

                            </Form>
                        )
                    }}

                </Formik>


            </Modal>
        </>

    )
}

const BusinessSummary = () => {
    return (
        <div className=" card-wrap business-summary">
            <div className="card-heading">
                <div className="bolden-title">Business Details</div>
            </div>
            <div className="each-business-summary basic">
                <div className="summary-heading">Basic Details</div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Full Name</div>
                    <div className="biz-info-detail">Eniola Adegbuyi</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Phone number</div>
                    <div className="biz-info-detail">+234 906 6216 280</div>
                </div>
            </div>
            <div className="each-business-summary others">
                <div className="summary-heading">Business Details</div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Business name</div>
                    <div className="biz-info-detail">Mayor Tech Services</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Account ID</div>
                    <div className="biz-info-detail">23892910</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Bank Account</div>
                    <div className="biz-info-detail">1423823092</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Business Level</div>
                    <div className="biz-info-detail">Level 1</div>
                </div>
                <div className="each-biz-info">
                    <div className="biz-info-title">Address</div>
                    <div className="biz-info-detail">10, Alhaji muniru close, Bode thomas, Surulere, Lagos</div>
                </div>
            </div>
        </div>
    )
}

const BorderlesNotEnabled = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <div className="borderless-not-enabled">
            <EnableBorderlessModal show={show} handleClose={handleClose} />
            <div className="borderless-heading">Cross Border</div>
            <div className="borderless-msg">Allow businesses carry ou bordless transcation</div>
            <button type="button" onClick={() => setShow(true)} className="borderless-cta btn">Enable Borderless Transaction </button>
        </div>
    )
}

const BorderlesEnabled = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <div className="borderless-balances">
            <FundGatewayModal show={show} handleClose={handleClose} />
            <div className="borderless-bal-heading">
                <div className="title-txt">
                    Cross Border Wallet
                    <div className="wallet-bal"> &#x20A6;0.00</div>
                </div>
                <div className="bal-currency">
                    <img src={NgnIcon} alt="" />
                </div>
            </div>
            <div className="fund-wallet">
                <button type="button" onClick={() => setShow(true)} className="fund-btn btn">Fund Wallet</button>
            </div>

        </div>
    )
}
const GateWayInfo = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <>
            <GatewayModal show={show} handleClose={handleClose} />
            <div className="gateway-info-wrap card-wrap">
                <div className="card-heading">
                    <div className="bolden-title">Gateway Details</div>
                </div>
                <div className="each-business-summary mt-0">
                    <div className="each-biz-info">
                        <div className="biz-info-title">Gateway URL</div>
                        <div className="biz-info-detail">Nil</div>
                    </div>
                    <div className="each-biz-info">
                        <div className="biz-info-title">Client ID</div>
                        <div className="biz-info-detail">Nill</div>
                    </div>
                    <div className="each-biz-info">
                        <div className="biz-info-title">Client Secret</div>
                        <div className="biz-info-detail">Nill</div>
                    </div>
                    <div className="each-biz-info">
                        <div className="biz-info-title">Nonce</div>
                        <div className="biz-info-detail">Nill</div>
                    </div>
                </div>
                <div className="update-gateway">
                    <button type="button" onClick={() => setShow(true)} className="update-btn btn">Update Gateway settings</button>
                </div>
            </div>
            <div className="see-xhange">
                Set Exchange Rate? Click here to Cross Border
            </div>
        </>
    )
}
const BorderlessSummary = () => {
    return (
        <div className="busines-borderless">
            <BorderlesNotEnabled />
            <BorderlesEnabled />
            <GateWayInfo />
        </div>
    )
}

const BusinessInfo = () => {
    return (

        <div className="business-info-wrap">
            <BusinessSummary />
            <BorderlessSummary />
        </div>
    )
}


const BusinessDetailsContent = (props: WindowResolutions) => {
    let history = useNavigate();
    return (
        <div className="form-content-wrap full-width">
            <div className="top-actions">
                <div className="back-navigate" onClick={() => history(-1)}> &lt; Back </div>
                <div className="other-actions">
                    <button className="btn action-btn">
                        Edit
                        <img src={EditIcon} alt="" />
                    </button>
                    <button className="btn action-btn">
                        Approve
                        <img src={ApproveIcon} alt="" />
                    </button>
                    <button className="btn action-btn">
                        Disable
                        <img src={DisableIcon} alt="" />
                    </button>
                    <button className="btn action-btn delete">
                        Delete
                        <img src={DeleteIcon} alt="" />
                    </button>
                </div>
            </div>

            <BusinessInfo />
        </div>
    )
}

export const BusinessDetailsWrap = () => {

    const screenResolution: WindowResolutions = useWindowSize();
    return (
        <InAppTemplate hasSearchBar={false} pageHeadingTitle="Business Registration" childComponent={<BusinessDetailsContent {...screenResolution} />} />
    )
}