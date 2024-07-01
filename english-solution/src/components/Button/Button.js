import React from "react";
import MuiButton from "@mui/material/Button"; // MUI Button 컴포넌트 import

const Button = ({ label, onClick, style, className }) => {
  return (
    <MuiButton
      onClick={onClick}
      style={style}
      className={className}
      variant="contained"
    >
      {label}
    </MuiButton>
  );
};

export default Button;
