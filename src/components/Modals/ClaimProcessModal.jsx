import Modal from 'react-bootstrap/Modal';
import PDF from "../../assets/images/pdf.png"
import download from "../../assets/images/download.png"
import Eye from "../../assets/images/eye.svg"
import closeIcon from "../../assets/images/closeModal.png";
import FilterIcon from "../../assets/images/cliams-filter.png";
import { useGetQuery } from '../../api/apiSlice';
import { endpoints } from '../../api/config';

function ClaimProcessModal({ show, close, selectedClaimId }) {
    if (!selectedClaimId) return null;

    const { data: claimDetails, isLoading } = useGetQuery(
        `${endpoints.claims.getClaimDetailsByClaimId}?claimId=${selectedClaimId}`
    );

    const totalClaimsAmount = claimDetails?.data?.claimTreatments?.reduce(
        (sum, item) => sum + (item.claimAmount || 0),
        0
    );

    const dedutedAmount = totalClaimsAmount - claimDetails?.data?.totalAmountPaid

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
                        <h3>Claim# {claimDetails?.data?.claimSequence}</h3>
                    </div>
                    <button onClick={close}><img src={closeIcon} alt='' /></button>
                </div>

                <h3 className="claim-title">Claims Process</h3>

                <div className="claims-table-container table-responsive">
                    <table className="claims-table">
                        <thead>
                            <tr className="claims-table-lables">
                                <th>Claim No</th>
                                <th>Policy No</th>
                                <th>Member CNIC</th>
                                <th>Claimed Amount</th>
                                <th>Coverage Type</th>
                                <th>Deducted Amount</th>
                                <th>Deduction Reason</th>
                                <th>Paid Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="claims-table-lables">
                                <td>{claimDetails?.data?.claimId}</td>
                                <td>{claimDetails?.data?.policyNumber}</td>
                                <td>{claimDetails?.data?.cnic}</td>
                                <td>{totalClaimsAmount}</td>
                                <td>{claimDetails?.data?.claimType}</td>
                                <td>{dedutedAmount}</td>
                                <td>{claimDetails?.data?.deductionReason ? claimDetails?.data?.deductionReason : "------"}</td>
                                <td>{claimDetails?.data?.totalAmountPaid}</td>
                                <td>{claimDetails?.data?.status}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="claims-patients-name">
                        <span>Name of Patient (For Which Claim is made)</span>
                        <span>{claimDetails?.data?.patientName}</span>
                    </div>
                    <table className="claims-info-table table-responsive">
                        <thead>
                            <tr>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>
                                        Receipt Number
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
                                    <span>Total Amount</span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                claimDetails?.data?.claimTreatments?.map((treatment, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{treatment.receiptNumber}</td>
                                            <td>{treatment?.treatmentType}</td>
                                            <td>{treatment.treatmentDescription}</td>
                                            <td>PKR {treatment.claimAmount}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="claims-table-total">
                        <h5>Total amount:</h5>
                        <p>PKR {totalClaimsAmount}</p>
                    </div>
                    <div className="supporting-document-container">
                        <p className="document-tittle">View Supporting Documents</p>
                        <div className="row claim-docs-grid-container">
                            <div className="col-md-5 col-4">
                                <div className="claim-doc-box">
                                    <div className="claim-doc-name-contain">
                                        <img src={PDF} alt="PDF" className="claim-doc-icon" />
                                        <span className="claim-doc-name">Enter-promo-code.pdf</span>
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

                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ClaimProcessModal