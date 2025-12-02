import Modal from 'react-bootstrap/Modal';
import PDF from "../../assets/images/pdf.png"
import download from "../../assets/images/download.png"
import Eye from "../../assets/images/eye.svg"
import closeIcon from "../../assets/images/closeModal.png";
import FilterIcon from "../../assets/images/cliams-filter.png";
import moment from 'moment';

function PriorApprovalModal({ show, close, selectedPriorApproval }) {
    if (!selectedPriorApproval) return null;
    console.log("selectedPriorApproval",)

    const totalClaimsAmount = selectedPriorApproval?.services?.reduce(
        (sum, item) => sum + (item.estimatedCost || 0),
        0
    );

    return (
        <Modal
            className="claim-modal"
            show={show}
            onHide={close}
            size="xl"
            centered
        >
            <Modal.Body>
                <div className="modal-header">
                    <div className="claim-header">
                        {/* <h3>Claim# 26485</h3> */}
                    </div>
                    <button onClick={close}><img src={closeIcon} alt='' /></button>
                </div>

                <h3 className="claim-title">Prior Approval</h3>

                <div className="claims-table-container table-responsive">
                    <table className="claims-table">
                        <thead>
                            <tr className="claims-table-lables">
                                <th>Claim No</th>
                                <th>Policy No</th>
                                <th>Member CNIC</th>
                                <th>Claimed Amount</th>
                                <th>Coverage Type</th>
                                <th>Hospital</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="claims-table-lables">
                                <td>{selectedPriorApproval.id}</td>
                                <td>{selectedPriorApproval.policyNumber}</td>
                                <td>{selectedPriorApproval.cnic || "----"}</td>
                                <td>{totalClaimsAmount}</td>
                                <td>IPD</td>
                                <td>{selectedPriorApproval.hospital || "----"}</td>
                                <td>{selectedPriorApproval.status}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="claims-patients-name">
                        <span>Name of Patient:</span>
                        <span>{selectedPriorApproval.PatientName}</span>
                    </div>
                    <table className="claims-info-table table-responsive">
                        <thead>
                            <tr>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>
                                        procedureDate
                                    </span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>Services</span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>Description/Remarks</span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>estimatedCost</span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedPriorApproval?.services?.map((prior, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{prior?.procedureDate ? moment(prior?.procedureDate, "YYYY-MM-DD").format("DD/MMM/YYYY") : "--"}</td>
                                            <td>{prior?.serviceName}</td>
                                            <td>{prior?.description}</td>
                                            <td>{prior?.estimatedCost}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <div className="claims-table-total">
                        <h5>Total amount:</h5>
                        <p>PKR: {totalClaimsAmount}</p>
                    </div>
                    <div className="supporting-document-container">
                        <p className="document-tittle">View Supporting Documents</p>
                        <div className="row claim-docs-grid-container">


                            {
                                selectedPriorApproval?.attachements?.map((attachement, index) => {
                                    return (
                                        <div className="col-md-5 col-4">
                                            <div className="claim-doc-box">
                                                <div className="claim-doc-name-contain">
                                                    <img src={PDF} alt="PDF" className="claim-doc-icon" />
                                                    <span className="claim-doc-name">{attachement.fileName}</span>
                                                </div>
                                                <div className="claim-doc-actions">
                                                    <button className="claim-doc-btn">
                                                        <img src={download} alt="" />
                                                    </button>
                                                    <button className="claim-doc-btn">
                                                        <img src={Eye} alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PriorApprovalModal