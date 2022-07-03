import { Box } from "@mui/material";
import Welcome from "../../components/Welcome/Welcome";

export default function HomePage() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Welcome />
    </Box>
  );
}
