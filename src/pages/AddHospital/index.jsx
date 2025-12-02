import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import InputField from "../../components/InputField"
import Select from 'react-select'
import useErrorHandlingHook from '../../hooks/useErrorHandlingHook'
import SuccessModal from '../../components/SuccessModal'
import { validationRules } from '../../utils/Validations'
import Breadcrumbs from '../../components/Breadcrumbs'
import { useGetQuery, usePatchMutation, usePostMutation, usePutMutation } from '../../api/apiSlice'
import { endpoints } from '../../api/config'
import { toast } from 'react-toastify'


const hospitalTypes = [
    { value: "1", label: 'Discounted Center' },
    { value: "2", label: 'Hospital' },
]


function AddHospital() {
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const location = useLocation();
    const Navigate = useNavigate()

    const updateHospital = location?.state?.item


    const validationSchema = {
        type: [validationRules.required("Type")],
        province: [validationRules.required("Province")],
        hospital: [validationRules.required("Hospital")],
        address: [validationRules.required('Address')],
        phonenumber: [validationRules.required('Phonenumber')],
        latitude: [validationRules.required('Latitude')],
        longitude: [validationRules.required('Longitude')],
        city: [validationRules.required('City')],
        cityid: [validationRules.required('cityid')],
    }

    const { apiData, setterForApiData, checkForError, resetStates } = useErrorHandlingHook({
        type: updateHospital ? updateHospital?.discountType : "",
        province: updateHospital ? updateHospital?.city?.province : "",
        hospital: updateHospital ? updateHospital?.name : "",
        address: updateHospital ? updateHospital?.address : "",
        phonenumber: updateHospital ? updateHospital?.phoneNumber : "",
        latitude: updateHospital ? updateHospital?.latitude : "",
        longitude: updateHospital ? updateHospital?.longitude : "",
        cityId: updateHospital ? updateHospital?.city?.id : "",
        city: updateHospital ? updateHospital?.city?.name : ""

    }, validationSchema)


    const [addHospital, { data: addHopitalData }] = usePostMutation()

    const [updateHospitalData,] = usePutMutation()


    const submitHospital = (e) => {
        e.preventDefault()
        const isAllowed = checkForError();

        if (updateHospital) {
            updateHospitalData({
                endpoint: endpoints.DiscountCenterAndHospital.UpdateDiscountCenterOrHospital,
                data: {
                    "discountType": Number(apiData.type),
                    "id": updateHospital.id,
                    "name": apiData.hospital,
                    "address": apiData.address,
                    "phoneNumber": apiData.phonenumber,
                    "latitude": apiData.latitude,
                    "longitude": apiData.longitude,
                    "cityId": apiData.cityId
                }
            }).then((res) => {
                resetStates();
                setShowSuccessModal(true)
            }).catch((err) => {
                console.log("err", err)
            })
        } else {
            if (isAllowed) {
                addHospital({
                    endpoint: endpoints.DiscountCenterAndHospital.AddDiscountCenterOrHospital,
                    data: {
                        "discountType": Number(apiData.type),
                        "name": apiData.hospital,
                        "address": apiData.address,
                        "phoneNumber": apiData.phonenumber,
                        "latitude": apiData.latitude,
                        "longitude": apiData.longitude,
                        "cityId": apiData.cityId
                    }
                }).then((res) => {
                    if (res?.data?.success == true) {
                        resetStates();
                        setShowSuccessModal(true)
                    } else {
                        toast.error(res?.error?.data?.message)
                    }
                }).catch((err) => {

                })
            }
        }
    }

    const handleCloseModal = () => {
        setShowSuccessModal(false)
    }

    const handleContinue = () => {
        setShowSuccessModal(false)
        Navigate("/HospitalDiscountedCenters")
    }

    const { data: getAllCitiesData } = useGetQuery(endpoints.DiscountCenterAndHospital.GetAllCities)

    console.log("getAllCitiesData", getAllCitiesData?.data)

    const citiesData = getAllCitiesData?.data?.map((city) => ({
        value: city?.id,
        label: city?.name,
        ...city,
    })) || [];

    console.log("getAllCitiesData", apiData.city)

    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Hospital & Discounted Centers"} currentPage={"Hospital & Discounted Centers"} />
            </div>

            <div className="form-container">
                <div className="company-details-container">
                    <div className="company-details-row">
                        <div className="company-details">
                            <h3>
                                Add Hospital/Discounted Centers
                            </h3>
                        </div>
                    </div>
                    <form onSubmit={submitHospital} className='addHospitalForm'>
                        <div className="row add-hospital-row">
                            <div className="col-md-3">
                                <div className="login-email-container">
                                    <p>Select Type</p>
                                    <Select
                                        options={hospitalTypes}
                                        placeholder="-- Select Type --"
                                        isSearchable={false}
                                        onChange={(e) => setterForApiData("type", e.value)}
                                        value={hospitalTypes.find(option => option.value == apiData.type)}
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
                            <div className="col-md-3">
                                <div className="login-email-container">
                                    <p>City</p>
                                    <Select
                                        options={citiesData}
                                        placeholder="-- Select City --"
                                        onChange={(e) => {
                                            setterForApiData("cityId", e.id)
                                            setterForApiData("city", e.label);
                                            setterForApiData("province", e.province);
                                        }}
                                        value={citiesData.find(option => option.value == apiData.cityId)}
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
                            <div className="col-md-3 province-input">
                                <InputField
                                    heading={"Province"}
                                    placeholder={"Enter Province"}
                                    value={apiData.province}
                                    onChange={(e) => setterForApiData("province", e.target.value)}
                                    error={apiData.error_province}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Hospital/Discounted Center Name"}
                                    placeholder={"Enter Name"}
                                    value={apiData.hospital}
                                    onChange={(e) => setterForApiData("hospital", e.target.value)}
                                    error={apiData.error_hospital}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Address"}
                                    placeholder={"Enter Address"}
                                    value={apiData.address}
                                    onChange={(e) => setterForApiData("address", e.target.value)}
                                    error={apiData.error_address}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Phone Number"}
                                    placeholder={"Enter Phone Number"}
                                    value={apiData.phonenumber}
                                    onChange={(e) => setterForApiData("phonenumber", e.target.value)}
                                    error={apiData.error_phonenumber}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Latitude"}
                                    placeholder={"Enter Latitude"}
                                    value={apiData.latitude}
                                    onChange={(e) => setterForApiData("latitude", e.target.value)}
                                    error={apiData.error_latitude}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Longitude"}
                                    placeholder={"Enter Longitude"}
                                    value={apiData.longitude}
                                    onChange={(e) => setterForApiData("longitude", e.target.value)}
                                    error={apiData.error_longitude}
                                />
                            </div>


                        </div>

                        <div className="add-benefits-btn">
                            {/* <button>Cancel</button> */}
                            <button type='submit'>Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <SuccessModal
                show={showSuccessModal}
                close={handleCloseModal}
                handleContinue={handleContinue}
                heading={"Successful!"}
                detail={"Successful added"}
                buttontext={"Close"}
            />
        </div>
    )
}

export default AddHospital