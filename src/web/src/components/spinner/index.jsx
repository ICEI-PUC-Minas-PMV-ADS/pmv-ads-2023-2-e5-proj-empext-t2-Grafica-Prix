import React from "react";
import { StyledSpinner } from "./styles";

export default function Spinner(props) {
  return (
    <StyledSpinner {...props} size={props.size} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
        stroke={props.color || "#fff"}
      />
    </StyledSpinner>
  );
}
