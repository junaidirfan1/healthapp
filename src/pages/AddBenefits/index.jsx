import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import removeIcon from "../../assets/images/cancel.png";
import InputField from '../../components/InputField';
import Select from 'react-select';
import useErrorHandlingHook from '../../hooks/useErrorHandlingHook';
import { validationRules } from '../../utils/Validations';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useGetQuery, usePostMutation, usePutMutation } from '../../api/apiSlice';
import { endpoints } from '../../api/config';
import SuccessModal from '../../components/SuccessModal';
import { toast } from 'react-toastify';


function AddBenefits() {
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const updateBenefitData = location?.state?.item

    const validationSchema = {
        type: [validationRules.required("Type")],
        Details: [validationRules.required("Details")],
        Limits: [validationRules.required("Limits"), validationRules.number("Limits")],
        Eligibility: [validationRules.required("Eligibility")],
        Description: [validationRules.required("Description")],
    }

    const { apiData, setterForApiData, checkForError, resetStates } = useErrorHandlingHook({
        type: updateBenefitData ? updateBenefitData.benefitTypeId : "",
        Details: updateBenefitData ? updateBenefitData.benefitDetails : "",
        Limits: updateBenefitData ? updateBenefitData.entitlementLimits : "",
        Eligibility: updateBenefitData ? updateBenefitData.coverageEligibility : "",
        Description: updateBenefitData ? updateBenefitData.note : ""
    }, validationSchema)


    const { data: BenefitTypeListData } = useGetQuery(endpoints.Benefits.GetBenefitTypeList);

    const benefitTypes = BenefitTypeListData?.data?.map((item) => {
        return {
            value: item?.id,
            label: item?.benefitTypeName,
        }
    }) || []

    const [addBenefits, { }] = usePostMutation()
    const [updateBenefits] = usePutMutation()

    const submitAddBenefits = (e) => {
        e.preventDefault()
        const isAllowed = checkForError();

        if (updateBenefitData) {
            updateBenefits({
                endpoint: endpoints.Benefits.UpdateBenefitByAdmin,
                data: {
                    "id": updateBenefitData?.id,
                    "benefitDetails": apiData.Details,
                    "entitlementLimits": apiData.Limits,
                    "coverageEligibility": apiData.Eligibility,
                    "note": apiData.Description,
                    "benefitTypeId": apiData.type,
                }
            }).then(() => {
                resetStates()
                setShowSuccessModal(true)
            })
        } else {
            if (isAllowed) {
                addBenefits({
                    endpoint: endpoints.Benefits.CreateBenefitByAdmin,
                    data: {
                        "benefitDetails": apiData.Details,
                        "entitlementLimits": apiData.Limits,
                        "coverageEligibility": apiData.Eligibility,
                        "note": apiData.Description,
                        "benefitTypeId": apiData.type,
                    }
                }).then((res) => {
                    console.log("res", res)
                    if (res?.data?.success) {
                        resetStates()
                        toast.success(res?.data?.message)

                    }
                })
            }
        }
    }

    const handleCloseModal = () => {
        setShowSuccessModal(false)
    }

    const handleContinue = () => {
        setShowSuccessModal(false)
        navigate("/Benefits")
    }

    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Benefits"} currentPage={"Benefits"} />

                {/* <div className="managment-action-btns">
                    <Link>
                        <button className="action-button">
                            Add New
                        </button>
                    </Link>
                </div> */}
            </div>

            <div className="form-container">
                <div className="company-details-container">
                    <div className="company-details-row">
                        <div className="company-details">
                            <h3>
                                Add Benefits
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={submitAddBenefits}>
                        <div className="row add-benefits-row">
                            <div className="col-md-5">
                                <div className="login-email-container">
                                    <p>Benefits Type</p>
                                    <Select
                                        options={benefitTypes}
                                        placeholder="-- Select Benefits Type --"
                                        isSearchable={false}
                                        onChange={(e) => setterForApiData('type', e.value)}
                                        value={benefitTypes.find(option => option.value === apiData.type)}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                border: "none",
                                                boxShadow: "none",
                                                padding: "0px",
                                                minHeight: "auto",
                                                backgroundColor: "transparent",
                                            }),
                                            valueContainer: (base) => ({
                                                ...base,
                                                padding: "0px",
                                            }),
                                            indicatorsContainer: (base) => ({
                                                ...base,
                                                padding: "0px",
                                            }),
                                            dropdownIndicator: (base) => ({
                                                ...base,
                                                padding: "0px",
                                                transform: "scale(1.5)",
                                                marginTop: "-20px"
                                            }),
                                            indicatorSeparator: () => ({
                                                display: "none",
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                margin: 0,
                                                padding: 0,
                                            }),
                                            option: (base, { isFocused, isSelected }) => ({
                                                ...base,
                                                backgroundColor: isSelected
                                                    ? "var(--Lavender-Mist)"
                                                    : isFocused
                                                        ? "#f1f1f1"
                                                        : "white",
                                                color: "var(--Jet-Black)",
                                                cursor: "pointer",
                                            }),
                                        }}
                                    />
                                </div>
                                {apiData.error_type && <p className="error">{apiData.error_type}</p>}
                            </div>

                            <div className="col-md-5">
                                <InputField
                                    heading={"Benefit Details"}
                                    placeholder={"Enter Benefit Details"}
                                    value={apiData.Details}
                                    onChange={(e) => setterForApiData("Details", e.target.value)}
                                    error={apiData.error_Details}
                                />
                            </div>

                            <div className="col-md-5">
                                <InputField
                                    heading={"Entitlement Limits"}
                                    placeholder={"Enter Entitlement Limits"}
                                    value={apiData.Limits}
                                    onChange={(e) => setterForApiData("Limits", e.target.value)}
                                    error={apiData.error_Limits}
                                />
                            </div>

                            <div className="col-md-5">
                                <InputField
                                    heading={"Coverage Eligibility"}
                                    placeholder={"Enter Coverage Eligibility"}
                                    value={apiData.Eligibility}
                                    onChange={(e) => setterForApiData("Eligibility", e.target.value)}
                                    error={apiData.error_Eligibility}
                                />
                            </div>

                            <div className="col-md-5">
                                <InputField
                                    heading={"Benefits Description"}
                                    placeholder={"Enter Description"}
                                    value={apiData.Description}
                                    onChange={(e) => setterForApiData("Description", e.target.value)}
                                    error={apiData.error_Description}
                                />
                            </div>
                        </div>
                        <div className="add-benefits-btn">
                            <button type='submit'>{updateBenefitData ? "Update" : "Save"}</button>
                        </div>
                    </form>
                </div>
            </div>

            <SuccessModal
                show={showSuccessModal}
                close={handleCloseModal}
                handleContinue={handleContinue}
                heading={"Successful!"}
                detail={"Successful updated"}
                buttontext={"Close"}
            />
        </div>
    )
}

