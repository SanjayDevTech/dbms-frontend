import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import rootTheme from "./theme";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={rootTheme}>
			<Routes />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
