import { Nav } from 'react-bootstrap';
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../redux/authSlice';
import { useEffect, useState } from "react";

import logo from "../assets/images/igi-logo.png";
import dashboard from "../assets/images/sidebar-dashboard-icon.png";
import companyManagement from "../assets/images/sidebar-company-managment.png";
import employeeManagement from "../assets/images/sidebar-employee-managment.png";
import claimsSummary from "../assets/images/sidebar-claim-summary.png";
import benefits from "../assets/images/sidebar-claim-summary.png";
import hospitalCenter from "../assets/images/sidebar-hospital-center.png";
import generalSettings from "../assets/images/sidebar-general-setting.png";
import changePassword from "../assets/images/sidebar-change-password.png";
import currentClaim from "../assets/images/sidebar-hospitalization-icon.png";
import priorApproval from "../assets/images/sidebar-prior-approvals.png";
import hospitalization from "../assets/images/sidebar-hospitalization-icon.png";
import maternity from "../assets/images/sidebar-maternity-icon.png";
import logout from "../assets/images/sidebar-logout.png";
import downArrow from "../assets/images/downward.png";




function Sidebar() {
    const [sidebarItems, setSideBarItems] = useState([
        {
            title: "Dashboard",
            icon: dashboard,
            page: "Dashboard",
            path: "/"
        },
        {
            title: "Company Management",
            icon: companyManagement,
            page: "CompanyManagment",
            path: "/CompanyManagment"
        },
        {
            title: "Employee Management",
            icon: employeeManagement,
            page: "EmployeeManagment",
            path: "/EmployeeManagment"
        },
        {
            title: "Create User",
            icon: employeeManagement,
            page: "CreateUser",
            path: "/CreateUser"
        },
        {
            title: "User Rights",
            icon: employeeManagement,
            page: "UserRights",
            path: "/UserRights"
        },
        {
            title: "Claims summary",
            icon: claimsSummary,
            page: "Claims",
            dropdown: [
                {
                    title: "View Current Claims",
                    icon: currentClaim,
                    path: "/ClaimsUsers"
                },
                {
                    title: "Prior Approvals",
                    icon: priorApproval,
                    path: "/PriorApprovals"
                },
            ],
        },
        {
            title: "Benefits",
            icon: benefits,
            page: "Benefits",
            path: "/benefits"
        },
        // {
        //     title: "Benefits Summary",
        //     icon: benefits,
        //     page: "Benefits",
        //     dropdown: [
        //         {
        //             title: "Benefits",
        //             icon: benefits,
        //             path: "/Benefits"
        //         },
        //         {
        //             title: "Hospitalization",
        //             icon: hospitalization,
        //             path: "/HospitalizationBenefits"
        //         },
        //         {
        //             title: "Maternity",
        //             icon: maternity,
        //             path: "/MaternityBenefits"
        //         },
        //     ],
        // },
        {
            title: "Hospital & Discounted Center",
            icon: hospitalCenter,
            page: "HospitalCenters",
            path: "/HospitalDiscountedCenters"
        },
    ])
    const { rights } = useSelector(state => state.auth)
    const [openMenu, setOpenMenu] = useState(null);
    const [generalSettingsChild, setGeneralSettingsChild] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {

        if (rights?.length > 0) {
            let filteredData = sidebarItems?.filter((item) => {
                let isPresent = rights?.some((_item) => _item?.page == item?.page)
                if (isPresent) {
                    return item
                }
            })
            setSideBarItems(filteredData)
        }
    }, [rights])

    const handlelogout = () => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate("/");
    };

    const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);

    return (
        <div className="col-md-2 cs-mobile-menu hidden-element sidebar no-padding">
            <div className="sidebar-container">
                <div className="sidebar-inside-box">
                    <div className="sidebar-close">
                        <img src="assets/images/close-icon.svg" alt="close-icon" />
                    </div>
                    <div className="sidebar-logo">
                        <NavLink to="/">
                            <img src={logo} alt="Logo" />
                        </NavLink>
                    </div>

                    <div className="navigation-container">
                        <Nav as="ul">
                            {sidebarItems.map((item, idx) => (
                                <Nav.Item as="li" key={idx} className={openMenu === item.title ? "claim-summary-li" : ""}>
                                    {!item.dropdown ? (
                                        <NavLink to={item.path}>
                                            <span className="navigation-alignment">
                                                <img src={item.icon} alt="" />
                                                <h5>{item.title}</h5>
                                            </span>
                                        </NavLink>
                                    ) : (
                                        <>
                                            <span className="navigation-first-li" onClick={() => toggleMenu(item.title)}>
                                                <span className="navigation-alignment">
                                                    <img src={item.icon} alt="" />
                                                    <h5>{item.title}</h5>
                                                </span>
                                                <span className="navigation-down-icon claim-summary-dropdown">
                                                    <button>
                                                        <img src={downArrow} alt="" />
                                                    </button>
                                                </span>
                                            </span>
                                            {openMenu === item.title && (
                                                <ul className={`${item.title.toLowerCase().replace(" ", "-")}-navigation-ul`}>
                                                    {item.dropdown.map((child, cidx) => (
                                                        <li key={cidx}>
                                                            <NavLink to={child.path}>
                                                                <span className="navigation-alignment">
                                                                    <img src={child.icon} alt="" />
                                                                    <h5>{child.title}</h5>
                                                                </span>
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </Nav.Item>
                            ))}
                        </Nav>
                    </div>
                </div>

                {/* <div className="navigation-container">
                    <Nav as="ul">
                        <Nav.Item as="li" className="general-setting-li">
                            <span className="navigation-first-li">
                                <span className="navigation-alignment">
                                    <img src={generalSettings} alt="" />
                                    <h5>General Settings</h5>
                                </span>
                                <div className="navigation-down-icon claim-summary-dropdown">
                                    <button onClick={() => setGeneralSettingsChild(!generalSettingsChild)}>
                                        <img src={downArrow} alt="" />
                                    </button>
                                </div>
                            </span>
                        </Nav.Item>
                        {generalSettingsChild && (
                            <ul className="benefits-navigation-ul">
                                {generalSettingsItems.map((item, idx) => (
                                    <Nav.Item as="li" key={idx}>
                                        <NavLink to={item.path}>
                                            <span className="navigation-alignment">
                                                <img src={item.icon} alt="" />
                                                <h5>{item.title}</h5>
                                            </span>
                                        </NavLink>
                                    </Nav.Item>
                                ))}
                            </ul>
                        )}

                        <Nav.Item as="li">
                            <Link onClick={handlelogout}>
                                <span className="navigation-alignment">
                                    <img src={logout} alt="" />
                                    <h5>Logout</h5>
                                </span>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </div> */}

                <div className="navigation-container">
                    <Nav as="ul">
                        <Nav.Item as="li" className="general-setting-li">
                            <span className="navigation-first-li">
                                <span className="navigation-alignment">
                                    <img src={generalSettings} alt="" />
                                    <h5>General Settings</h5>
                                </span>
                                <div className="navigation-down-icon claim-summary-dropdown">
                                    <button className="toggle-benefits">
                                        <img src={downArrow} alt="" onClick={() => setGeneralSettingsChild(!generalSettingsChild)} />
                                    </button>
                                </div>
                            </span>
                        </Nav.Item>
                        {
                            generalSettingsChild && (
                                <ul className="benefits-navigation-ul">
                                    <Nav.Item as="li">
                                        <NavLink to="/CreatePassword">
                                            <span className="navigation-alignment">
                                                <img src={changePassword} alt="" />
                                                <h5>Change Password</h5>
                                            </span>
                                        </NavLink>
                                    </Nav.Item>
                                </ul>
                            )
                        }
                        <Nav.Item as="li">
                            <Link onClick={handlelogout}>
                                <span className="navigation-alignment">
                                    <img src={logout} alt="" />
                                    <h5>Logout</h5>
                                </span>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </div>


            </div>
        </div>
    );
}

export default Sidebar;