export default AddBenefits







{/* <div className="row remove-benefits-row">
                        <div className="col-md-5">
                            <InputField heading={"Plan Type"} placeholder={"Enter Category"} />
                        </div>
                        <div className="col-md-5">
                            <InputField heading={"Limit"} placeholder={"Enter Covered Limit"} />
                        </div>
                        <div className="col-md-2">
                            <div className="remove-benefit">
                                <button>
                                    <img src={removeIcon} alt="" />
                                    <p>Remove</p>
                                </button>
                            </div>
                        </div>


                        <div className="col-md-5">
                            <InputField heading={"Plan Type"} placeholder={"Enter Category"} />
                        </div>
                        <div className="col-md-5">
                            <InputField heading={"Limit"} placeholder={"Enter Covered Limit"} />
                        </div>
                        <div className="col-md-2">
                            <div className="remove-benefit">
                                <button>
                                    <img src={removeIcon} alt="" />
                                    <p>Remove</p>
                                </button>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <InputField heading={"Plan Type"} placeholder={"Enter Category"} />
                        </div>
                        <div className="col-md-5">
                            <InputField heading={"Limit"} placeholder={"Enter Covered Limit"} />
                        </div>
                        <div className="col-md-2">
                            <div className="remove-benefit">
                                <button>
                                    <img src={removeIcon} alt="" />
                                    <p>Remove</p>
                                </button>
                            </div>
                        </div>
                    </div> */}

// <div className="col-md-2">
//             <div className="benefits-add-more-btn">
//                 <button className="action-button" type='submit'>Add More</button>
//             </div>
//         </div>