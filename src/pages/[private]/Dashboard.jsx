import { CommonMainContainer } from "../../styles/common";

import CustomHeader from "../../components/customHeader/CustomHeader";

export default function Dashboard() {
  const customHeaderData = {
    title: "Home",
    description:
      "Bem-vindo ao seu painel de controle, onde você pode gerenciar suas consultas, médicos e muito mais.",
  };

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData} />
    </CommonMainContainer>
  );
}
