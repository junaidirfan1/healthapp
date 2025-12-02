import TableView from '../../components/TableView'
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';


const tableHead = [
    {
        id: "one",
        label: "Company Name",
        searchBox: true,
    },
    {
        id: "two",
        label: "Employee Name"
    },
    {
        id: "three",
        label: "Contact Number",
        searchBox: true,
    },
    {
        id: "four",
        label: "Email Address",
        searchBox: true,
    },
    {
        id: "five",
        label: "Designation"
    },
    {
        id: "six",
        label: "Status"
    },
]

const tableData = [
    {
        one: 'Systems',
        two: 'Amina Shah',
        three: '0301-1234567',
        four: 'amina.shah@fintechsolutions.com',
        five: 'Marketing Manager',
        six: 'Active',
    },
    {
        one: 'Systems',
        two: 'Amina Shah',
        three: '0301-1234567',
        four: 'amina.shah@fintechsolutions.com',
        five: 'Marketing Manager',
        six: 'Inactive',
    },
    {
        one: 'Systems',
        two: 'Amina Shah',
        three: '0301-1234567',
        four: 'amina.shah@fintechsolutions.com',
        five: 'Marketing Manager',
        six: 'Active',
    },
]


function EmployeeManagement() {
    const navigate = useNavigate();



    const handleEmployeeDetail = (item) => {
        navigate("/EmployeeDetail", { state: { item } })
    }
    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Employee Management"} currentPage={"Employee Management"} />

                <div className="managment-action-btns">
                    <button className="action-button">Bulk Upload</button>
                    <button className="action-button">Add New</button>
                </div>
            </div>

            <TableView tableHead={tableHead} tableData={tableData} handleView={handleEmployeeDetail} searchRow={true} filterRow={true} />
        </div>
    )
}

export default EmployeeManagement