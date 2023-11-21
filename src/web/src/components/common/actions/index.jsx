import React from "react";
import { Action, ConatinerActions } from "./styles";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

export default function Actions(props) {
  return (
    <ConatinerActions {...props}>
      {props.edit && (
        <Action onClick={props.actionEdit}>
          <MdModeEdit color="#fff" size={20} />
        </Action>
      )}
      {props.delete && (
        <Action onClick={props.actionDelete}>
          <FaTrashAlt color="#fff" size={16} />
        </Action>
      )}
    </ConatinerActions>
  );
}
