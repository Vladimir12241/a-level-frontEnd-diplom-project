import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { URL } from "../../data/dataGQL";
import { Box, Card, CardContent, TextField, Button, ImageListItem, IconButton } from "@mui/material";
import { actionUploadAvatar } from "../../data/DataActions";
import { actionUserUpdate } from "../../data/reducers";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropzone from "react-dropzone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PostAddIcon from "@mui/icons-material/PostAdd";

const UserProfileEdit = ({ onAvatar, user, newAvatar, onUpdate }) => {
	const { avatar, nick, _id } = user;
	const [thisNick, setThisNick] = useState(nick || "");
	const [thisAvatar, setThisAvatar] = useState(avatar || []);
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		if (thisNick.length) {
			setIsValid(true);
		}
	}, [thisNick]);

	useEffect(() => {
		if (newAvatar) {
			setThisAvatar(newAvatar);
		}
	}, [newAvatar]);

	const imgRemove = (_id) => {
		setThisAvatar([]);
	};

	const userUpdata = () => {
		let image;
		if (thisAvatar) {
			image = { _id: thisAvatar._id };
		}
		const result = {
			_id: _id,
			nick: thisNick,
			...(image ? { avatar: image } : {}),
		};
		onUpdate(result);
	};

	return (
		<Box>
			<Card>
				<Card>
					<Dropzone
						maxFiles={1}
						onDrop={(acceptedFiles) => {
							onAvatar(acceptedFiles);
						}}
					>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div
									style={{
										border: "6px double #0f6dba",
										textAlign: "center",
										margin: "10px 15px",
										padding: "4px 8px",
									}}
									{...getRootProps()}
								>
									<input {...getInputProps()} />
									<AddPhotoAlternateIcon color="primary" fontSize="large" />
									<p>Нажмите на иконку или перетяните ваши изображения</p>
								</div>
							</section>
						)}
					</Dropzone>
					<Box>
						{thisAvatar ? (
							<ImageListItem>
								<IconButton
									sx={{
										position: "absolute",
										right: "0",
										bottom: "0",
										background: "white",
										"&:hover(style)": { backgroundColor: "red" },
									}}
									onClick={() => imgRemove()}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
								<img
									src={`${URL}${thisAvatar.url}`}
									srcSet={`${URL}${thisAvatar.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
									alt="img"
									loading={thisAvatar.originalFileName}
								/>
							</ImageListItem>
						) : (
							<></>
						)}
					</Box>
				</Card>
				<CardContent sx={{ "& > :not(style)": { width: "100%", pt: 2, "& > :not(style)": { width: "90%" } } }}>
					<Box>
						<TextField
							id="outlined-textarea"
							label="Псевдоним"
							value={thisNick}
							onChange={(e) => setThisNick(e.target.value)}
							multiline
						/>
					</Box>
				</CardContent>
				<Button
					disabled={!isValid}
					sx={{ margin: "0 16px 16px" }}
					variant="contained"
					onClick={() => userUpdata()}
					startIcon={<PostAddIcon />}
				>
					Изменить профиль
				</Button>
			</Card>
		</Box>
	);
};

const CUserEdit = connect((state) => ({ user: state.userInfo?.payload, newAvatar: state.promise?.isAvatar?.payload }), {
	onAvatar: actionUploadAvatar,
	onUpdate: actionUserUpdate,
})(UserProfileEdit);

export default CUserEdit;
