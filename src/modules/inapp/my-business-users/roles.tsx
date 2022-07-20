import { useState } from "react";
import {InAppTemplate} from "../../../shared/templates/inapp";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {WindowResolutions} from "../../../types"
import {Tab, Nav, Row, Col, Modal} from 'react-bootstrap'
import Users from "../../../assets/images/icons/users.png"
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {NewRolesValues} from "../../../types"


let checkValidationSchema = Yup.object().shape({
    role: Yup.string()
        .required('Required'),
    desc: Yup.string()
        .required('Required'),
        
  });

const NewRoleModal =(props:{show:boolean;handleClose:any; })=>{
    
    let initialValues: NewRolesValues = {
        role: "",
        desc: "",
    }

    return(
        <>
           
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="spread">
                        Create Custom Role
                        {/* <div className="close-cta">
                            <img src={CloseModal} alt="" />
                        </div> */}
                    </Modal.Title>
                </Modal.Header>
                <Formik
                initialValues={initialValues}
                validationSchema ={checkValidationSchema}
                onSubmit={(values: NewRolesValues, actions) => {
                    // setFundingStatus("success")
                    
                }}
            >
                    {(props: FormikProps<NewRolesValues>) => {
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
                                        <label htmlFor="role">Role</label>
                                        <div className={errors.role && touched.role ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.role}
                                                name="role"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.role && touched.role ?
                                                    "is-invalid-input "
                                                    : !errors.role && values.role !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="role" className="form-input-error" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="firstName">Role Description</label>
                                        <div className={errors.desc && touched.desc ? "invalid-input-wrap" : ""}>
                                            <Field
                                                value={values.desc}
                                                name="desc"
                                                type="text"
                                                onChange={handleChange}
                                                className={`form-control inapp-input ${errors.desc && touched.desc ?
                                                    "is-invalid-input "
                                                    : !errors.desc && values.desc !== "" ? "valid-input" : ""}`}
                                            />
                                        </div>
                                        <ErrorMessage name="desc" className="form-input-error" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label">Role Access</div>
                                        <label htmlFor="create" className="check-label">
                                            <Field
                                                name="access"
                                                id="create"
                                                type="checkbox"
                                                value="Can create virtual accounts"
                                                // onChange={handleChange}
                                                className="form-control"
                                            // className={`form-control inapp-input ${errors.desc && touched.desc ?
                                            //     "is-invalid-input "
                                            //     : !errors.desc && values.desc !== "" ? "valid-input" : ""}`}
                                            />Can create virtual accounts
                                        </label>
                                        <label htmlFor="manage" className="check-label">
                                            <Field
                                                name="access"
                                                id="manage"
                                                type="checkbox"
                                                value="Can create virtual accounts"
                                                // onChange={handleChange}
                                                className="form-control"
                                            // className={`form-control inapp-input ${errors.desc && touched.desc ?
                                            //     "is-invalid-input "
                                            //     : !errors.desc && values.desc !== "" ? "valid-input" : ""}`}
                                            />Can manage virtual accounts
                                        </label>
                                        {/*<div className={errors.desc && touched.desc ? "invalid-input-wrap" : ""}>
                                             <Field
                                                name="desc"
                                                type="checkbox"
                                                value="Can create virtual accounts"
                                                onChange={handleChange}
                                                className="form-control"
                                                // className={`form-control inapp-input ${errors.desc && touched.desc ?
                                                //     "is-invalid-input "
                                                //     : !errors.desc && values.desc !== "" ? "valid-input" : ""}`}
                                            />
                                        </div> */}
                                        {/* <ErrorMessage name="desc" className="form-input-error" component="div" /> */}
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
                                    >Create</button>
                                </Modal.Footer>

                            </Form>
                        )
                    }}

            </Formik>
                
                
            </Modal>
        </>
  
    )
}

const AllRoles=()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div className="roles-info">
            <NewRoleModal show={show} handleClose={handleClose} />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <div className="each-role-section">
                            <div className="role-section-titlte">Default Roles</div>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Admin</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">IT specialist</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Operational</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Support</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className="each-role-section">
                            <div className="role-section-titlte">Custom Roles</div>
                            <div className="no-roles">
                                <div className="noroles-txt">You have no active custom role</div>
                                <button onClick={handleShow} className="btn add-custom">Create custom role </button>
                            </div>
                        </div>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className="role-details-wrap">
                                    <div className="role-name">Admin</div>
                                    <div className="role-desc">This role grants users the permissions to manage everything on the dashboard</div>
                                    <div className="role-users">
                                        <div className="heading-title">Users with this roles</div>
                                        <div className="each-user">
                                            <img src={Users} alt="" />
                                            <div className="user-name">Eniola Adegbuyi</div>
                                        </div>
                                        <div className="each-user">
                                            <img src={Users} alt="" />
                                            <div className="user-name">Jacob Jones</div>
                                        </div>
                                        <div className="each-user">
                                            <img src={Users} alt="" />
                                            <div className="user-name">Eleanor Pena</div>
                                        </div>
                                    </div>
                                    <div className="role-rights">
                                        <div className="rights-title">Role access</div>
                                        <div className="eachrole-right">Can create virtual account</div>
                                        <div className="eachrole-right">Can view virtual account</div>
                                        <div className="eachrole-right">Can manage virtual account</div>
                                        <div className="eachrole-right">Can manage terminals</div>
                                    </div>
                                    
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className="role-details-wrap">
                                    <div className="role-name">IT Specialist</div>
                                    <div className="role-desc">This role grants users the permissions to manage everything on the dashboard</div>
                                    <div className="role-users">
                                        <div className="heading-title">Users with this roles</div>
                                        <div className="each-user">
                                            <img src={Users} alt="" />
                                            <div className="user-name">Eniola Adegbuyi</div>
                                        </div>
                                        <div className="each-user">
                                            <img src={Users} alt="" />
                                            <div className="user-name">Jacob Jones</div>
                                        </div>
                                        <div className="each-user">
                                            <img src={Users} alt="" />
                                            <div className="user-name">Eleanor Pena</div>
                                        </div>
                                    </div>
                                    <div className="role-rights">
                                        <div className="rights-title">Role access</div>
                                        <div className="eachrole-right">Can create virtual account</div>
                                        <div className="eachrole-right">Can view virtual account</div>
                                        <div className="eachrole-right">Can manage virtual account</div>
                                        <div className="eachrole-right">Can manage terminals</div>
                                    </div>

                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

const ManageRoles=(props:WindowResolutions)=>{
    return(
        <div className="page-content-wrap full-page">
            <div className="card-wrap">
                <div className="card-heading with-border">
                    <div className="bolden-title">Manage Roles</div>
                </div>
                <AllRoles />
            </div>
        </div>
    )
}


export const RolesManagement = ()=>{
    const screenResolution : WindowResolutions = useWindowSize();
    
    return(
        <InAppTemplate  hasSearchBar={false} pageHeadingTitle="User Management" childComponent={<ManageRoles {...screenResolution} /> } />
    )
}