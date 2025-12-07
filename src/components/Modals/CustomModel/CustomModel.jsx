
import { Modal } from "react-bootstrap";

const CustomModal = ({
  show,
  onHide,
  title,
  handleChangeStatus,
  PriorApproval,
  apiData,
  setterForApiData,
  onChange

}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="user-role-modal"
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update {title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {PriorApproval && (
          <div>
            <div className="login-email-container">
              <p>Remarks</p>
              <textarea
                placeholder={"Type Remarks"}
                value={apiData.remarks}
                onChange={onChange}
              />
            </div>
            {apiData.error_remarks && (
              <p className="error">{apiData.error_remarks}</p>
            )}
          </div>
        )}
        <div className="managment-action-btns prior-status-btns">
          <button
            onClick={() => handleChangeStatus(2)}
            className="action-button"
          >
            Approve
          </button>

          <button
            onClick={() => handleChangeStatus(3)}
            className="action-button"
          >
            Reject
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;