
import { useEffect, useState } from "react";
import TableView from "../../components/TableView";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { usePostMutation } from "../../api/apiSlice";
import { validationRules } from "../../utils/Validations";
import { endpoints } from "../../api/config";
import useErrorHandlingHook from "../../hooks/useErrorHandlingHook";
import CustomModal from "../../components/Modals/CustomModel/CustomModel";
import { handleFileDownload } from "../../utils/Excel";

const tableHead = [
  { id: "CompanyName", label: "Company Name", searchBox: true },
  { id: "clientCode", label: "Client Code" },
  { id: "effectiveFrom", label: "Effective From" },
  { id: "effectiveTo", label: "Effective To", searchBox: true },
  { id: "contactNumber", label: "Contact Number", searchBox: true },
  { id: "Status", label: "Status" },
];

function CompanyManagment() {
  
  
  
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [getCompanies, { data: getCompaniesData }] = usePostMutation();
  const navigate = useNavigate();
  
  const handleCompanyDetail = () => {
  navigate("/CompanyRegistraion");
  
  };

    const handleUpdateCompanyDetail = (item) => {
  navigate("/CompanyManagment/CompanyRegistration",  { state: { item } });
  console.log(item)
  };

  const handleUpdateCompanyApproval = (item) => {
    setCompanyId(item.id);
    setShow(true);
  };

  const [changeStatus] = usePostMutation();

  const validationSchema = {
    status: [validationRules.required("status")],
  };

  const { resetStates } =
    useErrorHandlingHook(
      {
        status: "",
      },
      validationSchema
    );

  const fetchCompanies = (page) => {
    getCompanies({
      endpoint: endpoints.Company.GetCompanyListByAdmin,
      data: {
          currentPage: page,
        pageSize: 10,
        isAllRecord: false,
      },
    });
  };

 
  
  useEffect(() => {
    fetchCompanies(page);
  }, [page]);

  const handleChangeStatus = (status) => {

    changeStatus({
      endpoint: endpoints.Company.CompanyStatusUpdateByAdmin,
      data: [
        {
          companyId: companyId,
          status: status,
        },
      ],
    }).then(() => {
      fetchCompanies();
      resetStates();
      setShow(false);
    });
  };

  const handleExport = () => {
    if (!tableData || tableData.length === 0) return;
    const dataForExport = tableData.map((item) => ({
      CompanyName: item?.companyName,
      clientCode: item?.clientCode,
      effectiveFrom: item?.effectiveFrom || "----",
      effectiveTo: item?.effectiveTo || "----",
      contactNumber: item?.contactNumber || "----",
      Status:
        item?.status === 1
          ? "Pending"
          : item?.status === 2
          ? "Approved"
          : "Rejected",
    }));

    handleFileDownload(dataForExport, "CompanyManagement");
  };
 const tableData = getCompaniesData?.data?.dataList.map((company) => {
        return {
            CompanyName: company.companyName,
            clientCode: company?.clientCode,
            effectiveFrom: company?.effectiveFrom || "----",
            effectiveTo: company?.effectiveTo || "----",
            contactNumber: company?.contactNumber || "----",
            Status: company?.status == 1 ? "Pending" : company?.status == 2 ? "Approved" : "Rejected",
            ...company, 
        }
    })
  return (
    <div>
      <div className="company-managment-action-row">
        <Breadcrumbs
          title="Company Management"
          currentPage="Company Management"
        />

        <div className="managment-action-btns">
          <button className="action-button">Bulk Upload</button>
          <Link to={"/CompanyManagment/CompanyRegistration"}>
            <button className="action-button">Add New</button>
          </Link>
        </div>
      </div>

      <TableView
        tableHead={tableHead}
        tableData={tableData}
        handleView={handleCompanyDetail}
        searchRow={true}
        filterRow={true}
        handleEdit={handleUpdateCompanyDetail}
        handlemenu={handleUpdateCompanyApproval}
        handleExport={handleExport}

          totalPages={getCompaniesData?.data?.pagination?.totalPages}
                currentPage={getCompaniesData?.data?.pagination?.currentPage}
                onPressPage={(page) => {
                    setPage(page);
                }}
      />

      <CustomModal
        show={show}
        onHide={() => setShow(false)}
        title={"Company Management"}
        handleChangeStatus={handleChangeStatus}
      />
    </div>
  );
}

export default CompanyManagment;
