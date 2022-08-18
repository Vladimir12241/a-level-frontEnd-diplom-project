import { Box } from "@mui/material";
import preloader from "../img/preloder.png";

const Preloader = () => (
	<Box sx={{ position: "absolute", margin: "auto", top: "25%" }}>
		<img src={preloader} alt="loading" />
	</Box>
);

export default Preloader;
