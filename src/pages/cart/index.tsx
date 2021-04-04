import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import Header from "components/header";

const useStyles = makeStyles({
	root: {
		height: "100%",
	},
	section: {
		flexGrow: 1,
		display: "flex",
		padding: "40px",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		width: "500px",
		height: "400px",
		background: "#E5E5E5",
		overflow: "auto",
	},
	btn: {
		fontWeight: "bold",
		fontSize: "13px",
		lineHeight: "32px",
		borderRadius: "45px",
		marginTop: "30px",
	},
});

const CartPage = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.section}>
				<Paper className={classes.content}></Paper>
				<Button className={classes.btn} variant={"contained"} color={"primary"}>
					Checkout
				</Button>
			</div>
		</div>
	);
};

export default CartPage;
