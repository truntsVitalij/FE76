const Button = ({ children }) => {
  return (
    <button
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
