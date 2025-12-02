import Select from 'react-select'
import Breadcrumbs from '../../components/Breadcrumbs'
import InputField from '../../components/InputField'
import useErrorHandlingHook from '../../hooks/useErrorHandlingHook'
import { validationRules } from '../../utils/Validations'
import { usePostMutation } from '../../api/apiSlice'
import { useEffect } from 'react'
import { endpoints } from '../../api/config'
import { toast } from 'react-toastify'

function CreateUser() {
    const validationSchema = {
        firstName: [validationRules.required("firstName")],
        lastName: [validationRules.required("lastName")],
        roleType: [validationRules.required("roleType")],
        email: [validationRules.required("email")],
        cnic: [validationRules.required("cnic"), validationRules.regex(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "correct Cnic format, 00000-0000000-0")],
        mobileNumber: [validationRules.required("mobileNumber", "Mobile number is required"), validationRules.regex(/^92[3][0-9]{9}$/, "correct format, 923331234567")],
    }

    const { apiData, setterForApiData, checkForError, resetStates } = useErrorHandlingHook({
        roleType: "",
        email: "",
        cnic: "",
        mobileNumber: "",
        firstName: "",
        lastName: "",
    }, validationSchema)


    const [getAllRoles, { data: getRolesData }] = usePostMutation({})

    useEffect(() => {
        getAllRoles({
            endpoint: endpoints.roles.getAllRoles,
            data: {
                "isAllRecord": true
            }
        })
    }, [])

    const roless = getRolesData?.data?.roles?.map((role) => ({
        value: role.roleId,
        label: role.roleName,
        ...role,
    }));


    const [CreateUserRole, { isLoading: userRoleIsLoading }] = usePostMutation()

    const SubmitUser = (e) => {
        e.preventDefault()
        const isValid = checkForError()
        if (!isValid) return
        CreateUserRole({
            endpoint: endpoints.auth.CreateUserByAdmin,
            data: {
                email: apiData.email,
                cnic: apiData.cnic,
                mobileNumber: apiData.mobileNumber,
                roleId: apiData.roleType,
                lastName: apiData.firstName,
                firstName: apiData.lastName
            }
        }).then((res) => {
            if (res?.error) {
                toast.error(res?.error?.data?.message)
                return
            } else {
                toast.success("User Created Successfully")
                resetStates()
            }
        }).catch((err) => {

        })
    }

    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Create User"} currentPage={"Create User"} />
            </div>

            <div className="form-container">
                <div className="company-details-container">
                    <div className="company-details-row">
                        <div className="company-details">
                            <h3>
                                Create User
                            </h3>
                        </div>
                    </div>
                    <form onSubmit={SubmitUser} className='addHospitalForm'>
                        <div className="row add-hospital-row">

                            <div className="col-md-3">
                                <InputField
                                    heading={"First Name"}
                                    placeholder={"Enter First Name"}
                                    value={apiData.firstName}
                                    onChange={(e) => setterForApiData("firstName", e.target.value)}
                                    error={apiData.error_firstName}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Last Name"}
                                    placeholder={"Enter Last Name"}
                                    value={apiData.lastName}
                                    onChange={(e) => setterForApiData("lastName", e.target.value)}
                                    error={apiData.error_lastName}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Email"}
                                    placeholder={"Enter Email"}
                                    value={apiData.email}
                                    onChange={(e) => setterForApiData("email", e.target.value)}
                                    error={apiData.error_email}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Cnic"}
                                    placeholder={"Enter Cnic"}
                                    value={apiData.cnic}
                                    onChange={(e) => setterForApiData("cnic", e.target.value)}
                                    error={apiData.error_cnic}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    heading={"Mobile Number"}
                                    placeholder={"Enter Mobile Number"}
                                    value={apiData.mobileNumber}
                                    onChange={(e) => setterForApiData("mobileNumber", e.target.value)}
                                    error={apiData.error_mobileNumber}
                                />
                            </div>
                            <div className="col-md-3">
                                <div className="login-email-container">
                                    <p>Role Type</p>
                                    <Select
                                        options={roless}
                                        placeholder="Select Role"
                                        isSearchable={false}
                                        onChange={(e) => setterForApiData("roleType", e.value)}
                                        value={roless?.find(option => option.value === apiData.roleType)}
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
                                {apiData.error_roleType && <p className="error">{apiData.error_roleType}</p>}
                            </div>
                        </div>

                        <div className="managment-action-btns">
                            <button type='submit' className='action-button' disabled={userRoleIsLoading ? true : false} style={{ background: userRoleIsLoading ? "grey" : "linear-gradient(#0B4A98, #48C3FF)", }}>
                                {userRoleIsLoading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser