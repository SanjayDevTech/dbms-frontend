import React from "react";
import { useParams } from "react-router";
import Header from "./components/header";
import ErrorPage from "./pages/info/error";

const Test = () => {
	const { component } = useParams<{
		component: string;
	}>();

	switch (component) {
		case "header":
			return <Header />;

		default:
			return <ErrorPage error={"404"} />;
	}
};

export default Test;
