export const endpoints = {
    auth: {
        login: "Account/Login",
        resendOtp: "Account/Resend-Otp",
        RegisterUser: "Account/RegisterUser",
        ResendOtp: "Account/Resend-Otp",
        SetPassword: "Account/SetPassword",
        CreateUserByAdmin: "Account/CreateUserByAdmin",
        VerifyOtp: "Account/Verify-Otp"
    },
    claims: {
        getClaim: "ClaimProcess/GetAllClaims",
        getClaimDetailsByClaimId: "ClaimProcess/getClaimDetailsByClaimId",

    },
    roles: {
        getAllRoles: "RolesManagement/GetAllRoles",
        GetAllRightsBasedOnRole: "RolesManagement/GetAllRightsBasedOnRole",
        UpdateAllRightsBasedOnRoleId: "RolesManagement/UpdateAllRightsBasedOnRoleId",
        CreateRightRoles: "RolesManagement/CreateRight",
        AddRoleByAdmin: "RolesManagement/AddRoleByAdmin",
    },
    DiscountCenterAndHospital: {
        GetAllDiscountCentersOrHospitals: "DiscountCenterAndHospital/GetAllDiscountCentersOrHospitals",
        AddDiscountCenterOrHospital: "DiscountCenterAndHospital/AddDiscountCenterOrHospital",
        DeleteDiscountCenterOrHospital: "DiscountCenterAndHospital/DeleteDiscountCenterOrHospital",
        UpdateDiscountCenterOrHospital: "DiscountCenterAndHospital/UpdateDiscountCenterOrHospital",
        GetAllCities: "DiscountCenterAndHospital/GetAllCities",
    },
    Benefits: {
        GetBenefitListByAdmin: "Benefit/GetBenefitListByAdmin",
        GetBenefitTypeList: "Benefit/GetBenefitTypeList",
        CreateBenefitByAdmin: "Benefit/CreateBenefitByAdmin",
        DeleteBenefitsByAdmin: "Benefit/DeleteBenefitsByAdmin",
        UpdateBenefitByAdmin: "Benefit/UpdateBenefitByAdmin",
        GetPolicyList: "Benefit/GetPolicyList",
        GetBenefitsByType: "Benefit/GetBenefitsByType",
    },
    PriorApproval: {
        GetAllPriorApprovalByAdmin: "PriorApproval/GetAllPriorApprovalByAdmin",
        RecordActivity: "PriorApproval/RecordActivity",

    },
    Company: {
        CreateCompany: "Company/CreateCompany",
        UpdateCompanyDetail: "Company/UpdateCompanyDetail",
        GetCompanyListByAdmin: "Company/GetCompanyListByAdmin",
        CompanyStatusUpdateByAdmin :"Company/CompanyStatusUpdateByAdmin",
        GetCompanyDetail:"Company/GetCompanyDetail",
        GetCompanyClientCode: "Company/GetCompanyClientCode"
    }
};

export const signalRConnetionURL = import.meta.env.VITE_signalRConnetion_URL;