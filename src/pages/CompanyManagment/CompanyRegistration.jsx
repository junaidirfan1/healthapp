// import { useMemo, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import switchOn from "../../assets/images/switch-on.svg";
// import switchOff from "../../assets/images/switch-off.svg";
// import InputField from "../../components/InputField";
// import useErrorHandlingHook from "../../hooks/useErrorHandlingHook";
// import { validationRules } from "../../utils/Validations";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import ButtonCustom from "../../components/ButtonCustom";
// import {
//   useGetQuery,
//   usePostMutation,
//   usePutMutation,
// } from "../../api/apiSlice";
// import { endpoints } from "../../api/config";
// import { toast } from "react-toastify";
// import Select from "react-select";
// import SelectStyle from "../../utils/SelectStyle";

// function CompanyRegistraion() {
//   const [policy, setPolicy] = useState(null);
//   const [client, setClient] = useState(null);
//   const [benefitsTypeOptions, setBenefitsTypeOptions] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const updateCompany = location.state?.updateCompany || null;

//   const validationSchema = {
//     name: [validationRules.required("name")],
//     contactNumber: [validationRules.required("contactNumber")],
//     emailAddress: [validationRules.required("emailAddress")],
//   };

//   const { apiData, setterForApiData, checkForError, resetApiData } =
//     useErrorHandlingHook(
//       {
//         policyNumber: updateCompany ? updateCompany?.policyNumber : "",
//         companyName: updateCompany ? updateCompany?.companyName : "",
//         companyType: updateCompany ? updateCompany?.companyType : "",
//         effectiveFrom: updateCompany ? updateCompany?.effectiveFrom : "",
//         effectiveTo: updateCompany ? updateCompany?.effectiveTo : "",
//         contactNumber: updateCompany ? updateCompany?.contactNumber : "",
//         emailOtp: updateCompany ? updateCompany?.emailOtp : false,
//         smsOtp: updateCompany ? updateCompany?.smsOtp : false,
//         clientCode: updateCompany ? updateCompany?.clientCode : "",
//         policies: updateCompany ? updateCompany?.policies || [] : [],
//         contactPersons: updateCompany
//           ? updateCompany?.contactPersons || []
//           : [],
//         companyBenefits: updateCompany
//           ? updateCompany?.companyBenefits || []
//           : [],
//         benefitId: [],
//         status: updateCompany ? updateCompany?.status : "2",
//         name: "",
//         emailAddress: "",
//         address: updateCompany ? updateCompany?.address : "",
//       },
//       validationSchema
//     );

//   const [getCompanyDetail] = usePostMutation();
//   const [benefitsList] = usePostMutation();
//   const [addCompany, { isLoading: isCreating }] = usePostMutation();
//   const [updateCompanyData, { isLoading: isUpdating }] = usePutMutation();

//   const handleSearch = async () => {
//     if (!apiData?.policyNumber) return;
//     try {
//       const res = await getCompanyDetail({
//         endpoint: endpoints.Company.GetCompanyDetail,
//         data: `"${apiData?.policyNumber}"`,
//       });
//       if (res?.data) {
//         setPolicy(res?.data?.data);
//         console.log("Company Data:", res.data);
//       }
//     } catch (error) {
//       toast.error("Error fetching company detail:", error);
//       setPolicy(null);
//     }
//   };
//   const Addcontact = (e) => {
//     e.preventDefault();
//     const { name, contactNumber, emailAddress } = apiData;
//     if (apiData.contactPersons.length >= 5) {
//       toast.error("You can add only 5 contact persons!");
//       return;
//     }
//     if (!name || !contactNumber || !emailAddress) {
//       toast.error("Please fill all fields!");
//       return;
//     }
//     const newContact = { name, contactNumber, emailAddress };
//     setterForApiData("contactPersons", [...apiData.contactPersons, newContact]);
//     setterForApiData("name", "");
//     setterForApiData("contactNumber", "");
//     setterForApiData("emailAddress", "");
//   };

//   const removeContact = (index) => {
//     const updated = apiData.contactPersons.filter((_, i) => i !== index);
//     setterForApiData("contactPersons", updated);
//   };

//   const Addpolicies = (e) => {
//     e.preventDefault();
//     const { policyNumber, policyType } = apiData;
//     if (apiData.policies.length >= 2) {
//       toast.error("You can add only 2 policy types!");
//       return;
//     }
//     if (!policyNumber || !policyType) {
//       toast.error("Please select policy type!");
//       return;
//     }
//     const newPolicy = { policyNumber, policyType };
//     setterForApiData("policies", [...apiData.policies, newPolicy]);
//     setterForApiData("policyType", "");
//   };

//   const removePolicy = (index) => {
//     const updated = apiData.policies.filter((_, i) => i !== index);
//     setterForApiData("policies", updated);
//   };

//   const Addbenefits = (e) => {
//     e.preventDefault();
//     const { policyNumber, benefitId } = apiData;

//     if (apiData.companyBenefits.length >= 4) {
//       toast.error("You can add only 4 Benefit Details");
//       return;
//     }
//     if (!policyNumber) {
//       toast.error("Please enter Policy Number");
//       return;
//     }
//     if (!benefitId || benefitId.length === 0) {
//       toast.error("Please fill benefit details");
//       return;
//     }

