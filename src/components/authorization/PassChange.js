import {
	Box,
	Card,
	Button,
	FormControl,
	InputLabel,
	FilledInput,
	CardContent,
	InputAdornment,
	IconButton,
	Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { actionChangePass } from "../../data/DataActions";

const PassCahange = ({ onPassHange, isLogin, status }) => {
	const [login, setLogin] = useState("");
	const [validLogin, setValidLogin] = useState(true);
	const [oldPassword, setOldPassword] = useState("");
	const [password, setPassword] = useState("");
	const [validPass, setValidPass] = useState(true);
	const [passConfirm, setPassCofirm] = useState("");
	const [validPassConfirm, setValidPassCofirm] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [showOldPass, setShowOldPass] = useState(false);
	const [isError, setIsError] = useState(false);
	const [active, setActive] = useState(true);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		if (status === "FULFILLED" && !isLogin) {
			setIsError(true);
		}
	}, [isLogin, status]);

	useEffect(() => {
		const loginCheck = new RegExp(/(^[a-zA-Z])(\w+)(\d+)*/);
		if (login.length > 3 && login.match(loginCheck)) {
			setValidLogin(true);
		} else {
			setValidLogin(false);
		}
	}, [login]);

	useEffect(() => {
		const passCheck = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/);
		if (password.length > 3 && password.match(passCheck)) {
			setValidPass(true);
		} else {
			setValidPass(false);
		}
	}, [password]);

	useEffect(() => {
		if (validPass && passConfirm === password) {
			setValidPassCofirm(true);
			if (validLogin) {
				setActive(false);
			}
		} else {
			setValidPassCofirm(false);
			setActive(true);
		}
	}, [passConfirm, password, validLogin, validPass]);

	return (
		<Box
			sx={{
				display: "flex",
				flexFlow: "column",
				alignItems: "center",
			}}
		>
			<Card sx={{ textAlign: "center", paddingBottom: "2em", pt: 2, margin: "30px 0 70px" }}>
				{isError && (
					<Typography
						sx={{ position: "absolute", left: "20%", top: "3.5%" }}
						color="error"
						variant="body2"
						component="p"
					>
						Неверный логин или пароль!
					</Typography>
				)}
				<CardContent
					sx={{ display: "flex", flexFlow: "column nowrap", width: "320px", "& > :not(style)": { m: 0.5 } }}
				>
					{/* LOGIN */}
					<FormControl
						className="Input-Form"
						data-title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ea"
						error={!validLogin || isError}
						variant="filled"
					>
						<InputLabel htmlFor="component-name">Логин</InputLabel>
						<FilledInput
							onFocus={() => setIsError(false)}
							className="Login"
							id="component-name"
							value={login}
							onChange={(e) => setLogin(e.target.value.toLowerCase())}
						/>
						{!validLogin && (
							<Typography component="span" sx={{ fontSize: "x-small", color: "#910f0fbf" }}>
								Логин должен начинатся с буквы и быть не меньше 4-х символов!
							</Typography>
						)}
					</FormControl>
					{/* OLD PASS */}
					<FormControl mt={2} varerroriant="filled">
						<InputLabel htmlFor="component-pass">Старый пароль</InputLabel>
						<FilledInput
							onFocus={() => {
								setIsError(false);
							}}
							id="component-pass"
							type={showOldPass ? "text" : "password"}
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowOldPass(!showOldPass)}
										onMouseDown={handleMouseDownPassword}
									>
										{!showPass ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					{/* NEW PASS */}
					<FormControl mt={2} error={!validPass || isError} varerroriant="filled">
						<InputLabel htmlFor="component-pass">Новый пароль</InputLabel>
						<FilledInput
							onFocus={() => {
								setIsError(false);
							}}
							id="component-pass"
							type={showPass ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowPass(!showPass)}
										onMouseDown={handleMouseDownPassword}
									>
										{!showPass ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
						{!validPass && (
							<Typography component="span" sx={{ fontSize: "x-small", color: "#910f0fbf" }}>
								Длинна не меньше 6 символов. Должен содержать прописные и заглавне буквы, минимум 1 цифру и 1
								специальный символ!
							</Typography>
						)}
					</FormControl>
					{/* PASS CHECK	 */}
					<FormControl mt={2} error={!validPassConfirm || isError} variant="filled">
						<InputLabel htmlFor="component-confirm-pass">Подтверите новый пароль</InputLabel>
						<FilledInput
							id="component-confirm-pass"
							type={showPass ? "text" : "password"}
							value={passConfirm}
							onChange={(e) => setPassCofirm(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowPass(!showPass)}
										onMouseDown={handleMouseDownPassword}
									>
										{!showPass ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</CardContent>

				<Button
					disabled={active}
					variant="contained"
					onClick={() => {
						onPassHange(login, oldPassword, password);
					}}
				>
					Изменить пароль
				</Button>
			</Card>
		</Box>
	);
};

const CPassCahange = connect(
	(state) => ({ isPass: state.promise?.passCahange?.payload, status: state.promise?.passCahange?.status }),
	{ onPassHange: actionChangePass }
)(PassCahange);
export default CPassCahange;
