import React, { useState } from "react";
import Form from "../../../components/formComponents";
import http from "../../../services/http";
import useAuth from "../../../context/auth";

export default function UserPasswordManagement() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  function handleUpdatePassword(values) {
    setLoading(true);

    http
      .patch(`/api/redefinir-senha/${user.id}`, {
        id: user.id,
        senhaAtual: values.senhaAtual,
        novaSenha: values.novaSenha,
        confirmacaoSenha: values.confirmacaoSenha,
      })
      .then(
        (res) => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
  }

  return (
    <Form
      data={{ senhaAtual: "", novaSenha: "", confirmacaoSenha: "" }}
      onSubmit={handleUpdatePassword}
      gap="5px"
    >
      <Form.Input name="senhaAtual" label="Senha atual" type={"password"} />
      <Form.Input name="novaSenha" label="Nova senha" type={"password"} />
      <Form.Input
        name="confirmacaoSenha"
        label="Confirmar nova senha"
        type={"password"}
      />
      <Form.Button
        type="submit"
        title="Confirmar"
        minWidth="fit-content"
        padding="10px 30px"
        margin="5px 0 0 0"
        loading={loading}
      />
    </Form>
  );
}
