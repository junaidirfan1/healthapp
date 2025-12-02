import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

function EmployeeDetail() {
    const { state } = useLocation();
    const { item } = state

    console.log("item", item)
    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Employee Management"} currentPage={"Employee Management"} />
                {/* <div className="managment-action-btns">
                    <button className="action-button">Save</button>
                </div> */}
            </div>

            <div className="form-container">
                <div className="company-details-container">
                    <div className="company-details-row">
                        <div className="company-details">
                            <h3>
                                Employee Details
                            </h3>
                        </div>
                    </div>
                    <div className="company-info-container">
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Company</p>
                                        <p>Erk Tehcnologies</p>
                                    </li>

                                    <li>
                                        <p>Employee Name:</p>
                                        <p>Imran Naveed Qureshi</p>
                                    </li>

                                    <li>
                                        <p>Contact Number:</p>
                                        <p>92 000 000 0000 </p>
                                    </li>

                                    <li>
                                        <p>Email Address:</p>
                                        <p>imran-naveed-8852@gmail.com</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Designation:</p>
                                        <p>IT Support Manager</p>
                                    </li>

                                    <li>
                                        <p>Date of Birth:</p>
                                        <p>15/05/1984</p>
                                    </li>

                                    <li>
                                        <p>CNIC Number:</p>
                                        <p>12345-6789012-3</p>
                                    </li>

                                    <li>
                                        <p>Policy Date Initiation Date:</p>
                                        <p>15/05/2025</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="contact-person-detail-row">
                        <div className="contact-person">
                            <p>Dependents Details</p>
                        </div>
                        {/* <div className="contact-action-button">
                                        <button className="action-button">Add More</button>
                                    </div> */}
                    </div>
                    <div className="row dependents-details-row">
                        <div className="col-md-6">
                            <div className="company-info-container">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Full Name:</p>
                                        <p>Imran Naveed Qureshi </p>
                                    </li>

                                    <li>
                                        <p>Relationship:</p>
                                        <p>Wife</p>
                                    </li>

                                    <li>
                                        <p>CNIC/B-Form:</p>
                                        <p>12345-6789012-3</p>
                                    </li>

                                    <li>
                                        <p>Age:</p>
                                        <p>35 Years</p>
                                    </li>

                                    <li>
                                        <p>Gender:</p>
                                        <p>Female</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="company-info-container">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Full Name:</p>
                                        <p>Imran Naveed Qureshi </p>
                                    </li>

                                    <li>
                                        <p>Relationship:</p>
                                        <p>Wife</p>
                                    </li>

                                    <li>
                                        <p>CNIC/B-Form:</p>
                                        <p>12345-6789012-3</p>
                                    </li>

                                    <li>
                                        <p>Age:</p>
                                        <p>35 Years</p>
                                    </li>

                                    <li>
                                        <p>Gender:</p>
                                        <p>Female</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="company-info-container">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Full Name:</p>
                                        <p>Imran Naveed Qureshi </p>
                                    </li>

                                    <li>
                                        <p>Relationship:</p>
                                        <p>Wife</p>
                                    </li>

                                    <li>
                                        <p>CNIC/B-Form:</p>
                                        <p>12345-6789012-3</p>
                                    </li>

                                    <li>
                                        <p>Age:</p>
                                        <p>35 Years</p>
                                    </li>

                                    <li>
                                        <p>Gender:</p>
                                        <p>Female</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="company-info-container">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Full Name:</p>
                                        <p>Imran Naveed Qureshi </p>
                                    </li>

                                    <li>
                                        <p>Relationship:</p>
                                        <p>Wife</p>
                                    </li>

                                    <li>
                                        <p>CNIC/B-Form:</p>
                                        <p>12345-6789012-3</p>
                                    </li>

                                    <li>
                                        <p>Age:</p>
                                        <p>35 Years</p>
                                    </li>

                                    <li>
                                        <p>Gender:</p>
                                        <p>Female</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="company-details-horizontal-line"></div>

                    <div className="contact-person-detail-row">
                        <div className="contact-person">
                            <p>Bank Details</p>
                        </div>
                    </div>

                    <div className="row dependents-details-row">
                        <div className="col-md-6">
                            <div className="company-info-container">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Bank Name:</p>
                                        <p>Bank Al Habib Limited</p>
                                    </li>

                                    <li>
                                        <p>Branch:</p>
                                        <p>Shahra-e-Faisal</p>
                                    </li>

                                    <li>
                                        <p>Account Title:</p>
                                        <p>Imran Naveed Qureshi</p>
                                    </li>

                                    <li>
                                        <p>Account Number:</p>
                                        <p>0000 0000 0000 0000</p>
                                    </li>
                                    <li>
                                        <p>IBAN Number:</p>
                                        <p>PK65BAHL0000001123456702</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="otp-config-info">
                        <div className="go-back-btn">
                            <Link to={"/EmployeeManagment"}>
                                <button className="action-button">Go Back</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EmployeeDetail