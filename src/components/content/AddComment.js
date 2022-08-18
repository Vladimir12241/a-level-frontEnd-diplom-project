import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useEffect } from "react";
import { actionAddComment } from "../../data/DataActions";
import { useDispatch } from "react-redux";

const AddComment = ({ ad, answerTo, answerHide }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const [isValid, setIsValid] = useState(false);

	const createComment = () => {
		const result = { text: comment, ad: ad, ...(answerTo ? { answerTo: answerTo } : {}) };
		dispatch(actionAddComment(result));
		setComment("");
		answerHide && answerHide(true);
	};

	useEffect(() => {
		const noSpace = comment.replaceAll(" ", "");
		if (comment.length && noSpace !== "") {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [comment]);

	return (
		<Box sx={{ padding: 1 }}>
			<TextField
				sx={{ width: "100%" }}
				id="outlined-multiline-flexible"
				label="Добавить коментарий"
				multiline
				maxRows={3}
				onChange={(e) => setComment(e.target.value)}
				value={comment}
			/>
			<Button
				sx={{ margin: "10px 0" }}
				disabled={!isValid}
				variant="contained"
				color="success"
				endIcon={<SendIcon />}
				onClick={() => createComment()}
			>
				Добавить коментарий
			</Button>
		</Box>
	);
};

export default AddComment;
