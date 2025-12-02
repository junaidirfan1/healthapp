import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import switchOn from "../../assets/images/switch-on.svg"
import switchOff from "../../assets/images/switch-off.svg"
import InputField from "../../components/InputField"
import useErrorHandlingHook from '../../hooks/useErrorHandlingHook'
import { validationRules } from '../../utils/Validations'
import Breadcrumbs from '../../components/Breadcrumbs'

const contactPersons = [
    {
        fullName: "Imran Naveed Qureshi",
        contactNumber: "92 000 000 0000",
        emailAddress: "imran-naveed-8852@gmail.com",
        description: "---"
    },
    {
        fullName: "Madiha Imran Qureshi",
        contactNumber: "92 000 000 0000",
        emailAddress: "madiha-naveed-22@gmail.com",
        description: "---"
    },

]

function CompanyRegistraion() {
    const [isActive, setIsActive] = useState(false);

    const { state } = useLocation();
    const { item } = state

    const validationSchema = {
        fullName: [validationRules.required("fullName")],
        contactNumber: [validationRules.required("contactNumber"),],
        emailAddress: [validationRules.required("emailAddress")],
        description: [validationRules.required("description")],
    }
    const { apiData, setterForApiData, checkForError, } = useErrorHandlingHook({
        fullName: "",
        contactNumber: "",
        emailAddress: "",
        description: ""
    }, validationSchema)



    const handleAddMore = (e) => {
        e.preventDefault();
        const isAllowed = checkForError();

        if (isAllowed) {
            console.log(isAllowed)
        }

    }
    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Company Registration"} currentPage={"Company Registration"} />
            </div>

            <div className="form-container">
                <div className="company-details-container">
                    <div className="company-details-row">
                        <div className="company-details">
                            <h3>
                                Company Details
                            </h3>
                        </div>
                        <div>
                            <div className="company-details-toggle">
                                <p>{isActive ? "Active" : "Inactive"}</p>
                                <label className="switch">
                                    <span className="switch-of"><img src={switchOff} alt="" /></span>
                                    <span className="switch-on"><img src={switchOn} alt="" /></span>
                                    <input
                                        type="checkbox"
                                        className="switch-input"
                                        checked={isActive}
                                        onChange={() => setIsActive(!isActive)} />
                                    <span className="switch-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="company-info-container">
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Company Name:</p>
                                        <p>{item.one}</p>
                                    </li>

                                    <li>
                                        <p>Company Type:</p>
                                        <p>Information Technology</p>
                                    </li>

                                    <li>
                                        <p>Plan Initiation Date:</p>
                                        <p>15/05/2025</p>
                                    </li>

                                    <li>
                                        <p>Plan Registration Date:</p>
                                        <p>14/05/2025</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="company-info-ul">
                                    <li>
                                        <p>Contact Number:</p>
                                        <p>92 000 000 0000 </p>
                                    </li>

                                    <li>
                                        <p>Email Address:</p>
                                        <Link to='mailto:imran-naveed@erk-tehcnologies.com'>imran-naveed@erk-tehcnologies.com</Link>
                                    </li>

                                    <li>
                                        <p>Website:</p>
                                        <p>www.erk-tehcnologies.com</p>
                                    </li>

                                    <li>
                                        <p>Address:</p>
                                        <p>Al/1 Lane 15 Khayaban-e- Badar Ph 7 DHA , Karachi, Sindh,
                                            Pakistan</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="company-details-horizontal-line"></div>
                    <form onSubmit={handleAddMore}>
                        <div className="contact-person-detail-row">
                            <div className="contact-person">
                                <p>Contact Person Details</p>
                            </div>
                            <div className="contact-action-button">
                                <button className="action-button" type='submit'>Add More</button>
                            </div>
                        </div>

                        <div className="row add-hospital-row">
                            <div className="col-md-3">
                                <InputField
                                    heading={"Full Name"}
                                    placeholder={"Enter Full Name"}
                                    value={apiData.fullName}
                                    onChange={(e) => setterForApiData("fullName", e.target.value)}
                                    error={apiData.error_fullName}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Contact Number"}
                                    placeholder={"Enter Contact Number"}
                                    value={apiData.contactNumber}
                                    onChange={(e) => setterForApiData("contactNumber", e.target.value)}
                                    error={apiData.error_contactNumber}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Email Address"}
                                    placeholder={"Enter Email Address"}
                                    value={apiData.emailAddress}
                                    onChange={(e) => setterForApiData("emailAddress", e.target.value)}
                                    error={apiData.error_emailAddress}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Description"}
                                    placeholder={"-----------"}
                                    value={apiData.description}
                                    onChange={(e) => setterForApiData("description", e.target.value)}
                                    error={apiData.error_description}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        {
                            contactPersons?.map((contactPerson, index) => {
                                return (
                                    <div className="col-md-6" key={index}>
                                        <div className="company-info-container">
                                            <ul className="company-info-ul">
                                                <li>
                                                    <p>Full Name:</p>
                                                    <p>{contactPerson.fullName}</p>
                                                </li>

                                                <li>
                                                    <p>Contact Number:</p>
                                                    <p>{contactPerson.contactNumber}</p>
                                                </li>

                                                <li>
                                                    <p>Email Address:</p>
                                                    <p>{contactPerson.emailAddress}</p>
                                                </li>

                                                <li>
                                                    <p>Description:</p>
                                                    <p>{contactPerson.description}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="company-details-horizontal-line"></div>
                    <div className="otp-config-info">
                        <h2>Configuration </h2>

                        <div className="otp-options-row">
                            <select>
                                <option>sijkzm</option>
                                <option>sijkzm</option>
                                <option>sijkzm</option>
                            </select>
                            <div className="custom-checkbox-row">
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span className="managment-checkmark"></span>
                                </label>
                                <p>Email</p>
                            </div>
                            <div className="custom-checkbox-row">
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span className="managment-checkmark"></span>
                                </label>
                                <p>SMS</p>
                            </div>
                            <div className="custom-checkbox-row">
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span className="managment-checkmark"></span>
                                </label>
                                <p>Email/SMS</p>
                            </div>

                            <div className="custom-checkbox-row">
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span className="managment-checkmark"></span>
                                </label>
                                <p>OPD</p>
                            </div>

                            <div className="custom-checkbox-row">
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span className="managment-checkmark"></span>
                                </label>
                                <p>IPD</p>
                            </div>
                        </div>
                        <div className="go-back-btn">
                            <Link to={"/CompanyManagment"}>
                                <button className="action-button">Go Back</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyRegistraion