import { styled, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { history } from "../../App";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const SearchBar = () => {
	const [search, setSearch] = useState("");
	const tryToSearch = () => {
		const noSpace = search.replaceAll(" ", "");
		if (!search || noSpace === "") {
			setSearch("");
			return history.push("/dashboard");
		}

		history.push(`/search/${search}`);
		setSearch("");
	};

	return (
		<Search sx={{ display: "flex" }}>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						tryToSearch();
					}
				}}
				placeholder="Search…"
				inputProps={{ "aria-label": "search" }}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<Button variant="contained" onClick={() => tryToSearch()}>
				Искать
			</Button>
		</Search>
	);
};

export default SearchBar;