//     const selectedBenefits = benefitId.map((id) => ({
//       policyNumber,
//       benefitId: id,
//     }));

//     setterForApiData("companyBenefits", [
//       ...apiData.companyBenefits,
//       ...selectedBenefits,
//     ]);
//     setterForApiData("benefitId", []);
//   };

//   const removeBenefit = (index) => {
//     const updated = apiData.companyBenefits.filter((_, i) => i !== index);
//     setterForApiData("companyBenefits", updated);
//   };

//   const { data: policyType } = useGetQuery(endpoints.Benefits.GetPolicyList);

//   const policyTypeOptions = useMemo(() => {
//     return (
//       policyType?.data
//         ?.map((type) => type.policyType)
//         .filter((value, index, self) => self.indexOf(value) === index)
//         .map((type) => ({ value: type, label: type })) || []
//     );
//   }, [policyType]);

//   const fetchBenefits = async (policyType) => {
//     if (!policyType) return;
//     try {
//       const res = await benefitsList({
//         endpoint: endpoints.Benefits.GetBenefitsByType,
//         data: [policyType],
//       });
//       if (res?.data?.data) {
//         const options = res.data.data.map((benefit) => ({
//           value: benefit.id,
//           label: benefit.benefitDetails,
//         }));
//         setBenefitsTypeOptions(options);
//         setterForApiData("benefitId", []);
//       }
//     } catch (error) {
//       console.error("Error fetching benefits:", error);
//       toast.error("Failed to fetch benefits");
//     }
//   };

//   const { data: clientCodes } = useGetQuery(
//     endpoints.Company.GetCompanyClientCode
//   );

//   console.log("object", clientCodes);

//   const clientCodeOptions = useMemo(() => {
//     return (
//       clientCodes?.data?.map((code) => ({
//         value: code,
//         label: code,
//       })) || []
//     );
//   }, [clientCodes]);
//   console.log("selectoptions", clientCodeOptions);

//   const removeClientCode = (index) => {
//     const updated = apiData.clientCode.filter((_, i) => i !== index);
//     setterForApiData("clientCode", updated);
//   };

//   const [debugPayload, setDebugPayload] = useState(null);

//   const submitCompanyRegistration = async (e) => {
//     e.preventDefault();
//     if (!policy) {
//       toast.error("Please search for a company first");
//       return;
//     }
//     if (apiData.contactPersons.length === 0) {
//       toast.error("Please add at least one contact person");
//       return;
//     }
//     if (apiData.policies.length === 0) {
//       toast.error("Please add at least one policy");
//       return;
//     }
//     if (apiData.companyBenefits.length === 0) {
//       toast.error("Please add at least one benefit");
//       return;
//     }

//     const payload = {
//       companyName: policy?.companyName,
//       companyType: policy?.companyType,
//       status: parseInt(apiData.status),
//       clientCode: client.clientCode ||  policy.clientCode,
//       effectiveFrom: policy?.effectiveFrom,
//       effectiveTo: policy?.effectiveTo,
//       address: policy?.address || apiData.address,
//       contactNumber: policy?.contactNumber,
//       email: policy?.email,
//       website: policy?.website,
//       emailOtp: apiData.emailOtp,
//       smsOtp: apiData.smsOtp,
//       policies: apiData.policies,
//       contactPersons: apiData.contactPersons,
//       companyBenefits: apiData.companyBenefits,
//     };
//     setDebugPayload(payload);
//     console.log("Payload being sent:", payload);

//     console.log("Payload being sent:", payload);

//     try {
//       if (updateCompany) {

//         const res = await updateCompanyData({
//           endpoint: endpoints.Company.UpdateCompanyDetail,
//           data: payload,
//         });

//         console.log("Update Response:", res);

//         if (res?.data?.success) {
//           toast.success("Company updated successfully!");
//           navigate("/CompanyManagment");
//         } else {
//           toast.error(res?.error?.data?.message || "Failed to update company");
//         }
//       } else {
//         // Create new company
//         const res = await addCompany({
//           endpoint: endpoints.Company.CreateCompany,
//           data: payload,
//         });

//         console.log("Create Response:", res);

//         if (res?.data?.success) {
//           toast.success("Company created successfully!");
//           // Reset form
//           if (resetApiData) {
//             resetApiData();
//           }
//           setPolicy(null);
//           setBenefitsTypeOptions([]);
//           navigate("/CompanyManagment");
//         } else {
//           toast.error(res?.error?.data?.message || "Failed to create company");
//         }
//       }
//     } catch (error) {
//       console.error("Error submitting company:", error);
//       toast.error("An error occurred while saving the company");
//     }
//   };

//   return (
//     <div>
//       <div className="company-managment-action-row">
//         <Breadcrumbs
//           title={"Company Registration"}
//           currentPage={"Company Registration"}
//         />
//       </div>

