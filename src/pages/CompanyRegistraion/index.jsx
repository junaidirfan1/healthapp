import { useState } from "react";
import { Link } from "react-router-dom";
import switchOn from "../../assets/images/switch-on.svg";
import switchOff from "../../assets/images/switch-off.svg";
import InputField from "../../components/InputField";
import useErrorHandlingHook from "../../hooks/useErrorHandlingHook";
import { validationRules } from "../../utils/Validations";
import Breadcrumbs from "../../components/Breadcrumbs";
import { usePostMutation } from "../../api/apiSlice";
import { endpoints } from "../../api/config";
import { toast } from "react-toastify";

function CompanyRegistration() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [policy, setPolicy] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    contactNumber: "",
    emailAddress: "",
  });
  const [benefitsForm, setBenefitsForm] = useState({
    policyNumber: "",
  });
  const [contactPersons, setContactPersons] = useState([]);
  const [benefits, setBenefits] = useState([]);

  const validationSchema = {
    name: [validationRules.required("name")],
    contactNumber: [validationRules.required("contactNumber")],
    emailAddress: [validationRules.required("emailAddress")],
    policyType: [validationRules.required("policyType")],
    clientCode: [validationRules.required("clientCode")],
  };

  const { apiData, setterForApiData, checkForError } = useErrorHandlingHook(
    {
      name: "",
      contactNumber: "",
      emailAddress: "",
      policyType: "",
      clientCode: "",
    },
    validationSchema
  );

  const [getCompanyDetail] = usePostMutation();

  // 🔍 Search Company
  const handleSearch = async () => {
    if (!policyNumber) return;

    try {
      const res = await getCompanyDetail({
        endpoint: endpoints.Company.GetCompanyDetail,
        data: `"${policyNumber}"`,
      });

      if (res?.data) {
        setPolicy(res?.data?.data);
      }
    } catch (error) {
      toast.error("Error fetching company detail");
      setPolicy(null);
    }
  };

  const handleAddMore = (e) => {
    e.preventDefault();

    const { name, contactNumber, emailAddress } = contactForm;

    if (!name || !contactNumber || !emailAddress) {
      toast.error("Please fill all fields!");
      return;
    }

    const newPerson = { ...contactForm };

    setContactPersons((prev) => [...prev, newPerson]);

    // Reset form
    setContactForm({
      name: "",
      contactNumber: "",
      emailAddress: "",
    });

    const { policyNumber } = benefitsForm;

    if (!policyNumber) {
      toast.error("Please fill all fields!");
      return;
    }

    const newBenefit = { ...benefitsForm };

    setBenefits((prev) => [...prev, newBenefit]);

    // Here you can add the newBenefit to a benefits list if needed

    setBenefitsForm({
      policyNumber: "",
    });
  };

  return (
    <div>
      <div className="company-managment-action-row">
        <Breadcrumbs
          title="Company Registration"
          currentPage="Company Registration"
        />
      </div>

      <div className="form-container">
        <div className="company-details-container">
          {/* Policy Number Search */}
          <div className="policy-details-row">
            <InputField
              heading="Policy Number"
              placeholder="Enter Policy Number"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              inputContainerClass="input-policy-number"
            />
            <button
              className="action-button"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="company-details-horizontal-line"></div>

          {/* Company Details */}
          {policy && (
            <>
              <div className="company-details-row">
                <div className="company-details">
                  <h3>Company Details</h3>
                </div>

                <div>
                  <div className="company-details-toggle">
                    <p>{isActive ? "Active" : "Inactive"}</p>
                    <label className="switch">
                      <span className="switch-of">
                        <img src={switchOff} alt="" />
                      </span>
                      <span className="switch-on">
                        <img src={switchOn} alt="" />
                      </span>

                      <input
                        type="checkbox"
                        className="switch-input"
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                      />
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
                        <p>{policy.companyName || "-"}</p>
                      </li>
                      <li>
                        <p>Company Type:</p>
                        <p>{policy.companyType || "-"}</p>
                      </li>
                      <li>
                        <p>Plan Initiation Date:</p>
                        <p>{policy.effectiveFrom || "-"}</p>
                      </li>
                      <li>
                        <p>Plan Registration Date:</p>
                        <p>{policy.effectiveTo || "-"}</p>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <ul className="company-info-ul">
                      <li>
                        <p>Contact Number:</p>
                        <p>{policy.contactNumber || "-"}</p>
                      </li>
                      <li>
                        <p>Email Address:</p>
                        <p>{policy.emailAddress || "-"}</p>
                      </li>
                      <li>
                        <p>Website:</p>
                        <p>{policy.website || "-"}</p>
                      </li>
                      <li>
                        <p>Address:</p>
                        <p>{policy.address || "-"}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="company-details-horizontal-line"></div>
          {/* Contact Person Form */}
          <form onSubmit={handleAddMore}>
            <div className="contact-person-detail-row">
              <div className="contact-person">
                <p>Contact Person Details</p>
              </div>

              <div className="contact-action-button">
                <button className="action-button" type="submit">
                  Add More
                </button>
              </div>
            </div>

            <div className="row add-hospital-row">
              <div className="col-md-3">
                <InputField
                  heading="Name"
                  placeholder="Enter Name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-md-3">
                <InputField
                  heading="Contact Number"
                  placeholder="Enter Contact Number"
                  value={contactForm.contactNumber}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      contactNumber: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-md-3">
                <InputField
                  heading="Email Address"
                  placeholder="Enter Email Address"
                  value={contactForm.emailAddress}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      emailAddress: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </form>

          {/* List Contact Persons */}
          <div className="row">
            {contactPersons.map((person, index) => (
              <div className="col-md-6" key={index}>
                <div className="company-info-container">
                  <ul className="company-info-ul">
                    <li>
                      <p>Full Name:</p>
                      <p>{person.name}</p>
                    </li>
                    <li>
                      <p>Contact Number:</p>
                      <p>{person.contactNumber}</p>
                    </li>
                    <li>
                      <p>Email Address:</p>
                      <p>{person.emailAddress}</p>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="company-details-horizontal-line"></div>
          <form onSubmit={handleAddMore}>
            <div className="contact-person-detail-row">
              <div className="contact-person">
                <p>Company Benefits Details</p>
              </div>

              <div className="contact-action-button">
                <button className="action-button" type="submit">
                  Add More
                </button>
              </div>
            </div>

            <div className="row add-hospital-row">
              <div className="col-md-3">
                <InputField
                  heading="Name"
                  placeholder="Enter Name"
                  value={benefitsForm.policyNumber}
                  onChange={(e) =>
                    setBenefitsForm((prev) => ({
                      ...prev,
                      policyNumber: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </form>

          {/* List Contact Persons */}
          <div className="row">
            {benefits.map((person, index) => (
              <div className="col-md-6" key={index}>
                <div className="company-info-container">
                  <ul className="company-info-ul">
                    <li>
                      <p>Policy Number</p>
                      <p>{person.policyNumber}</p>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="company-details-horizontal-line"></div>

          <div className="otp-config-info">
            <h2>Configuration</h2>

            <div className="otp-options-row">
              <select>
                <option>sijkzm</option>
                <option>sijkzm</option>
                <option>sijkzm</option>
              </select>

              {["Email", "SMS", "Email/SMS", "OPD", "IPD"].map((item, i) => (
                <div className="custom-checkbox-row" key={i}>
                  <label className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="managment-checkmark"></span>
                  </label>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="go-back-btn">
              <Link to="/CompanyManagment">
                <button className="action-button">Go Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegistration;
