import { useEffect } from "react";
import { connect } from "react-redux";
import { actionGetAllAd, actionClearAllAdd } from "../../data/DataActions";
import { Box, Card, Typography } from "@mui/material";
import { DashItem } from "./Dashboard";
import Preloader from "../Preloader";

const ThisSearch = ({
	match: {
		params: { search },
	},
	onSearch,
	removeAd,
	newAd,
}) => {
	useEffect(() => {
		onSearch(search);
		return function clear() {
			removeAd();
		};
	}, [search]);

	useEffect(() => {
		window.onscroll = function () {
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
				onSearch(search);
			}
		};

		return () => {
			window.onscroll = 0;
			removeAd();
		};
	}, []);

	return (
		<>
			<Card sx={{ background: "#1178cc", padding: "4px 16px", textAlign: "center" }}>
				<Typography sx={{ color: "#fff" }} variant="h5" component="p">
					Поиск: {search}
				</Typography>
			</Card>
			<Box
				sx={{
					display: "flex",
					flexFlow: { xs: "column", sm: "row wrap" },
					alignItems: { xs: "center", sm: "stretch" },
					justifyContent: "center",
					"& > :not(style)": { flex: "1 1 25%", m: 1.5 },
				}}
			>
				{newAd ? newAd?.map((ad) => <DashItem key={ad._id} ad={ad} />) : <Preloader />}
			</Box>
		</>
	);
};

const CSearchResult = connect((state) => ({ newAd: state.promise?.allAdd?.payload }), {
	onSearch: actionGetAllAd,
	removeAd: actionClearAllAdd,
})(ThisSearch);

export default CSearchResult;
