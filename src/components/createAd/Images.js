import { URL } from "../../data/dataGQL";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { actionUploadFiles } from "../../data/DataActions";
import { Box, ImageListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropzone from "react-dropzone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ImagesAdd = ({ onUpload, onImages, images, newImages }) => {
	const [thisImages, setThisImages] = useState(images);

	useEffect(() => {
		if (thisImages.length !== 0) {
			const images = [];
			if (thisImages) {
				for (let image of thisImages) {
					const imgId = { _id: image._id };
					images.push(imgId);
				}
			}
			onImages(images);
		}
	}, [thisImages]);

	useEffect(() => {
		if (newImages) {
			if (!thisImages.length) {
				setThisImages(newImages);
			}
			if (thisImages.length) {
				setThisImages([...thisImages, ...newImages]);
			}
		}
	}, [newImages]);

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(thisImages);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setThisImages(items);
	};

	const imgRemove = (id) => {
		const imgUpdata = thisImages.filter((image) => image._id !== id);
		setThisImages(imgUpdata);
	};

	return (
		<>
			<Dropzone
				onDrop={(acceptedFiles) => {
					onUpload(acceptedFiles);
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
				{thisImages ? (
					<DragDropContext onDragEnd={handleOnDragEnd}>
						<Droppable droppableId="thisImages" direction="horizontal">
							{(provided) => (
								<Box
									{...provided.droppableProps}
									ref={provided.innerRef}
									sx={{
										display: "flex",
										"& > :not(style)": { margin: "5px" },
									}}
								>
									{thisImages.map(({ _id, url, originalFileName }, index) => {
										return (
											<Draggable key={_id} draggableId={_id} index={index}>
												{(provided) => (
													<ImageListItem
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<IconButton
															sx={{
																position: "absolute",
																right: "0",
																bottom: "0",
																background: "white",
																"&:hover(style)": { backgroundColor: "red" },
															}}
															onClick={() => imgRemove(_id)}
														>
															<DeleteIcon fontSize="small" />
														</IconButton>
														<img
															src={`${URL}${url}`}
															srcSet={`${URL}${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
															alt="img"
															loading={originalFileName}
														/>
													</ImageListItem>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</Box>
							)}
						</Droppable>
					</DragDropContext>
				) : (
					<></>
				)}
			</Box>
		</>
	);
};

const CImagesAdd = connect((state) => ({ newImages: state.promise?.isUpLoaded?.payload }), {
	onUpload: actionUploadFiles,
})(ImagesAdd);

export default CImagesAdd;
