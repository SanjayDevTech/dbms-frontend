import React from "react";
import * as Types from "./types";

const ErrorPage = (props: Types.ErrorPagePropsI) => {
	return (
		<div>
			<h1>OOPs!!! {props.error}</h1>
		</div>
	);
};

export default ErrorPage;
