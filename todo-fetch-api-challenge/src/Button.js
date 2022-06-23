const Button = ({ buttonText, reqType, setReqType }) => {
  return (
    <button
      type="button"
      className={buttonText === reqType ? "selected" : null}
      onClick={() => setReqType(buttonText)}
    >
      {buttonText}
    </button>
  );
};

export default Button;
