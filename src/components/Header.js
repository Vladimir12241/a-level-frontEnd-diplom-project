import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Typography, Box, Toolbar } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { CIsUser } from "./userPages";

const Header = ({ user }) => {
	const [isUser, setIsUser] = useState("");
	useEffect(() => {
		setIsUser(user);
	}, [user]);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar className="Header" position="static" sx={{ flexGrow: "1" }}>
				<Toolbar>
					<Link to="/dashboard">
						<StoreIcon />
						<Typography variant="h6" component="span" sx={{ display: { xs: "none", sm: "block" } }}>
							Купи-Продай
						</Typography>
					</Link>
					{!isUser ? (
						<Button variant="outlined">
							<Link to="/login">Войти</Link>
						</Button>
					) : (
						<CIsUser />
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

const CHeader = connect((state) => ({ user: !!state.auth?.payload }))(Header);

export default CHeader;
