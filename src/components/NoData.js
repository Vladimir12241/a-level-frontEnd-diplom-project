import { Box, Typography } from "@mui/material";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

const Ops = () => (
	<Box>
		<SyncProblemIcon />
		<Typography variant="h2" color="text.secondary">
			Ops! Error: No Data Found
		</Typography>
	</Box>
);

export default Ops;
