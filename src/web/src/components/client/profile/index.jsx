import FormSelector from "../../../components/common/formSelector";
import UserPasswordManagement from "./password";
import FormPersonalData from "./personalData";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../../context/auth";

export default function Profile() {
  const { user } = useAuth();

  const [searchParams] = useSearchParams();

  const selectors = [
    {
      title: "Detalhes da conta",
      children: <FormPersonalData data={user} />,
    },
    {
      title: "Atualizar senha",
      children: <UserPasswordManagement />,
    },
  ];

  return (
    <>
      {user && (
        <FormSelector
          selectors={selectors}
          maxWidth="400px"
          gap="20px"
          defaultSelector={parseInt(searchParams.get("form"))}
        />
      )}
    </>
  );
}
