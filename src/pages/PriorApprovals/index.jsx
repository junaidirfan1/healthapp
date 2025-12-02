import { useEffect, useState } from 'react';
import TableView from '../../components/TableView';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { usePostMutation } from '../../api/apiSlice';
import { endpoints } from '../../api/config';
import Modal from 'react-bootstrap/Modal';
import InputField from '../../components/InputField';
import useErrorHandlingHook from '../../hooks/useErrorHandlingHook';
import { validationRules } from '../../utils/Validations';
import Select from 'react-select'
import PriorApprovalModal from '../../components/Modals/PriorApprovalModal';



const tableHead = [
    {
        id: "PriorApprovalNumber",
        label: "Prior Approval Number",
        searchBox: true,
    },
    {
        id: "PolicyNumber",
        label: "Policy Number",
        searchBox: true,
    },
    {
        id: "PatientName",
        label: "Patient Name"
    },
    {
        id: "SubmissionDate",
        label: "Submission Date",
        searchBox: true,
    },
    {
        id: "AppointmentDate",
        label: "Appointment Date",
        searchBox: true,
    },
    {
        id: "TotalAmount",
        label: "Total Amount"
    },
    {
        id: "Status",
        label: "Status"
    }
]



function PriorApprovals() {
    const [show, setShow] = useState(false);
    const [approvalId, setApprovalId] = useState(null)
    const [showPriorModal, setShowPriorModal] = useState(false)
    const [selectedPrior, setSelectedPrior] = useState(null);



    const validationSchema = {
        remarks: [validationRules.required("remarks")],
        // status: [validationRules.required("status")],
    }

    const { apiData, setterForApiData, checkForError, resetStates } = useErrorHandlingHook({
        remarks: "",
        status: "",
    }, validationSchema)


    const [getPriorApprovals, { data: PriorApprovalsData }] = usePostMutation()

    useEffect(() => {
        getPriorApprovals({
            endpoint: endpoints.PriorApproval.GetAllPriorApprovalByAdmin,
            data: {
                "currentPage": 1,
                "pageSize": 10,
                "isAllRecord": false
            }

        })
    }, [])



    const tableData = PriorApprovalsData?.data?.dataList?.map((item) => ({
        "PriorApprovalNumber": item?.id,
        "PolicyNumber": item?.policyNumber || "----",
        "PatientName": item?.patientName,
        "SubmissionDate": item?.createdOn,
        "AppointmentDate": item?.services[0]?.procedureDate,
        "TotalAmount": `PKR ${item?.services?.reduce((total, service) => total + (service.estimatedCost), 0)}`,
        "Status": item?.status == 1 ? "Pending" : item?.status == 2 ? "Approved" : "Rejected",
        ...item
    })) || [];


    const handleClose = () => setShow(false);


    const handleUpdatePriorApproval = (item) => {
        console.log("item", item)
        setApprovalId(item.id)
        setShow(true)
    };


    const [changeStatus, { }] = usePostMutation()

    const handleChangeStatus = (statusValue) => {
        const isAllowed = checkForError();
        if (!isAllowed) return;

        changeStatus({
            endpoint: endpoints.PriorApproval.RecordActivity,
            data: {
                "id": approvalId,
                "adminRemarks": apiData.remarks || "",
                "status": statusValue
            }
        }).then(() => {
            getPriorApprovals({
                endpoint: endpoints.PriorApproval.GetAllPriorApprovalByAdmin,
                data: {
                    "currentPage": 1,
                    "pageSize": 10,
                    "isAllRecord": false
                }

            })
            resetStates()
            setShow(false)
        })
    }

    const handleViewPriorApprovals = (priorData) => {
        setSelectedPrior(priorData);
        setShowPriorModal(true)
    }


    const handleCloseModal = () => {
        setShowPriorModal(false)
    }

    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Prior Approval"} currentPage={"Prior Approval"} />

                <div className="managment-action-btns">
                    <Link>
                        <button className="action-button">
                            Add New
                        </button>
                    </Link>
                </div>
            </div>
            <TableView
                tableHead={tableHead}
                tableData={tableData}
                searchRow={true}
                filterRow={true}
                handleEdit={handleUpdatePriorApproval}
                handleView={handleViewPriorApprovals}

            />

            <Modal
                show={show}
                onHide={handleClose}
                centered
                className='user-role-modal'
                size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Prior Approval</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="login-email-container">
                            <p>Remarks</p>
                            <textarea
                                placeholder={"Type Remarks"}
                                value={apiData.remarks}
                                onChange={(e) => setterForApiData("remarks", e.target.value)}
                            />
                        </div>
                        {apiData.error_remarks && <p className="error">{apiData.error_remarks}</p>}
                    </div>

                    <div className='managment-action-btns prior-status-btns'>
                        <button variant="secondary" onClick={() => handleChangeStatus(2)} className='action-button'>
                            Approve
                        </button>
                        <button variant="primary" onClick={() => handleChangeStatus(3)} className='action-button'>
                            Reject
                        </button>
                    </div>
                </Modal.Body>
            </Modal>


            <PriorApprovalModal
                show={showPriorModal}
                close={handleCloseModal}
                selectedPriorApproval={selectedPrior}
            />
        </div>
    )
}

export default PriorApprovals