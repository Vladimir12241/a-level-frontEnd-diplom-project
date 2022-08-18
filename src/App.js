import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import store from "./data/reducers/combineReducer";
import CHeader from "./components/Header";
import CContent from "./components/Navigation";

import "./App.scss";

const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<Provider store={store}>
				<CHeader />
				<CContent />
			</Provider>
		</Router>
	);
}
export { App, history };
