import { Route, Redirect, Switch } from "react-router-dom";
import { Box } from "@mui/material";
import CLoginForm from "./authorization/LoginForm";
import CSignupForm from "./authorization/SignupForm";
import { CDashboard, CSearchResult, CAdById, CEdit } from "./content";
import { CUserProfile, CUserEdit, CMessages } from "./userPages";
import CCreateAd from "./createAd/CreateAd";
import CPassCahange from "./authorization/PassChange";

const isLogin = () => (
	<Switch>
		<Route path="/createad" component={CCreateAd} />
		<Route path="/edit/:_id" component={CEdit} />
		<Route path="/messages" component={CMessages} />
		<Route path="/profile/edit" component={CUserEdit} />
		<Route path="/profile" component={CUserProfile} />
		<Route path="/search/:search" component={CSearchResult} />
		<Route path="/dashboard/:_id" component={CAdById} />
		<Route patn="/dashboard" component={CDashboard} />
		<Redirect from="/" to="/dashboard" />
	</Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isUser = !!localStorage.authToken;
	return (
		<Route
			{...rest}
			render={(props) =>
				isUser ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

const CContent = () => (
	<Box sx={{ padding: "70px 3px 0", background: "#adb1b4" }}>
		<Switch>
			<Route path="/login" component={CLoginForm} />
			<Route path="/signup" component={CSignupForm} />
			<Route path="/changepassword" component={CPassCahange} />
			<PrivateRoute path="/" component={isLogin} />
		</Switch>
	</Box>
);

export default CContent;
