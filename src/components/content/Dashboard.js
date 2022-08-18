import { URL } from "../../data/dataGQL";
import { connect } from "react-redux";
import { actionGetAllAd, actionClearAllAdd } from "../../data/DataActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, List, ListItem, Typography } from "@mui/material";
import Preloader from "../Preloader";

const DashItem = ({ ad: { _id, images, price, tags, title } }) => {
	const isImages = !!images?.length && !!images[0]?.url;
	return (
		<Card sx={{ width: "100%", maxWidth: { xs: "420px" }, minHeight: "320px" }}>
			{isImages && (
				<Link to={`/dashboard/${_id}`}>
					<CardMedia component="img" height="140" src={`${URL}${images[0].url}`} alt={title} />
				</Link>
			)}
			<CardContent>
				<Link className="Item-Link" to={`/dashboard/${_id}`}>
					<Typography sx={{ textDecoration: "none" }} gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
				</Link>
				<List sx={{ display: "flex", flexFlow: "row wrap" }}>
					{tags &&
						tags.map((tag) => (
							<ListItem key={Math.random().toFixed(10)} sx={{ mr: 0.5, p: 0 }}>
								<Typography variant="body2" color="text.secondary">
									{tag}
								</Typography>
							</ListItem>
						))}
				</List>

				<Typography variant="body2" color="text.secondary">
					$ {price}
				</Typography>
			</CardContent>
		</Card>
	);
};

const Dashboard = ({ newAd, status, onAd, removeAd }) => {
	useEffect(() => {
		window.onscroll = function () {
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 150) {
				onAd();
			}
		};
		onAd();

		return () => {
			window.onscroll = 0;
			removeAd();
		};
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexFlow: { xs: "column", sm: "row wrap" },
				alignItems: { xs: "center", sm: "stretch" },
				paddingBottom: { xs: "1vh", sm: "5vh" },
				justifyContent: "center",
				"& > :not(style)": { flex: "1 1 30%", m: 1.5 },
			}}
		>
			{newAd ? newAd?.map((ad) => <DashItem key={ad._id} ad={ad} />) : <Preloader />}
		</Box>
	);
};

const CDashboard = connect(
	(state) => ({
		newAd: state.promise?.allAdd?.payload,
		status: state.promise?.allAdd?.status,
	}),
	{ onAd: actionGetAllAd, removeAd: actionClearAllAdd }
)(Dashboard);

export { CDashboard, DashItem };
