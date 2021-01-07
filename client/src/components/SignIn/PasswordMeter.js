import React from "react";
import zxcvbn from "zxcvbn";

const PasswordMeter = ({ password }) => {
  const passwordResult = zxcvbn(password);
  const width = passwordResult.score * 25;

  const label = () => {
    switch (passwordResult.score) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Good";
      case 3:
        return "Strong";
      case 4:
        return "Very strong";
      default:
        return "";
    }
  };

  const color = () => {
    switch (passwordResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const handleStyle = () => ({
    width: `${width}%`,
    background: color(),
    height: "7px",
  });
  return (
    <>
      <div className="progress" style={{ height: "7px" }}>
        <div className="progress-bar" style={handleStyle()}></div>
      </div>
      <p style={{ color: color() }}>{label()}</p>
    </>
  );
};

export default PasswordMeter;
