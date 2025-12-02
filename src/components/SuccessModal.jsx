import React from 'react'
import closeIcon from "../assets/images/closeModal.png";
import modalIcon from "../assets/images/forgot-password.png";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function SuccessModal({ show, close, handleContinue, heading, detail, buttontext }) {
    return (
        <Modal
            className="confirmationModal"
            show={show}
            onHide={close}
            size="lg"
            centered
        >
            <Modal.Body>
                <div className="confirmationModalClose">
                    <button onClick={close}>
                        <img src={closeIcon} alt="" />
                    </button>
                </div>
                <div className="confirmationModal-icon">
                    <img src={modalIcon} alt="success" />
                </div>

                <h2 className="confirmationModal-title">{heading}</h2>
                <p className="confirmationModal-message">
                    {detail}
                </p>

                <button type='button' onClick={handleContinue} className="confirmationModal-login-btn action-button">
                    {buttontext}
                </button>
            </Modal.Body>
        </Modal>
    )
}

export default SuccessModal





{/* <div className="modal fade confirmationModal" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="confirmationModalClose">
                            <button type="button" data-bs-dismiss="modal">
                                <img src={closeIcon} alt="" />
                            </button>
                        </div>
                        <div className="confirmationModal-icon">
                            <img src={modalIcon} alt="success" />
                        </div>

                        <h2 className="confirmationModal-title">Successful!</h2>
                        <p className="confirmationModal-message">
                            Your password has been changed successfully.
                        </p>

                        <Link>
                            <button className="confirmationModal-login-btn action-button">
                                Continue To Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div> */}



{/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}