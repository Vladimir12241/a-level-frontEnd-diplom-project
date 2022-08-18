import { connect } from "react-redux";
import { URL } from "../../data/dataGQL";
import { actionAuthLogout } from "../../data/reducers";
import { actionGeIncomeMessages } from "../../data/DataActions";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Badge, MenuItem, Menu, Avatar } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchBar from "./SearchBar";
import { useEffect } from "react";

const IsUser = ({ login, avatar, newMessages, onLogout, onIncomes, myId, badges }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [badge, setBadge] = useState(0);
	const [thisAvatar, setThisAvatar] = useState();
	const [thisLogin, setThisLogin] = useState();

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	useEffect(() => {
		let messageReFresh = setInterval(() => {
			if (myId) {
				onIncomes(myId);
			}
		}, 30000);

		if (myId) {
			onIncomes(myId);
		}

		return () => {
			clearInterval(messageReFresh);
		};
	}, []);

	useEffect(() => {
		if (avatar) {
			setThisAvatar(avatar);
		}
	}, [avatar]);

	useEffect(() => {
		if (login) {
			setThisLogin(login);
		}
	}, [login]);

	useEffect(() => {
		if (badges || badges === 0) {
			setBadge(badges);
		}
	}, [badges]);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link to={"/profile"} style={{ textDecoration: "none", color: "inherit" }}>
				<MenuItem onClick={handleMenuClose}>
					{thisAvatar !== undefined ? (
						<Avatar alt={login} src={`${URL}${thisAvatar}`} fontSize="small" sx={{ mr: 1 }} />
					) : (
						<Avatar fontSize="small" sx={{ mr: 1 }}>
							{thisLogin && thisLogin[0]}
						</Avatar>
					)}
					<p>{thisLogin}</p>
				</MenuItem>
			</Link>
			<MenuItem
				onClick={() => {
					onLogout();
					handleMenuClose();
				}}
			>
				<LogoutIcon fontSize="small" sx={{ mr: 1 }} />
				<p>Logout</p>
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<Link to={"/messages"} style={{ textDecoration: "none", color: "inherit" }}>
				<MenuItem onClick={handleMobileMenuClose}>
					<IconButton size="large" color="inherit">
						<Badge badgeContent={badge} color="primary">
							<MailIcon />
						</Badge>
					</IconButton>
					<p>Сообщения</p>
				</MenuItem>
			</Link>
			<Link to={"/createad"} style={{ textDecoration: "none", color: "inherit" }}>
				<MenuItem onClick={handleMobileMenuClose}>
					<IconButton size="large" color="inherit">
						<AddBoxIcon />
					</IconButton>
					<p>Создать</p>
				</MenuItem>
			</Link>

			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Профиль</p>
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<SearchBar />
			<Box sx={{ display: { xs: "none", sm: "flex" } }}>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={newMessages} color="error">
						<Link to={"/messages"}>
							<Badge badgeContent={badge} color="error">
								<MailIcon />
							</Badge>
						</Link>
					</Badge>
				</IconButton>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Link to={"/createad"}>
						<AddBoxIcon />
					</Link>
				</IconButton>
				<IconButton
					size="large"
					edge="end"
					aria-label="account of current user"
					aria-controls={menuId}
					aria-haspopup="true"
					onClick={handleProfileMenuOpen}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
			</Box>
			<Box sx={{ display: { xs: "flex", sm: "none" } }}>
				<IconButton
					size="large"
					aria-label="show more"
					aria-controls={mobileMenuId}
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
					color="inherit"
				>
					<MoreIcon />
				</IconButton>
			</Box>
			{renderMobileMenu}
			{renderMenu}
		</>
	);
};

const CIsUser = connect(
	(state) => ({
		login: state.userInfo?.payload?.login,
		avatar: state.userInfo?.payload?.avatar?.url,
		myId: state.userInfo?.payload?._id,
		badges: state.promise?.newMessagesCount?.payload,
	}),
	{
		onLogout: actionAuthLogout,
		onIncomes: actionGeIncomeMessages,
	}
)(IsUser);

export default CIsUser;
