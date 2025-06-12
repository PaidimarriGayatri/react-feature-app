const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
  },
  button: {
    margin: "10px",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
};

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyle.overlay}>
      <div style={modalStyle.modal}>
        <p>{message}</p>
        <button
          style={{
            ...modalStyle.button,
            backgroundColor: "#007bff",
            color: "#fff",
          }}
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          style={{
            ...modalStyle.button,
            backgroundColor: "#6c757d",
            color: "#fff",
          }}
          onClick={onClose}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Modal;
