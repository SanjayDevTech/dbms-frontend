import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";
import "./index.css";
import Routes from "./routes";
import rootTheme from "./theme";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={rootTheme}>
			<Provider store={store}>
				<Routes />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
