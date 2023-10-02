import React from "react";
import Spinner from "../spinner";
import { StyledButton } from "./styles";

export default function Button(props) {
  return (
    <StyledButton {...props} disabled={props.loading || props.disabled}>
      {props.loading ? (
        <Spinner size={props.size} margin="0" />
      ) : (
        props.children
      )}
    </StyledButton>
  );
}
