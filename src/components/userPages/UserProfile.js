import { URL } from "../../data/dataGQL";
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Box } from "@mui/material";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Preloader from "../Preloader";
import homer from "../../img/homer.png";

const UserProfile = ({ user: { avatar, login, nick } }) => (
	<Box>
		<Card sx={{ maxWidth: "100%", padding: "15px 0" }}>
			<CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				{avatar?.url ? (
					<img style={{ width: "50%" }} height="auto" src={`${URL}${avatar.url}`} alt={nick || login} />
				) : (
					<>
						<Typography variant="h5" component="p">
							У пользователя нет Аватарки, потому что ее сьел Гомер!
						</Typography>
						<CardMedia component="img" sx={{ width: "50%", height: "auto" }} image={homer} alt={nick || login} />
					</>
				)}
			</CardContent>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Псевдоним: {nick}
				</Typography>
			</CardContent>
			<CardActions>
				<Link to={"/profile/edit"} style={{ margin: "0 10px", textDecoration: "none" }}>
					<Button variant="outlined">Изменить профиль</Button>
				</Link>
			</CardActions>
		</Card>
	</Box>
);

const ThisUse = ({ user }) => {
	return <>{user ? <UserProfile user={user} /> : <Preloader />}</>;
};

const CUserProfile = connect((state) => ({ user: state.userInfo?.payload }))(ThisUse);

export default CUserProfile;
