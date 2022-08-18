import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { sortComments, actionGetComments } from "../../data/DataActions";
import { Typography, Box, IconButton, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import CAddComment from "./AddComment";

const Spoiler = ({ answers }) => {
	return (
		<>
			{answers.map((answer) => (
				<Box key={answer._id}>
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
							<Typography>Показать ответы</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Coment comment={answer} />
						</AccordionDetails>
					</Accordion>
				</Box>
			))}
		</>
	);
};

const Coment = ({ comment: { _id, owner, createdAt, text, ad, answerTo, answers } }) => {
	const [show, setShow] = useState(false);
	const date = new Date(+createdAt);
	const user = (owner) => {
		if (owner?.nick) return owner.nick;

		return owner.login;
	};

	const answerHide = (hide) => {
		if (hide) return setShow(false);
	};
	const userName = user(owner);
	return (
		<Container sx={{ borderBottom: "2px solid #1178cc" }}>
			<Box>
				<Typography variant="subtitle2" color="text.secondary">
					Прокоментировано: {userName}{" "}
					{date.toLocaleString("ru-RU", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</Typography>
			</Box>
			<Box sx={{ position: "relative" }}>
				<Typography sx={{ textDecoration: "none" }} gutterBottom variant="subtitle1" component="p">
					{text}
				</Typography>
				<Box sx={{ position: "absolute", right: "0", top: " 0" }}>
					{!show ? (
						<IconButton
							sx={{ backgroundColor: "#ffffff00", color: "#000", transition: "none", boxShadow: "none" }}
							variant="contained"
							onClick={() => setShow(true)}
						>
							<ReplyIcon fontSize="small" />
						</IconButton>
					) : (
						<IconButton
							sx={{ backgroundColor: "#ffffff00", color: "#000", transition: "none", boxShadow: "none" }}
							variant="contained"
							onClick={() => setShow(false)}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					)}
				</Box>
			</Box>

			{show && <CAddComment ad={ad} answerTo={{ _id: _id }} answerHide={answerHide} />}
			{!!answers && <Spoiler answers={answers} />}
		</Container>
	);
};

const Comments = ({ comments }) => {
	const commentsTree = sortComments(comments);
	return <>{!!commentsTree && commentsTree.map((comment) => <Coment comment={comment} key={comment._id} />)}</>;
};

const ThisComment = ({ _id, onIdChange, comments }) => {
	useEffect(() => {
		onIdChange(_id);
	}, [_id, onIdChange]);
	return comments ? <Comments comments={comments} /> : <></>;
};

const CComments = connect((state) => ({ comments: state.promise?.getComments?.payload?.comments }), {
	onIdChange: actionGetComments,
})(ThisComment);

export default CComments;
