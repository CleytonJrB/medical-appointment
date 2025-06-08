import { Typography } from "@mui/material";
import { CommonMainContainer } from "../../styles/common";

export default function Dashboard() {
  return (
    <CommonMainContainer>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">This is the private dashboard page.</p>

        <Typography variant="h5" fontWeight={700}>
          Dashboard
        </Typography>
      </div>
    </CommonMainContainer>
  );
}
