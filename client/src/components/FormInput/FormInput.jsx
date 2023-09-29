import "./formInput.css";

const FormInput = ({ label, validate, errorMessage, ...props }) => {
  return (
    <div className="formInput">
      <label>{label}</label>

      {label === "Username" ? (
        <input className={!validate ? "red" : undefined} {...props} autoFocus />
      ) : (
        <input className={!validate ? "red" : undefined} {...props} />
      )}

      {!validate && <span>{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
