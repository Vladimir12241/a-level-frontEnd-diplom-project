import { useState, useEffect } from "react";
import { OutlinedInput, InputLabel, MenuItem, FormControl, Box, Select, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(tag, tagName, theme) {
	return {
		fontWeight: tagName.indexOf(tag) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

const tagList = [
	"Детский мир",
	"Мода и стиль",
	"Авто",
	"Запчасти для транспорта",
	"Недвижимость",
	"Дом и сад",
	"Электроника",
	"Хобби, отдых и спорт",
	"Здоровье и красота",
	"Взаимопомощь",
	"Животные",
];

const Tags = ({ tags, onTags }) => {
	const theme = useTheme();
	const [tagName, setTagName] = useState([]);

	useEffect(() => {
		if (tags.length !== 0) {
			tags.map((tag) => setTagName(typeof tag === "string" ? tag.split(",") : tag));
		}
	}, [tags]);

	useEffect(() => {
		if (!!tagName) {
			onTags(tagName);
		}
	}, [tagName, onTags]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setTagName(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<div>
			<FormControl>
				<InputLabel id="demo-multiple-chip-label">Теги</InputLabel>
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={tagName}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Теги" />}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{tagList.map((tag) => (
						<MenuItem key={tag} value={tag} style={getStyles(tag, tagName, theme)}>
							{tag}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default Tags;
