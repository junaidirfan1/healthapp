import { useEffect, useState } from 'react'
import TableView from '../../components/TableView';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { usePostMutation } from '../../api/apiSlice';
import { endpoints } from '../../api/config';



const tableHead = [
    {
        id: "CompanyName",
        label: "Company Name",
        searchBox: true
    },
    {
        id: "clientCode",
        label: 'Client Code'
    },
    {
        id: "effectiveFrom",
        label: "Effective From"
    },
    {
        id: "effectiveTo",
        label: "Effective To",
        searchBox: true
    },
    {
        id: "contactNumber",
        label: "Contact Number",
        searchBox: true
    },
    {
        id: "Status",
        label: "Status"
    },
]


function CompanyManagment() {
    const [searchData, setSearchData] = useState("");
    const navigate = useNavigate();

    const handleCompanyDetail = (item) => {
        navigate("/CompanyRegistraion", { state: { item } })
    }

    const [getCompanies, { data: getCompaniesData }] = usePostMutation()

    useEffect(() => {
        getCompanies({
            endpoint: endpoints.Company.GetCompanyListByAdmin,
            data: {
                "currentPage": 1,
                "pageSize": 10,
                "isAllRecord": false
            }
        })
    }, [])

    console.log("getCompaniesData", getCompaniesData)

    const tableData = getCompaniesData?.data?.dataList.map((company) => {
        return {
            CompanyName: company.companyName,
            clientCode: company?.clientCode,
            effectiveFrom: company?.effectiveFrom || "----",
            effectiveTo: company?.effectiveTo || "----",
            contactNumber: company?.contactNumber || "----",
            Status: company?.status == 1 ? "Pending" : company?.status == 2 ? "Approved" : "Rejected",
        }
    })

    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Company Management"} currentPage={"Company Management"} />
                <div className="managment-action-btns">
                    <button className="action-button">Bulk Upload</button>
                    <Link to={""}><button className="action-button">Add New</button></Link>
                </div>
            </div>

            <TableView tableHead={tableHead} tableData={tableData} handleView={handleCompanyDetail} searchRow={true} filterRow={true} />
        </div>
    )
}

export default CompanyManagment