import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { URL } from "../../data/dataGQL";
import { useEffect } from "react";
import actionAdById from "../../data/DataActions/actionById";
import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	Typography,
	Box,
	Stack,
	IconButton,
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import Preloader from "../Preloader";
import Ops from "../NoData";
import { Container } from "@mui/system";
import CComments from "./Comments";
import AddComment from "./AddComment";
import EditIcon from "@mui/icons-material/Edit";
import Carousel from "react-material-ui-carousel";
import EmailIcon from "@mui/icons-material/Email";
import { actionSendText } from "../../data/DataActions";

const AdItem = ({ ad: { _id, owner, images, createdAt, title, description, tags, address, price } }) => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.userInfo?.payload?._id);
	const ownerId = owner._id;
	const [privateText, setPrivateText] = useState("");

	const date = new Date(+createdAt);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setPrivateText("");
	};

	const sendPrivateText = () => {
		const result = {
			to: { _id: ownerId },
			text: privateText,
		};
		dispatch(actionSendText(result));
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Личное сообщение</DialogTitle>
				<DialogContent>
					<DialogContentText>Если у вас возникли вопросы, напишите лично автору!</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Написать"
						type="text"
						fullWidth
						variant="standard"
						value={privateText}
						onChange={(e) => setPrivateText(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отменить</Button>
					<Button
						disabled={!privateText.length}
						onClick={() => {
							sendPrivateText();
							handleClose();
						}}
					>
						Написать
					</Button>
				</DialogActions>
			</Dialog>

			<Card sx={{ background: "inherit", p: 1 }}>
				<Card sx={{ p: 2 }}>
					{!!images && (
						<Carousel autoPlay={false} animation="slide" height={320} navButtonsAlwaysVisible={true}>
							{images.map((image) => (
								<img
									key={image._id}
									style={{
										width: "auto",
										position: "absolute",
										height: "inherit",
										top: "50%",
										left: "48%",
										marginRight: "-52%",
										transform: "translate(-50%, -52%)",
									}}
									src={`${URL}${image.url}`}
									srcSet={`${URL}${image.url}`}
									alt={title}
									loading={image?.originalFileName}
								/>
							))}
						</Carousel>
					)}
				</Card>
				<Card sx={{ mt: 1, position: "relative" }}>
					{userId === ownerId ? (
						<Link to={`/edit/${_id}`} style={{ position: "absolute", right: "10%" }}>
							<IconButton sx={{ position: "absolute" }}>
								<EditIcon />
							</IconButton>
						</Link>
					) : (
						<IconButton sx={{ position: "absolute", right: "0" }} onClick={() => handleClickOpen()}>
							<EmailIcon />
						</IconButton>
					)}
					<CardContent className="Buy" sx={{ "& > :not(style)": { m: 1 } }}>
						<Typography variant="body2" color="text.secondary">
							Публикация создан:{" "}
							{date.toLocaleString("ru-RU", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</Typography>
						<Container sx={{ display: "flex", "& > :not(style)": { mr: 1 } }}>
							{!!tags &&
								tags.map((tag) => (
									<Link to={`/search/${tag}`} key={Math.random()} style={{ textDecoration: "none" }}>
										<Typography
											sx={{ border: "1px solid #de9824ed", width: "fit-content", padding: "2px 6px" }}
											variant="body2"
											color="text.secondary"
										>
											{tag}
										</Typography>
									</Link>
								))}
						</Container>

						<Typography sx={{ textDecoration: "none" }} gutterBottom variant="h5" component="h2">
							{title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{description}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							$ {price}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{address}
						</Typography>
					</CardContent>
				</Card>
				<Card sx={{ mt: 1, pb: 2 }}>
					<AddComment ad={{ _id: _id }} />
					<Stack spacing={1}>
						<CComments _id={_id} />
					</Stack>
				</Card>
			</Card>
		</>
	);
};

const ThisAd = ({
	match: {
		params: { _id },
	},
	onIdChange,
	ad,
}) => {
	useEffect(() => {
		onIdChange(_id);
	}, [_id, onIdChange]);
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			{ad ? <Box sx={{ width: "100%" }}>{!!ad ? <AdItem ad={ad} /> : <Ops />}</Box> : <Preloader />}
		</Box>
	);
};

const CAdById = connect((state) => ({ ad: state.promise?.AdById?.payload }), {
	onIdChange: actionAdById,
})(ThisAd);

export default CAdById;
