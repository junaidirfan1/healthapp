// import React from 'react'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
// import Dashboard from '../pages/Dashboard'
// import { Routes, Route } from "react-router-dom";
// import CompanyManagment from '../pages/CompanyManagment';
// import Footer from '../components/Footer';
// import EmployeeManagement from '../pages/EmployeeManagement';
// import HospitalDiscountedCenters from '../pages/HospitalDiscountedCenters';
// import Benefits from '../pages/Benefits';
// import ClaimsUsers from '../pages/ClaimsUsers';
// import PriorApprovals from '../pages/priorApprovals';
// import HospitalizationBenefits from '../pages/HospitalizationBenefits';
// import MaternityBenefits from '../pages/MaternityBenefits';
// import AddHospital from '../pages/AddHospital';
// import AddBenefits from '../pages/AddBenefits';
// import CompanyRegistraion from '../pages/CompanyRegistraion';
// import EmployeeDetail from '../pages/EmployeeDetail';
// import UserRights from '../pages/UserRights';


// function AppRouting() {
//     return (
//         <div className="container-fluid">
//             <div className='row body-row'>
//                 <Sidebar />
//                 <div className="col-md-10 no-padding">
//                     <div className="body-container">
//                         <Header />
//                         <div className="inner-body-container">
//                             <Routes>
//                                 <Route exact path="/" element={<Dashboard />} />
//                                 <Route exact path="/CompanyManagment" element={<CompanyManagment />} />
//                                 <Route exact path="/EmployeeManagment" element={<EmployeeManagement />} />
//                                 <Route exact path="/HospitalDiscountedCenters" element={<HospitalDiscountedCenters />} />
//                                 <Route path="/Benefits">
//                                     <Route index element={<Benefits />} />
//                                     <Route path="HospitalizationBenefits" element={<HospitalizationBenefits />} />
//                                     <Route path="MaternityBenefits" element={<MaternityBenefits />} />
//                                 </Route>
//                                 <Route exact path="/ClaimsUsers" element={<ClaimsUsers />} />
//                                 <Route exact path="/PriorApprovals" element={<PriorApprovals />} />
//                                 <Route exact path="/AddHospital" element={<AddHospital />} />
//                                 <Route exact path="/AddBenefits" element={<AddBenefits />} />
//                                 <Route exact path="/CompanyRegistraion" element={<CompanyRegistraion />} />
//                                 <Route exact path="/EmployeeDetail" element={<EmployeeDetail />} />
//                                 <Route exact path="/UserRights" element={<UserRights />} />
//                             </Routes>
//                         </div>
//                         <Footer />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AppRouting





import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Dashboard from '../pages/Dashboard'
import { Routes, Route } from "react-router-dom";
import CompanyManagment from '../pages/CompanyManagment';
import Footer from '../components/Footer';
import EmployeeManagement from '../pages/EmployeeManagement';
import HospitalDiscountedCenters from '../pages/HospitalDiscountedCenters';
import Benefits from '../pages/Benefits';
import ClaimsUsers from '../pages/ClaimsUsers';
import PriorApprovals from '../pages/priorApprovals';
import HospitalizationBenefits from '../pages/HospitalizationBenefits';
import MaternityBenefits from '../pages/MaternityBenefits';
import AddHospital from '../pages/AddHospital';
import AddBenefits from '../pages/AddBenefits';
import EmployeeDetail from '../pages/EmployeeDetail';
import UserRights from '../pages/UserRights';
import CreateUser from '../pages/CreateUser';
import CompanyRegistration from '../pages/CompanyManagment/CompanyRegistration';


function AppRouting() {
    return (
        <div className="container-fluid">
            <div className='row body-row'>
                <Sidebar />
                <div className="col-md-10 no-padding">
                    <div className="body-container">
                        <Header />
                        <div className="inner-body-container">
                            <Routes>
                                <Route exact path="/" element={<Dashboard />} />
                                <Route exact path="/CompanyManagment" element={<CompanyManagment />} />
                                <Route exact path="/EmployeeManagment" element={<EmployeeManagement />} />
                                <Route exact path="/HospitalDiscountedCenters" element={<HospitalDiscountedCenters />} />

                                <Route path="/Benefits" element={<Benefits />} />
                                <Route path="HospitalizationBenefits" element={<HospitalizationBenefits />} />
                                <Route path="MaternityBenefits" element={<MaternityBenefits />} />

                                <Route exact path="/ClaimsUsers" element={<ClaimsUsers />} />
                                <Route exact path="/PriorApprovals" element={<PriorApprovals />} />
                                <Route exact path="/AddHospital" element={<AddHospital />} />
                                <Route exact path="/AddBenefits" element={<AddBenefits />} />
                               <Route exact path='/CompanyManagment/CompanyRegistration' element={<CompanyRegistration/>} />
                                <Route exact path="/EmployeeDetail" element={<EmployeeDetail />} />
                                <Route exact path="/UserRights" element={<UserRights />} />
                                <Route exact path="/CreateUser" element={<CreateUser />} />
                                <Route path="*" element={<div>Page not found</div>} />

                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppRouting