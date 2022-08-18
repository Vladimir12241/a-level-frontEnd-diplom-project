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
	CardActions,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionFullLogin } from "../../data/reducers/loginReducer";

const LoginForm = ({ onLogin, isLogin, status }) => {
	const [login, setLogin] = useState("");
	const [validLogin, setValidLogin] = useState(true);
	const [password, setPassword] = useState("");
	const [validPass, setValidPass] = useState(true);
	const [showPass, setShowPass] = useState(false);
	const [isError, setIsError] = useState(false);
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		if (status === "FULFILLED" && !isLogin) {
			setIsError(true);
		}
	}, [isLogin, status]);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		if (login.length > 3) {
			setValidLogin(true);
		} else {
			setValidLogin(false);
		}
	}, [login]);

	useEffect(() => {
		if (password.length > 3) {
			setValidPass(true);
		} else {
			setValidPass(false);
		}
	}, [password]);

	useEffect(() => {
		if (login.length && password.length && setValidLogin && validPass) {
			setSubmit(true);
		} else {
			setSubmit(false);
		}
	}, [validLogin, validPass]);

	return (
		<Box
			sx={{
				display: "flex",
				flexFlow: "column",
				alignItems: "center",
			}}
		>
			<Card sx={{ position: "relative", textAlign: "center", paddingBottom: "2em", pt: 2, margin: "30px 0 70px" }}>
				{isError && (
					<Typography
						sx={{ position: "absolute", left: "20%", top: "3.5%" }}
						color="error"
						variant="body2"
						component="p"
					>
						Неверное имя или пароль
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
					</FormControl>
					{/* PASS */}
					<FormControl mt={2} error={!validPass || isError} varerroriant="filled">
						<InputLabel htmlFor="component-pass">Пароль</InputLabel>
						<FilledInput
							onFocus={() => setIsError(false)}
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
				</CardContent>
				<CardActions sx={{ flexDirection: "column" }}>
					<Box sx={{ "& > :not(style)": { mr: 1 } }}>
						<Button
							disabled={!submit || isError}
							variant="contained"
							onClick={(e) => {
								e.preventDefault();
								if (!validLogin && !validPass) return;
								onLogin(login, password);
							}}
						>
							Войти
						</Button>

						<Button variant="text">
							<Link style={{ color: "#136d0b" }} to={"/signup"}>
								Регистрация
							</Link>
						</Button>
					</Box>
					<Button variant="text">
						<Link style={{ color: "#4a4646" }} to={"/changepassword"}>
							Изменить пароль
						</Link>
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

const CLoginForm = connect(
	(state) => ({ isLogin: state.promise?.login?.payload, status: state.promise?.login?.status }),
	{
		onLogin: actionFullLogin,
	}
)(LoginForm);

export default CLoginForm;
