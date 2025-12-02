import React from 'react'
import logoMobile from "../assets/images/igi-logo.png";
import search from "../assets/images/header-search.png";
import notification from "../assets/images/notification-icon.png";
import companySelect from "../assets/images/topbar-select-company.png";
import downArrow from "../assets/images/downward.png";
import Select from 'react-select';
import threeLines from "../assets/images/three-lines.svg"
import { useSelector } from 'react-redux';

const benefitTypes = [
    { value: '1', label: 'Company 1' },
    { value: '2', label: 'Company 2' },
    { value: '3', label: 'Company 3' }
];

function Header() {
    const user = useSelector((state) => state.auth.user);



    return (
        <div className="top-bar">
            <div className="mobile-logo-container">
                <div className="mobile-logo">
                    <img src={logoMobile} alt="" />
                </div>
                <div className="collapse-icon">
                    <img src={threeLines} alt="" />
                </div>
            </div>
            <div className="welcome-text">
                <p>Welcome, Imran Naveed Qureshi</p>
            </div>


            <div className="topbar-actions">
                <div className="topbar-search">
                    <input type="text" placeholder="Search Here" />
                    <img src={search} alt="" />
                </div>
                <div className="topbar-notification">
                    <button className="notification-btn">
                        <img src={notification} alt="" />
                    </button>
                </div>

                <div className="topbar-company-select">
                    <img src={companySelect} alt="Company Icon"
                        className="topbar-company-icon" />
                    <Select
                        options={benefitTypes}
                        placeholder="Select Company"
                        isSearchable={false}
                        styles={{
                            control: (base) => ({
                                ...base,
                                border: "none",
                                boxShadow: "none",
                                padding: "0px",
                                minHeight: "auto",
                                fontSize: "14px",
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
                            }),
                            indicatorSeparator: () => ({
                                display: "none",
                            }),
                            menu: (base) => ({
                                ...base,
                                borderRadius: "8px",
                                overflow: "hidden",
                                width: "max-content"
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
                                // color: "var(--Jet-Black)",
                                color: isSelected ? "var(--Cerise-Pink)" : "var(--Slate-Gray)",
                                cursor: "pointer",
                                fontWeight: isFocused ? "700" : '',
                            }),
                        }}
                    />
                </div>

                <div className="topbar-profile-dropdown">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="profile-name">
                                <div className="profile-initials">
                                    <h4>IN</h4>
                                </div>
                                <div>
                                    <p>Imran Naveed</p>
                                    <p>imran-naveed-8852@gmail.com</p>
                                </div>
                            </div>
                            <img src={downArrow} alt="" />
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header