//       <div className="form-container">
//         <div className="company-details-container">
//           {/* Policy Number Search */}
//           <div className="policy-details-row">
//             <InputField
//               heading={"Policy Number"}
//               placeholder={"Enter Policy Number"}
//               value={apiData?.policyNumber}
//               onChange={(e) => setterForApiData("policyNumber", e.target.value)}
//               inputContainerClass={"input-policy-number"}
//               disabled={updateCompany ? true : false}
//             />
//             <ButtonCustom
//               title={"Search"}
//               onClick={handleSearch}
//               disabled={updateCompany}
//             />
//           </div>

//           {/* Company Details */}
//           {policy && (
//             <>
//               <div className="company-details-row">
//                 <div className="company-details">
//                   <h3>Company Details</h3>
//                 </div>
//                 <div>
//                   <div className="company-details-toggle">
//                     <p>{apiData?.status === "1" ? "Active" : "Inactive"}</p>
//                     <label className="switch">
//                       <span className="switch-of">
//                         <img src={switchOff} alt="" />
//                       </span>
//                       <span className="switch-on">
//                         <img src={switchOn} alt="" />
//                       </span>
//                       <input
//                         type="checkbox"
//                         className="switch-input"
//                         checked={apiData?.status === "1"}
//                         onChange={() =>
//                           setterForApiData(
//                             "status",
//                             apiData?.status === "2" ? "1" : "2"
//                           )
//                         }
//                       />
//                       <span className="switch-slider"></span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="company-info-container">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <ul className="company-info-ul">
//                       <li>
//                         <p>Company Name:</p>
//                         <p>{policy?.companyName || "---"}</p>
//                       </li>
//                       <li>
//                         <p>Company Type:</p>
//                         <p>{policy?.companyType || "---"}</p>
//                       </li>
//                       <li>
//                         <p>Plan Initiation Date:</p>
//                         <p>{policy?.effectiveFrom?.split("T")[0] || "---"}</p>
//                       </li>
//                       <li>
//                         <p>Plan Registration Date:</p>
//                         <p>{policy?.effectiveTo?.split("T")[0] || "---"}</p>
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="col-md-6">
//                     <ul className="company-info-ul">
//                       <li>
//                         <p>Contact Number:</p>
//                         <p>{policy?.contactNumber || "---"}</p>
//                       </li>
//                       <li>
//                         <p>Email Address:</p>
//                         <p>{policy?.email || "---"}</p>
//                       </li>
//                       <li>
//                         <p>Website:</p>
//                         <p>{policy?.website || "---"}</p>
//                       </li>
//                       <li>
//                         <p>Address:</p>
//                         <p>{policy?.address || "---"}</p>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           <div className="company-details-horizontal-line"></div>

//           {/* Contact Person Details */}
//           <form
//             className="company-form-style"
//             onSubmit={submitCompanyRegistration}
//           >
//             <div className="contact-person-detail-row">
//               <div className="contact-person">
//                 <p>Client Code</p>
//               </div>
//               <div className="contact-action-button">
//                 <button
//                   className="action-button"
//                   onClick={Addcontact}
//                   type="button"
//                 >
//                   Add More
//                 </button>
//               </div>
//             </div>

//             <div className="row add-hospital-row">
//               <div className="col-md-3">
//                 <div className="login-email-container">
//                   <p>Client Code</p>
//                   <Select
//                     options={clientCodeOptions}
//                     isSearchable={true}
//                     placeholder="-- Select Client Code --"
//                     styles={SelectStyle.styles}
//                     value={clientCodeOptions.find(
//                       (c) => c.value === apiData.clientCode
//                     )}
//                     onChange={(selected) =>
//                       setterForApiData("clientCode", selected.value)
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row contact-person-display-row">
//               {apiData.contactPersons?.map((client, index) => (
//                 <div className="col-md-6" key={index}>
//                   <div className="company-info-container contact-person-info">
//                     <button
//                       className="contact-person-cross"
//                       onClick={() => removeClientCode(index)}
//                       type="button"
//                     >
//                       &#10006;
//                     </button>
//                     <ul className="company-info-ul">
//                       <li>
//                         <p>Client Code:</p>
//                         <p>{client.clientCode}</p>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="company-details-horizontal-line"></div>
//             <div className="contact-person-detail-row">
//               <div className="contact-person">
//                 <p>Contact Person Details</p>
//               </div>
//               <div className="contact-action-button">
//                 <button
//                   className="action-button"
//                   onClick={Addcontact}
//                   type="button"
//                 >
//                   Add More
//                 </button>
//               </div>
//             </div>

//             <div className="row add-hospital-row">
//               <div className="col-md-3">
//                 <InputField
//                   heading={"Name"}
//                   placeholder={"Enter Name"}
//                   value={apiData?.name ?? ""}
//                   onChange={(e) => setterForApiData("name", e.target.value)}
//                 />
//               </div>
//               <div className="col-md-3">
//                 <InputField
//                   heading={"Contact Number"}
//                   placeholder={"Enter Contact Number"}
//                   value={apiData?.contactNumber ?? ""}
//                   onChange={(e) =>
//                     setterForApiData("contactNumber", e.target.value)
//                   }
//                 />
//               </div>
//               <div className="col-md-3">
//                 <InputField
//                   heading={"Email Address"}
//                   placeholder={"Enter Email Address"}
//                   value={apiData?.emailAddress ?? ""}
//                   onChange={(e) =>
//                     setterForApiData("emailAddress", e.target.value)
//                   }
//                 />
//               </div>
//             </div>

