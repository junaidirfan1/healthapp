import React from 'react'
import Modal from 'react-bootstrap/Modal';
import FilterIcon from "../../assets/images/cliams-filter.png";
import PDF from "../../assets/images/pdf.png"
import download from "../../assets/images/download.png"
import Eye from "../../assets/images/eye.svg"
import closeIcon from "../../assets/images/closeModal.png";
import { Link } from 'react-router-dom';


function DoctorProcessModal({ show, close }) {
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
                        <h3>Claim#13102</h3>
                    </div>
                    <button onClick={close}><img src={closeIcon} alt='' /></button>
                </div>

                <h3 className="claim-title">Doctor Process</h3>

                <div className="claims-table-container table-responsive">
                    <table className="claims-table">
                        <thead>
                            <tr className="claims-table-lables">
                                <th>Claim No</th>
                                <th>Policy No</th>
                                <th>Member No</th>
                                <th>Dep No</th>
                                <th>Rider</th>
                                <th>Plan No</th>
                                <th>Hospital Code</th>
                                <th>Claimed Amount</th>
                                <th>Deduction</th>
                                <th>Paid Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="claims-table-lables">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="claims-patients-name">
                        <span>Name of Patient (For Which Claim is made)</span>
                        <span>Patient Name</span>
                    </div>
                    <table className="claims-info-table table-responsive">
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>
                                        CNIC
                                    </span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>Services</span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>Description</span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>Comments</span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>Total Amount</span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rayyan Fahim</td>
                                <td>13503-5715363-5</td>
                                <td>Optics</td>
                                <td>Glassess</td>
                                <td>Glassess</td>
                                <td>PKR 1,500.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="claims-table-total claimsProcess-table-total">
                        <h5>Total amount:</h5>
                        <p>PKR 3,350.00</p>
                    </div>
                    <div className="supporting-document-container">
                        <div className="Comments-remarks">
                            <span>Comments /
                                Remarks</span>
                            <input type="text" placeholder="Add Remarks" />
                        </div>
                        <div className="row deducted-box-row">
                            <div className="col-md-3">
                                <div className="deducted-box">
                                    <p>Name</p>
                                    <input type="text" name="" id="" placeholder="Enter Name" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="deducted-box">
                                    <p>Select Type</p>
                                    <select name="" id="">
                                        <option value="">-- Select Category --</option>
                                        <option>option 1</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="deducted-box">
                                    <p>Diagnosis</p>
                                    <input type="text" name="" id="" placeholder="Approved Amount" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="deducted-box">
                                    <p>Remarks</p>
                                    <input type="text" name="" id="" placeholder="Approved Amount" />
                                </div>
                            </div>
                        </div>

                        <div className="view-supporting-container">
                            <p className="document-tittle">View Supporting Documents</p>
                            <div className="row supporting-document-row">
                                <div className="col-md-4">
                                    <div className="claim-doc-box">
                                        <div className="claim-doc-name-contain">
                                            <img src={PDF} alt="PDF" className="claim-doc-icon" />
                                            <span className="claim-doc-name">Rayyan.jpg</span>
                                        </div>
                                        <div className="claim-doc-actions">
                                            <button className="claim-doc-btn"><img src={download}
                                                alt="" /></button>
                                            <button className="claim-doc-btn"><img src={Eye} alt="" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="igi-evaluation-container">
                            <span>IGI Evaluation Remarks:</span>
                            <input type="text" placeholder="IGI Evaluation Remarks" />
                        </div>

                        <div className="claim-modal-btns">
                            <Link><button className="action-button">Proceed</button></Link>
                            <Link><button className="action-button">Required Documents</button></Link>
                            <Link><button className="action-button claim-modal-decline">Decline</button></Link>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default DoctorProcessModal