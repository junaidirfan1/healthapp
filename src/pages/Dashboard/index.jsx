import ThreeDots from "../../assets/images/3-dots-vertical.png";
import RegisterCompany from "../../assets/images/dashboard-card-register-company.png";
import PriorApproval from "../../assets/images/dashboard-card-prior-approval.png";
import RejectedClaims from "../../assets/images/dashboard-card-rejected-claims.png";
import PriorStatistics from "../../assets/images/dashboard-priorApproval-icon.png";
import ClaimsChart from './components/ClaimsChart';
import PriorApprovalsChart from './components/PriorApprovalsChart';
import { useSelector } from 'react-redux';
import TableView from '../../components/TableView';
import { Link } from 'react-router-dom';
import { usePostMutation } from "../../api/apiSlice";
import { endpoints } from "../../api/config";
import { useEffect } from "react";


// const tableHead = [
//     {
//         id: 1,
//         label: "Plan Name"
//     },
//     {
//         id: 2,
//         label: "Benefits"
//     },
// ]


const tableHead = [
    {
        id: 1,
        label: "Benefit Type"
    },
    {
        id: 2,
        label: "Benefits",
        searchBox: true,
    },

    {
        id: 3,
        label: "Entitlement Limits"
    },
    {
        id: 4,
        label: "Coverage Eligibility"
    },
    {
        id: 5,
        label: "Description"
    },
]

// const tabledata = [
//     {
//         1: 'Basic Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
//     {
//         1: 'Standard Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
//     {
//         1: 'Premium Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
//     {
//         1: 'Basic Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
//     {
//         1: 'Standard Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
//     {
//         1: 'Premium Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
//     {
//         1: 'Basic Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
//     {
//         1: 'Standard Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
//     {
//         1: 'Premium Plan',
//         2: [
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//             "Daily Room Limit",
//             "Dental/Optical/Psych",
//             "Per Disability Limit",
//         ],
//     },
// ];


// const ClassName = {
//     0: "benefits-Light-Cyan",
//     1: "benefits-Pale-Azure",
//     2: "benefits-Peach-Cream",
// };

// const BenefitsData = tabledata.map((item) => ({
//     1: item[1],
//     2: (
//         <span className="benefits-td">
//             {item[2].map((_item, _index) => (
//                 <span key={_index} className={ClassName[_index % 3]}>
//                     {_item}
//                 </span>
//             ))}
//         </span>
//     ),
// }));


function Dashboard() {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);


    const [getBenefits, { data: getBenefitsData }] = usePostMutation()

    useEffect(() => {
        getBenefits({
            endpoint: endpoints.Benefits.GetBenefitListByAdmin,
            data: {
                "currentPage": 1,
                "pageSize": 10,
                "isAllRecord": false
            }
        })
    }, [])

    const tableData = getBenefitsData?.data?.dataList?.map((item) => ({
        1: item?.benefitType?.benefitTypeName,
        2: item?.benefitDetails,
        3: item?.entitlementLimits,
        4: item?.coverageEligibility,
        5: item?.note,
        ...item
    })) || [];



    return (
        <div>
            <div className="row dashboard-cards-row">
                <div className="col-md-4 col-6">
                    <div className="dashboard-cards">
                        <div className="dashboard-card-icon">
                            <img src={RegisterCompany} alt="" />
                        </div>
                        <div className="dashboard-card-info">
                            <div className="dashboard-card-title">
                                <h3>Registered Companies</h3>
                            </div>
                            <div className="dashboard-card-value">
                                <h2>32</h2>
                            </div>
                        </div>
                        <div className="dashboard-card-dots">
                            <Link to={"/CompanyManagment"}>
                                <img src={ThreeDots} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-6">
                    <div className="dashboard-cards">
                        <div className="dashboard-card-icon">
                            <img src={PriorApproval} alt="" />
                        </div>
                        <div className="dashboard-card-info">
                            <div className="dashboard-card-title">
                                <h3>Prior Approvals</h3>
                            </div>
                            <div className="dashboard-card-value">
                                <h2>120</h2>
                            </div>
                        </div>
                        <div className="dashboard-card-dots">
                            <Link to={"/PriorApprovals"}>
                                <img src={ThreeDots} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-6">
                    <div className="dashboard-cards">
                        <div className="dashboard-card-icon">
                            <img src={RejectedClaims} alt="" />
                        </div>
                        <div className="dashboard-card-info">
                            <div className="dashboard-card-title">
                                <h3>Rejected Claims</h3>
                            </div>
                            <div className="dashboard-card-value">
                                <h2>983</h2>
                            </div>
                        </div>
                        <div className="dashboard-card-dots">
                            <Link to={"/ClaimsUsers"}>
                                <img src={ThreeDots} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row dashboard-chart-row">
                <div className="col-md-8">
                    <div className="dashboard-claims-card">
                        <div className="statistics-claims-header-row">
                            <div className="claim-chart-info">
                                <h4>Statistics</h4>
                                <h3>Claims</h3>
                            </div>
                            <div className="dashboard-claims-tab">
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-home-tab"
                                            data-bs-toggle="pill" data-bs-target="#pills-Daily"
                                            type="button" role="tab" aria-controls="pills-Daily"
                                            aria-selected="true">Daily</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab"
                                            data-bs-toggle="pill" data-bs-target="#pills-Weekly"
                                            type="button" role="tab" aria-controls="pills-Weekly"
                                            aria-selected="false">Weekly</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact-tab"
                                            data-bs-toggle="pill" data-bs-target="#pills-Monthly"
                                            type="button" role="tab" aria-controls="pills-Monthly"
                                            aria-selected="false">Monthly</button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact-tab"
                                            data-bs-toggle="pill" data-bs-target="#pills-Yearly"
                                            type="button" role="tab" aria-controls="pills-Yearly"
                                            aria-selected="false">Yearly</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-Daily" role="tabpanel"
                                    aria-labelledby="pills-home-tab">
                                    <ClaimsChart />
                                </div>
                                <div className="tab-pane fade" id="pills-Weekly" role="tabpanel"
                                    aria-labelledby="pills-profile-tab">..sdbmc.</div>
                                <div className="tab-pane fade" id="pills-Monthly" role="tabpanel"
                                    aria-labelledby="pills-contact-tab">...jsdfjkc</div>
                                <div className="tab-pane fade" id="pills-Yearly" role="tabpanel"
                                    aria-labelledby="pills-contact-tab">...jsdfjkc</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dashboard-claims-card prior-approvals-card">
                        <div className="statistics-prior-header-row">
                            <div className="claim-chart-info">
                                <h4>Statistics</h4>
                                <h3>Prior Approvals</h3>
                            </div>
                            <div className="prior-approvals-btn">
                                <button>
                                    <img src={PriorStatistics} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="dashboard-prior-doughnut-chart">
                            <PriorApprovalsChart />
                            <div id="customLegend"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="benefits-section">
                <div className="benefits-section-header">
                    <h3>Benefits</h3>
                    <Link to={"/Benefits"}>View All</Link>
                </div>
                <TableView tableHead={tableHead} tableData={tableData.slice(0, 5)} />
            </div>
        </div>
    )
}

export default Dashboard