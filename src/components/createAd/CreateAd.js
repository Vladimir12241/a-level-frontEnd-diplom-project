import { useState, useEffect, forwardRef } from "react";
import { connect } from "react-redux";
import { actionCreatePost, clearUploadImg } from "../../data/DataActions";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Box, Card, CardContent, TextField, Button } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CImagesAdd from "./Images";
import Tags from "./Tags";

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
	const { onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
			prefix="$"
		/>
	);
});

NumberFormatCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const CreateAd = ({ onPost, clearImg, ad = {} }) => {
	const { _id, images, title, description, tags, address, price } = ad;
	const [thisTitle, setTitle] = useState(title || "");
	const [thisDescription, setDescription] = useState(description || "");
	const [thisAddress, setAddress] = useState(address || "");
	const [thisPrice, setPrice] = useState(price || "");
	const [thisTags, setThisTags] = useState(tags || []);
	const [thisImages, setThisImages] = useState([]);
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		return () => {
			clearImg();
		};
	}, []);

	useEffect(() => {
		if (thisTitle.length !== 0 && thisDescription.length !== 0 && thisPrice.length !== 0 && thisTags.length !== 0) {
			setIsValid(true);
		}
	}, [thisTitle, thisDescription, thisPrice, thisTags]);

	const onImages = (imagesData) => {
		if (!!imagesData) {
			setThisImages(imagesData);
		}
	};

	const onTags = (tagsData) => {
		if (!!tagsData) {
			setThisTags(tagsData);
		}
	};

	const createPost = () => {
		const images = [];
		if (thisImages) {
			for (let image of thisImages) {
				const imgId = { _id: image._id };
				images.push(imgId);
			}
		}
		const result = {
			...(_id ? { _id: _id } : {}),
			...(images.length ? { images: images } : {}),
			tags: thisTags,
			title: thisTitle,
			description: thisDescription,
			price: +thisPrice,
			...(thisAddress.length !== 0 ? { address: thisAddress } : {}),
		};
		onPost(result);
	};

	return (
		<Box>
			<Card>
				<Card>
					<CImagesAdd images={images || []} onImages={onImages} />
				</Card>

				<CardContent sx={{ "& > :not(style)": { width: "100%", pt: 2, "& > :not(style)": { width: "90%" } } }}>
					<Tags tags={tags || []} onTags={onTags} />
					<Box>
						<TextField
							id="outlined-textarea"
							label="Название"
							value={thisTitle}
							onChange={(e) => setTitle(e.target.value)}
							multiline
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-textarea"
							label="Описание"
							value={thisDescription}
							onChange={(e) => setDescription(e.target.value)}
							multiline
						/>
					</Box>
					<Box>
						<TextField
							name="numberformat"
							id="formatted-numberformat-input"
							InputProps={{
								inputComponent: NumberFormatCustom,
							}}
							label="Цена"
							value={thisPrice}
							onChange={(e) => setPrice(e.target.value)}
							multiline
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-textarea"
							label="Адрес"
							value={thisAddress}
							onChange={(e) => setAddress(e.target.value)}
							multiline
						/>
					</Box>
				</CardContent>
				<Button
					disabled={!isValid}
					sx={{ margin: "0 16px 16px" }}
					variant="contained"
					onClick={() => createPost()}
					startIcon={<PostAddIcon />}
				>
					{_id ? "Изменить" : "Создать"}
				</Button>
			</Card>
		</Box>
	);
};

const CCreateAd = connect(null, { onPost: actionCreatePost, clearImg: clearUploadImg })(CreateAd);

export default CCreateAd;