//             <div className="row contact-person-display-row">
//               {apiData.contactPersons?.map((person, index) => (
//                 <div className="col-md-6" key={index}>
//                   <div className="company-info-container contact-person-info">
//                     <button
//                       className="contact-person-cross"
//                       onClick={() => removeContact(index)}
//                       type="button"
//                     >
//                       &#10006;
//                     </button>
//                     <ul className="company-info-ul">
//                       <li>
//                         <p>Full Name:</p>
//                         <p>{person.name}</p>
//                       </li>
//                       <li>
//                         <p>Contact Number:</p>
//                         <p>{person.contactNumber}</p>
//                       </li>
//                       <li>
//                         <p>Email Address:</p>
//                         <p>{person.emailAddress}</p>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Policies */}
//             <div className="company-details-horizontal-line"></div>
//             <div className="contact-person-detail-row">
//               <div className="contact-person">
//                 <p>Company Policies</p>
//               </div>
//               <div className="contact-action-button">
//                 <button
//                   className="action-button"
//                   onClick={Addpolicies}
//                   type="button"
//                 >
//                   Add More
//                 </button>
//               </div>
//             </div>

//             <div className="row add-hospital-row">
//               <div className="col-md-3">
//                 <InputField
//                   heading={"Policy Number"}
//                   placeholder={"Enter policy Number"}
//                   value={apiData?.policyNumber}
//                   disabled
//                 />
//               </div>
//               <div className="col-md-3">
//                 <div className="login-email-container">
//                   <p>Policy Type</p>
//                   <Select
//                     options={policyTypeOptions}
//                     isSearchable={true}
//                     placeholder="-- Select Policy Type --"
//                     styles={SelectStyle.styles}
//                     value={policyTypeOptions?.find(
//                       (p) => p.value === apiData?.policyType
//                     )}
//                     onChange={(e) => {
//                       setterForApiData("policyType", e.value);
//                       fetchBenefits(e.value);
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               {apiData?.policies?.map((policy, index) => (
//                 <div className="col-md-6" key={index}>
//                   <div className="company-info-container contact-person-info">
//                     <button
//                       className="contact-person-cross"
//                       onClick={() => removePolicy(index)}
//                       type="button"
//                     >
//                       &#10006;
//                     </button>
//                     <ul className="company-info-ul">
//                       <li>
//                         <p>Policy Number</p>
//                         <p>{policy.policyNumber ?? ""}</p>
//                       </li>
//                       <li>
//                         <p>Policy Type</p>
//                         <p>{policy?.policyType}</p>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Benefits */}
//             <div className="company-details-horizontal-line"></div>
//             <div className="contact-person-detail-row">
//               <div className="contact-person">
//                 <p>Company Benefits</p>
//               </div>
//               <div className="contact-action-button">
//                 <button
//                   className="action-button"
//                   onClick={Addbenefits}
//                   type="button"
//                 >
//                   Add More
//                 </button>
//               </div>
//             </div>

//             <div className="row add-hospital-row">
//               <div className="col-md-3">
//                 <InputField
//                   heading={"Policy Number"}
//                   placeholder={"Enter policy Number"}
//                   value={apiData?.policyNumber}
//                   disabled
//                 />
//               </div>
//               <div className="col-md-3">
//                 <div className="login-email-container">
//                   <p>Benefits</p>
//                   <Select
//                     options={benefitsTypeOptions}
//                     isSearchable={true}
//                     isMulti={true}
//                     placeholder="-- Select Benefits --"
//                     styles={SelectStyle.styles}
//                     value={benefitsTypeOptions?.filter((b) =>
//                       apiData?.benefitId?.includes(b.value)
//                     )}
//                     onChange={(selected) =>
//                       setterForApiData(
//                         "benefitId",
//                         selected ? selected.map((x) => x.value) : []
//                       )
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row contact-person-display-row">
//               {apiData?.companyBenefits?.map((benefit, index) => (
//                 <div className="col-md-6" key={index}>
//                   <div className="company-info-container contact-person-info">
//                     <button
//                       className="contact-person-cross"
//                       onClick={() => removeBenefit(index)}
//                       type="button"
//                     >
//                       &#10006;
//                     </button>
//                     <ul className="company-info-ul">
//                       <li>
//                         <p>Policy Number</p>
//                         <p>{benefit.policyNumber}</p>
//                       </li>
//                       <li>
//                         <p>Benefit Details</p>
//                         {/* <p>{benefit.benefitDetails}</p> */}
//                         <p>
//                           {benefitsTypeOptions.find(
//                             (b) => b.value === benefit.benefitId
//                           )?.label || "---"}
//                         </p>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Configuration */}
//             <div className="otp-config-info">
//               <h2>Configuration</h2>
//               <div className="otp-options-row">
//                 {/* Email Checkbox */}
//                 <div className="custom-checkbox-row">
//                   <label className="custom-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={apiData?.emailOtp === true}
//                       onChange={() =>
//                         setterForApiData("emailOtp", !apiData?.emailOtp)
//                       }
//                     />
//                     <span className="managment-checkmark"></span>
//                   </label>
//                   <p>Email</p>
//                 </div>

//                 {/* SMS Checkbox */}
//                 <div className="custom-checkbox-row">
//                   <label className="custom-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={apiData?.smsOtp === true}
//                       onChange={() =>
//                         setterForApiData("smsOtp", !apiData?.smsOtp)
//                       }
//                     />
//                     <span className="managment-checkmark"></span>
//                   </label>
//                   <p>SMS</p>
//                 </div>
//               </div>

//               <div className="go-back-btn go-save-btn">
//                 <Link to={"/CompanyManagment"}>
//                   <button className="action-button" type="button">
//                     Go Back
//                   </button>
//                 </Link>
//                 <button
//                   className="action-button"
//                   type="submit"
//                   disabled={isCreating || isUpdating}
//                 >
//                   {isCreating || isUpdating ? "Saving..." : "Save"}
//                 </button>

//                 {debugPayload && (
//                   <pre
//                     style={{
//                       background: "#ebebeb79",
//                       padding: "15px",
//                       color: "rgba(0, 0, 0, 1)",
//                     }}
//                   >
//                     {JSON.stringify(debugPayload, null, 2)}
//                   </pre>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CompanyRegistraion;

import { useMemo, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import switchOn from "../../assets/images/switch-on.svg";
import switchOff from "../../assets/images/switch-off.svg";
import InputField from "../../components/InputField";
import useErrorHandlingHook from "../../hooks/useErrorHandlingHook";
import { validationRules } from "../../utils/Validations";
import Breadcrumbs from "../../components/Breadcrumbs";
import ButtonCustom from "../../components/ButtonCustom";
import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
} from "../../api/apiSlice";
import { endpoints } from "../../api/config";
import { toast } from "react-toastify";
import Select from "react-select";
import SelectStyle from "../../utils/SelectStyle";


function CompanyRegistration() {
  const location = useLocation();
  const navigate = useNavigate();



  const updateCompany = location.state?.updateCompany || null;

  console.log("object", updateCompany);

  
  const [policy, setPolicy] = useState(null);
  const [client, setClient] = useState(null);
  const [benefitsTypeOptions, setBenefitsTypeOptions] = useState([]);

  const validationSchema = {
    name: [validationRules.required("name")],
    contactNumber: [validationRules.required("contactNumber")],
    emailAddress: [validationRules.required("emailAddress")],
  };

  const { apiData, setterForApiData, checkForError, resetApiData } =
    useErrorHandlingHook(
      {
        companyName: updateCompany ? updateCompany.companyName : "",
        companyType: updateCompany ? updateCompany.companyType : "",
        effectiveFrom: updateCompany ? updateCompany.effectiveFrom : "",
        effectiveTo: updateCompany ? updateCompany.effectiveTo : "",
        contactNumber: updateCompany ? updateCompany.contactNumber : "",
        emailOtp: updateCompany ? updateCompany.emailOtp : false,
        smsOtp: updateCompany ? updateCompany.smsOtp : false,
        clientCode: updateCompany ? updateCompany.clientCode : "",
        policies: updateCompany ? updateCompany.policies || [] : [],
        contactPersons: updateCompany ? updateCompany.contactPersons || [] : [],
        companyBenefits: updateCompany
          ? updateCompany.companyBenefits || []
          : [],
        benefitId: [],
        status: updateCompany ? updateCompany.status : "2",
        name: "",
        emailAddress: "",
        address: updateCompany ? updateCompany.address : "",
      },
      validationSchema
    );

  const [getCompanyDetail] = usePostMutation();
  const [benefitsList] = usePostMutation();
  const [addCompany, { isLoading: isCreating }] = usePostMutation();
  const [updateCompanyData, { isLoading: isUpdating }] = usePutMutation();

  // ------------------ Search Policy ------------------
  const handleSearch = async () => {
    if (!apiData?.policyNumber) {
      toast.error("Please enter a Policy Number");
      return;
    }

    try {
      const res = await getCompanyDetail({
        endpoint: endpoints.Company.GetCompanyDetail,
        data: `"${apiData.policyNumber}"`,
      });

      // Check if API returned data
      if (!res?.data?.data) {
        toast.error("Policy Number not found");
        setPolicy(null);
        return;
      }

      // Set company data
      setPolicy(res.data.data);
      console.log("Company Data:", res.data);

      if (res.data.data.clientCode) {
        setClient({
          value: res.data.data.clientCode,
          label: res.data.data.clientCode,
        });
      }
    } catch (error) {
      toast.error("Error fetching company detail");
      setPolicy(null);
    }
  };

  // ------------------ Contact Persons ------------------
  const Addcontact = (e) => {
    e.preventDefault();
    const { name, contactNumber, emailAddress } = apiData;
    if (apiData.contactPersons.length >= 5) {
      toast.error("You can add only 5 contact persons!");
      return;
    }
    if (!name || !contactNumber || !emailAddress) {
      toast.error("Please fill all fields!");
      return;
    }
    const newContact = { name, contactNumber, emailAddress };
    setterForApiData("contactPersons", [...apiData.contactPersons, newContact]);
    setterForApiData("name", "");
    setterForApiData("contactNumber", "");
    setterForApiData("emailAddress", "");
  };
  const removeContact = (index) => {
    const updated = apiData.contactPersons.filter((_, i) => i !== index);
    setterForApiData("contactPersons", updated);
  };

  // ------------------ Policies ------------------
  const Addpolicies = (e) => {
    e.preventDefault();
    const { policyNumber, policyType } = apiData;
    if (apiData.policies.length >= 2) {
      toast.error("You can add only 2 policy types!");
      return;
    }
    if (!policyNumber && !policyType) {
      toast.error("Please Fill all fields!");
      return;
    }
    if (!policyNumber) {
      toast.error("Please enter policy number!");
      return;
    }
       if (!policyType) {
      toast.error("Please enter policy type!");
      return;
    }
    const newPolicy = { policyNumber, policyType };
    setterForApiData("policies", [...apiData.policies, newPolicy]);
    setterForApiData("policyType", "");
  };
  const removePolicy = (index) => {
    const updated = apiData.policies.filter((_, i) => i !== index);
    setterForApiData("policies", updated);
  };

  // ------------------ Benefits ------------------
  const Addbenefits = (e) => {
    e.preventDefault();
    const { policyNumber, benefitId } = apiData;
    if (apiData.companyBenefits.length >= 4) {
      toast.error("You can add only 4 Benefit Details");
      return;
    }
    if (!policyNumber) {
      toast.error("Please enter Policy Number");
      return;
    }
    if (!benefitId || benefitId.length === 0) {
      toast.error("Please fill benefit details");
      return;
    }

    const selectedBenefits = benefitId.map((id) => ({
      policyNumber,
      benefitId: id,
    }));
    setterForApiData("companyBenefits", [
      ...apiData.companyBenefits,
      ...selectedBenefits,
    ]);
    setterForApiData("benefitId", []);
  };
  const removeBenefit = (index) => {
    const updated = apiData.companyBenefits.filter((_, i) => i !== index);
    setterForApiData("companyBenefits", updated);
  };

  const { data: policyType } = useGetQuery(endpoints.Benefits.GetPolicyList);
  const policyTypeOptions = useMemo(
    () =>
      policyType?.data
        ?.map((type) => type.policyType)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((type) => ({ value: type, label: type })) || [],
    [policyType]
  );

  const fetchBenefits = async (policyType) => {
    if (!policyType) return;
    try {
      const res = await benefitsList({
        endpoint: endpoints.Benefits.GetBenefitsByType,
        data: [policyType],
      });
      if (res?.data?.data) {
        const options = res.data.data.map((benefit) => ({
          value: benefit.id,
          label: benefit.benefitDetails,
        }));
        setBenefitsTypeOptions(options);
        setterForApiData("benefitId", []);
      }
    } catch (error) {
      console.error("Error fetching benefits:", error);
      toast.error("Failed to fetch benefits");
    }
  };

  const { data: clientCodes } = useGetQuery(
    endpoints.Company.GetCompanyClientCode
  );
  const clientCodeOptions = useMemo(
    () =>
      clientCodes?.data?.map((code) => ({
        value: code,
        label: code,
      })) || [],
    [clientCodes]
  );

  const Addclient = () => {
    if (!client) {
      toast.error("Please select a Client Code");
      return;
    }

    if (apiData.clientCode) {
      toast.error("Only one Client Code allowed");
      return;
    }

    setterForApiData("clientCode", client.value);

    setClient(null);
  };

  const removeClientCode = (index) => {
    const updated = apiData.clientCode.filter((_, i) => i !== index);
    setterForApiData("clientCode", updated);
  };

  const [debugPayload, setDebugPayload] = useState(null);
  const submitCompanyRegistration = async (e) => {
    e.preventDefault();
    const isAllowed = checkForError();
    if (!policy) {
      toast.error("Please search for a company first");
      return;
    }
    if (apiData.contactPersons.length === 0) {
      toast.error("Please add at least one contact person");
      return;
    }
    if (apiData.policies.length === 0) {
      toast.error("Please add at least one policy");
      return;
    }
    if (apiData.companyBenefits.length === 0) {
      toast.error("Please add at least one benefit");
      return;
    }

    const basePayload  = {
      companyName: policy?.companyName,
      companyType: policy?.companyType,
      status: parseInt(apiData.status),
      clientCode: apiData.clientCode || policy?.clientCode,
      effectiveFrom: policy?.effectiveFrom,
      effectiveTo: policy?.effectiveTo,
      address: policy?.address ,
      contactNumber: policy?.contactNumber,
      email: policy?.email,
      website: policy?.website,
      emailOtp: apiData.emailOtp,
      smsOtp: apiData.smsOtp,
      policies: apiData.policies,
      contactPersons: apiData.contactPersons,
      companyBenefits: apiData.companyBenefits,
    };
     const payload = updateCompany
    ? { ...basePayload, id: updateCompany.id }
    : basePayload;
    setDebugPayload(payload);
    console.log("Payload being sent:", payload);

   

    try {
      if (updateCompany) {
        const res = await updateCompanyData({
          endpoint: endpoints.Company.UpdateCompanyDetail,
          data: payload,
        });
        if (res?.data?.success) {
          toast.success("Company updated successfully!");
          navigate("/CompanyManagment");
        } else {
          toast.error(res?.error?.data?.message || "Failed to update company");
        }
      } else {
        if (isAllowed) {
          toast.error("Please fill all required fields correctly");
          return;
        }
        // Create new company
        const res = await addCompany({
          endpoint: endpoints.Company.CreateCompany,
          data: payload,
        });
        if (res?.data?.success) {
          toast.success("Company created successfully!");
          if (resetApiData) resetApiData();
          setPolicy(null);
          setClient(null);
          setBenefitsTypeOptions([]);
          navigate("/CompanyManagment");
        } else {
          toast.error(res?.error?.data?.message || "Failed to create company");
        }
      }
    } catch (error) {
      toast.error("An error occurred while saving the company");
    }
  };

  return (
    <div>
      <div className="company-managment-action-row">
        <Breadcrumbs
          title={"Company Registration"}
          currentPage={"Company Registration"}
        />
      </div>

      <div className="form-container">
        <div className="company-details-container">
          {/* Policy Number Search */}
          <div className="policy-details-row">
            <InputField
              heading={"Policy Number"}
              placeholder={"Enter Policy Number"}
              value={apiData?.policyNumber}
              onChange={(e) => setterForApiData("policyNumber", e.target.value)}
              inputContainerClass={"input-policy-number"}
              disabled={updateCompany ? true : false}
            />
            <ButtonCustom
              title={"Search"}
              onClick={handleSearch}
              disabled={updateCompany}
            />
          </div>

          {/* Company Details */}
          {policy && (
            <>
              <div className="company-details-row">
                <div className="company-details">
                  <h3>Company Details</h3>
                </div>
                <div>
                  <div className="company-details-toggle">
                    <p>{apiData?.status === "1" ? "Active" : "Inactive"}</p>
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
                        checked={apiData?.status === "1"}
                        onChange={() =>
                          setterForApiData(
                            "status",
                            apiData?.status === "2" ? "1" : "2"
                          )
                        }
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
                        <p>{policy?.companyName || "---"}</p>
                      </li>
                      <li>
                        <p>Company Type:</p>
                        <p>{policy?.companyType || "---"}</p>
                      </li>
                      <li>
                        <p>Plan Initiation Date:</p>
                        <p>{policy?.effectiveFrom?.split("T")[0] || "---"}</p>
                      </li>
                      <li>
                        <p>Plan Registration Date:</p>
                        <p>{policy?.effectiveTo?.split("T")[0] || "---"}</p>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <ul className="company-info-ul">
                      <li>
                        <p>Contact Number:</p>
                        <p>{policy?.contactNumber || "---"}</p>
                      </li>
                      <li>
                        <p>Email Address:</p>
                        <p>{policy?.email || "---"}</p>
                      </li>
                      <li>
                        <p>Website:</p>
                        <p>{policy?.website || "---"}</p>
                      </li>
                      <li>
                        <p>Address:</p>
                        <p>{policy?.address || "---"}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="company-details-horizontal-line"></div>

          {/* Contact Person Details */}
          <form
            className="company-form-style"
            onSubmit={submitCompanyRegistration}
          >
            <div className="contact-person-detail-row">
              <div className="contact-person">
                <p>Client Code</p>
              </div>
              <div className="contact-action-button">
                <button
                  className="action-button"
                  onClick={Addclient}
                  type="button"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="row add-hospital-row">
              <div className="col-md-3">
                <div className="login-email-container">
                  <p>Client Code</p>
                  <Select
                    options={clientCodeOptions}
                    isSearchable
                    placeholder="-- Select Client Code --"
                    styles={SelectStyle.styles}
                    value={client}
                    onChange={setClient}
                  />
                </div>
              </div>
            </div>

            <div className="row contact-person-display-row">
              {apiData.clientCode && (
                <div className="col-md-6">
                  <div className="company-info-container contact-person-info">
                    <button
                      className="contact-person-cross"
                      onClick={removeClientCode}
                      type="button"
                    >
                      &#10006;
                    </button>

                    <ul className="company-info-ul">
                      <li>
                        <p>Client Code:</p>
                        <p>{apiData.clientCode}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="company-details-horizontal-line"></div>
            <div className="contact-person-detail-row">
              <div className="contact-person">
                <p>Contact Person Details</p>
              </div>
              <div className="contact-action-button">
                <button
                  className="action-button"
                  onClick={Addcontact}
                  type="button"
                >
                  Add More
                </button>
              </div>
            </div>

            <div className="row add-hospital-row">
              <div className="col-md-3">
                <InputField
                  heading={"Name"}
                  placeholder={"Enter Name"}
                  value={apiData?.name ?? ""}
                  onChange={(e) => setterForApiData("name", e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <InputField
                  heading={"Contact Number"}
                  placeholder={"Enter Contact Number"}
                  value={apiData?.contactNumber ?? ""}
                  onChange={(e) =>
                    setterForApiData("contactNumber", e.target.value)
                  }
                />
              </div>
              <div className="col-md-3">
                <InputField
                  heading={"Email Address"}
                  placeholder={"Enter Email Address"}
                  value={apiData?.emailAddress ?? ""}
                  onChange={(e) =>
                    setterForApiData("emailAddress", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="row contact-person-display-row">
              {apiData.contactPersons?.map((person, index) => (
                <div className="col-md-6" key={index}>
                  <div className="company-info-container contact-person-info">
                    <button
                      className="contact-person-cross"
                      onClick={() => removeContact(index)}
                      type="button"
                    >
                      &#10006;
                    </button>
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

            {/* Policies */}
            <div className="company-details-horizontal-line"></div>
            <div className="contact-person-detail-row">
              <div className="contact-person">
                <p>Company Policies</p>
              </div>
              <div className="contact-action-button">
                <button
                  className="action-button"
                  onClick={Addpolicies}
                  type="button"
                >
                  Add More
                </button>
              </div>
            </div>

            <div className="row add-hospital-row">
              <div className="col-md-3">
                <InputField
                  heading={"Policy Number"}
                  placeholder={"Enter policy Number"}
                  value={apiData?.policyNumber}
                  disabled
                />
              </div>
              <div className="col-md-3">
                <div className="login-email-container">
                  <p>Policy Type</p>
                  <Select
                    options={policyTypeOptions}
                    isSearchable={true}
                    placeholder="-- Select Policy Type --"
                    styles={SelectStyle.styles}
                    value={policyTypeOptions?.find(
                      (p) => p.value === apiData?.policyType
                    )}
                    onChange={(e) => {
                      setterForApiData("policyType", e.value);
                      fetchBenefits(e.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              {apiData?.policies?.map((policy, index) => (
                <div className="col-md-6" key={index}>
                  <div className="company-info-container contact-person-info">
                    <button
                      className="contact-person-cross"
                      onClick={() => removePolicy(index)}
                      type="button"
                    >
                      &#10006;
                    </button>
                    <ul className="company-info-ul">
                      <li>
                        <p>Policy Number</p>
                        <p>{policy.policyNumber ?? ""}</p>
                      </li>
                      <li>
                        <p>Policy Type</p>
                        <p>{policy?.policyType}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="company-details-horizontal-line"></div>
            <div className="contact-person-detail-row">
              <div className="contact-person">
                <p>Company Benefits</p>
              </div>
              <div className="contact-action-button">
                <button
                  className="action-button"
                  onClick={Addbenefits}
                  type="button"
                >
                  Add More
                </button>
              </div>
            </div>

            <div className="row add-hospital-row">
              <div className="col-md-3">
                <InputField
                  heading={"Policy Number"}
                  placeholder={"Enter policy Number"}
                  value={apiData?.policyNumber}
                  disabled
                />
              </div>
              <div className="col-md-3">
                <div className="login-email-container">
                  <p>Benefits</p>
                  <Select
                    options={benefitsTypeOptions}
                    isSearchable={true}
                    isMulti={true}
                    placeholder="-- Select Benefits --"
                    styles={SelectStyle.styles}
                    value={benefitsTypeOptions?.filter((b) =>
                      apiData?.benefitId?.includes(b.value)
                    )}
                    onChange={(selected) =>
                      setterForApiData(
                        "benefitId",
                        selected ? selected.map((x) => x.value) : []
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row contact-person-display-row">
              {apiData?.companyBenefits?.map((benefit, index) => (
                <div className="col-md-6" key={index}>
                  <div className="company-info-container contact-person-info">
                    <button
                      className="contact-person-cross"
                      onClick={() => removeBenefit(index)}
                      type="button"
                    >
                      &#10006;
                    </button>
                    <ul className="company-info-ul">
                      <li>
                        <p>Policy Number</p>
                        <p>{benefit.policyNumber}</p>
                      </li>
                      <li>
                        <p>Benefit Details</p>
                        {/* <p>{benefit.benefitDetails}</p> */}
                        <p>
                          {benefitsTypeOptions.find(
                            (b) => b.value === benefit.benefitId
                          )?.label || "---"}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Configuration */}
            <div className="otp-config-info">
              <h2>Configuration</h2>
              <div className="otp-options-row">
                {/* Email Checkbox */}
                <div className="custom-checkbox-row">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={apiData?.emailOtp === true}
                      onChange={() =>
                        setterForApiData("emailOtp", !apiData?.emailOtp)
                      }
                    />
                    <span className="managment-checkmark"></span>
                  </label>
                  <p>Email</p>
                </div>

                {/* SMS Checkbox */}
                <div className="custom-checkbox-row">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={apiData?.smsOtp === true}
                      onChange={() =>
                        setterForApiData("smsOtp", !apiData?.smsOtp)
                      }
                    />
                    <span className="managment-checkmark"></span>
                  </label>
                  <p>SMS</p>
                </div>
              </div>

              <div className="go-back-btn go-save-btn">
                <Link to={"/CompanyManagment"}>
                  <button className="action-button" type="button">
                    Go Back
                  </button>
                </Link>
                <button
                  className="action-button"
                  type="submit"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? "Saving..." : "Save"}
                </button>

                {debugPayload && (
                  <pre
                    style={{
                      background: "#ebebeb79",
                      padding: "15px",
                      color: "rgba(0, 0, 0, 1)",
                    }}
                  >
                    {JSON.stringify(debugPayload, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegistration;
