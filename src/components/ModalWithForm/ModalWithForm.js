import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Submit",
  title,
  onClose,
  name,
}) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal_type=${name}`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__form_close_button"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit_button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ModalWithForm;
