import React from 'react'
import Modal from 'react-bootstrap/Modal';
import FilterIcon from "../../assets/images/cliams-filter.png";
import PDF from "../../assets/images/pdf.png"
import download from "../../assets/images/download.png"
import Eye from "../../assets/images/eye.svg"
import closeIcon from "../../assets/images/closeModal.png";
import { Link } from 'react-router-dom';

function FinanceProcessModal({ show, close }) {
    return (
        <Modal
            className="claim-modal"
            show={show}
            onHide={close}
            size="xl"
            centered>
            <Modal.Body>
                <div class="modal-header">
                    <div class="claim-header">
                        <h3>Claim#358</h3>
                    </div>
                    <button><img src={closeIcon} alt='' /></button>
                </div>

                <h3 class="claim-title">Finance Process</h3>

                <div class="claims-table-container table-responsive">
                    <table class="claims-table">
                        <thead>
                            <tr class="claims-table-lables">
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
                            <tr class="claims-table-lables">
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
                    <div class="claims-patients-name">
                        <span>Name of Patient (For Which Claim is made)</span>
                        <span>Patient Name</span>
                    </div>
                    <table class="claims-info-table table-responsive">
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
                                <td>Saher Nazir</td>
                                <td>36502-1291362-0</td>
                                <td>Dental</td>
                                <td>Wisdom Teeth Extract...</td>
                                <td>Decline as requested..</td>
                                <td>PKR 6,800.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="claims-table-total claimsProcess-table-total">
                        <h5>Total amount:</h5>
                        <p>PKR 6,800.00</p>
                    </div>
                    <div class="doctors-remarks">
                        <span>IGI Doctor Remarks:</span>
                        <input type="text" />
                    </div>
                    <table class="claims-info-table table-responsive">
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>
                                        Services
                                    </span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>Diagnosis</span>
                                </td>
                                <td>
                                    <img src={FilterIcon} alt="" />
                                    <span>Description</span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Saher Nazir</td>
                                <td>General Medicine</td>
                                <td>---</td>
                                <td>Declined as requested by employee...</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="supporting-document-container">

                        <div class="row deducted-box-row">
                            <div class="col-md-3">
                                <div class="deducted-box">
                                    <p>Deducted Reason</p>
                                    <input type="text" name="" id="" placeholder="---" />
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="deducted-box">
                                    <p>Deducted Amount</p>
                                    <input type="number" name="" id="" placeholder="0" />
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="deducted-box">
                                    <p>Approved Amount</p>
                                    <input type="text" name="" id="" placeholder="Approved Amount" />
                                </div>
                            </div>
                        </div>

                        <div class="view-supporting-container">
                            <p class="document-tittle">View Supporting Documents</p>
                            <div class="row supporting-document-row">
                                <div class="col-md-4">
                                    <div class="claim-doc-box">
                                        <div class="claim-doc-name-contain">
                                            <img src={PDF} alt="PDF" class="claim-doc-icon" />
                                            <span class="claim-doc-name">M.Maier-medical-jan25.jpg</span>
                                        </div>
                                        <div class="claim-doc-actions">
                                            <button class="claim-doc-btn"><img src={download}
                                                alt="" /></button>
                                            <button class="claim-doc-btn"><img src={Eye} alt="" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row Evaluation-row">
                            <div class="col-md-4">
                                <div class="deducted-box">
                                    <p>IGI Evaluation Remarks:</p>
                                    <input type="text" name="" id="" placeholder="Processed" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="deducted-box">
                                    <p>IGI Evaluation Remarks:</p>
                                    <input type="number" name="" id="" placeholder="Approved Amount" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="deducted-box">
                                    <p>Claim Paid Date/Time</p>
                                    <input type="date" name="" id="" />
                                </div>
                            </div>
                        </div>

                        <div class="claim-modal-btns">
                            <Link><button class="action-button">Submit</button></Link>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default FinanceProcessModal