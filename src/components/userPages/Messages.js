import { Box, Card, Typography, Button, Dialog, Slide, Avatar, Badge } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import { connect } from "react-redux";
import { actionGetOutComeMessages, actionGeIncomeMessages } from "../../data/DataActions";
import {} from "../../data/DataActions";
// import { countUpdate } from "../../data/DataActions";
import { URL } from "../../data/dataGQL";
import CChat from "./Chat";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const MessageList = ({ user: { user, _id, avatar, newMessages } }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Badge badgeContent={newMessages || 0} color="primary">
				<Button
					variant="outlined"
					onClick={() => {
						handleClickOpen();
					}}
					sx={{ width: "300px", mb: 2 }}
				>
					{avatar !== undefined ? (
						<Avatar alt={user} src={`${URL}${avatar}`} sx={{ m: 1, mr: 4, width: 56, height: 56 }} />
					) : (
						<Avatar sx={{ m: 1, mr: 4, width: 56, height: 56 }}>{user[0]}</Avatar>
					)}
					Чат с {user}
				</Button>
			</Badge>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<CChat name={user} userId={_id} avatar={avatar || []} handleClose={handleClose} />
			</Dialog>
		</>
	);
};

const Messages = ({ allMessages, myId, onOutCome }) => {
	const [newMessages, setNewMessages] = useState([]);

	useEffect(() => {
		if (myId) {
			onOutCome(myId);
		}
	}, [myId]);

	useEffect(() => {
		if (!!allMessages) {
			setNewMessages(allMessages);
		}
	}, [allMessages]);

	return (
		<Box sx={{ background: "#fff", padding: "3%", margin: "-1%" }}>
			<Card sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
				{newMessages.length ? (
					newMessages.map((user) => <MessageList key={user._id} user={user} />)
				) : (
					<Typography>У вас нет сообщений.</Typography>
				)}
			</Card>
		</Box>
	);
};

const CMessages = connect(
	(state) => ({
		myId: state.userInfo?.payload?._id,
		allMessages: state.promise?.userMessages?.payload,
	}),
	{
		// onMessages: actionGetAllMessages,
		onOutCome: actionGetOutComeMessages,
		onInCome: actionGeIncomeMessages,
	}
)(Messages);

export default CMessages;
