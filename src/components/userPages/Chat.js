import {
	Box,
	Card,
	Typography,
	IconButton,
	Button,
	TextField,
	Avatar,
	AppBar,
	Toolbar,
	ListItem,
	ListItemText,
	Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { actionGetOutComeMessages, actionSendText, actionMessagesUpdate } from "../../data/DataActions";
import { URL } from "../../data/dataGQL";

const Message = ({ message: { owner, createdAt, text }, userId }) => {
	const date = new Date(+createdAt);

	return (
		<>
			<ListItem
				sx={{
					transform: "rotate(180deg)",
					direction: "ltr",
					pl: 3,
					pr: 3,
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
				}}
			>
				<ListItemText
					primary={
						<Typography variant="subtitle2" color="text.secondary">
							{owner._id !== userId ? "Отправлено:" : "Получено:"}
							{"  "}
							{date.toLocaleString("ru-RU", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
							})}
						</Typography>
					}
				/>

				<Typography sx={{ mt: 1 }}>{text}</Typography>
			</ListItem>
			<Divider />
		</>
	);
};

const Chat = ({ fullMessagesList, name, userId, avatar, sendMessage, onUpdateMessages, handleClose, myId }) => {
	const [thisMessages, setThisMessages] = useState([]);
	const [newText, setNewText] = useState("");

	useEffect(() => {
		if (fullMessagesList)
			for (let user of fullMessagesList)
				if (user._id === userId) {
					setThisMessages(user.messages);
				}
	}, [fullMessagesList]);

	const messageCountUpdate = () => {
		for (let user of fullMessagesList)
			if (user._id === userId) {
				if (user.newMessages) {
					onUpdateMessages(userId);
				}
			}
	};

	const sendText = () => {
		const result = {
			to: { _id: userId },
			text: newText,
		};
		sendMessage(result, myId);
		setNewText("");
	};

	return (
		<Box Box sx={{ display: "contents" }}>
			<AppBar sx={{ position: "fixed" }}>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", ml: 3 }}>
						{avatar !== undefined ? (
							<Avatar alt={name} src={`${URL}${avatar}`} sx={{ m: 1, width: 56, height: 56 }} />
						) : (
							<Avatar>{name[0]}</Avatar>
						)}
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							{name}
						</Typography>
					</Box>
					<IconButton
						edge="end"
						color="inherit"
						onClick={() => {
							messageCountUpdate();
							handleClose();
						}}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				sx={{ transform: "rotate(180deg)", direction: "rtl", margin: "70px 0 140px 0", overflowY: "auto" }}
				textOverflow
			>
				{thisMessages.map((message) => (
					<Message key={message._id} message={message} userId={userId} />
				))}
			</Box>
			<Card
				sx={{ p: 1, zIndex: "10", borderTop: "5px solid #1178cc", position: "fixed", bottom: "0", width: "98%" }}
			>
				<TextField
					sx={{ width: "100%", marginBottom: "60px" }}
					id="outlined-multiline-flexible"
					multiline
					maxRows={3}
					onChange={(e) => setNewText(e.target.value)}
					value={newText}
				/>

				<Button
					sx={{ margin: "10px 0", position: "absolute", right: "1%", bottom: "15%" }}
					disabled={!newText.length}
					variant="contained"
					color="success"
					endIcon={<SendIcon />}
					onClick={() => sendText()}
				>
					Отправить
				</Button>
			</Card>
		</Box>
	);
};

const CChat = connect(
	(state) => ({
		myId: state.userInfo?.payload?._id,
		fullMessagesList: state.promise?.userMessages?.payload,
	}),
	{
		sendMessage: actionSendText,
		onMessages: actionGetOutComeMessages,
		onUpdateMessages: actionMessagesUpdate,
	}
)(Chat);

export default CChat;
