import React, { useState } from "react";
import {} from "./styles";
import FormSelector from "../../components/formSelector";
import UserPasswordManagement from "./password";
import FormPersonalData from "./personalData";

export default function Profile(props) {
  const selectors = [
    {
      title: "Detalhes da conta",
      children: <FormPersonalData />,
    },
    {
      title: "Atualizar senha",
      children: <UserPasswordManagement />,
    },
  ];

  return <FormSelector selectors={selectors} maxWidth="400px" gap="20px" />;
}
