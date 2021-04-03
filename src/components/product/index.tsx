import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import * as Types from "./types";
import history from "utils/history";

const useStyles = makeStyles({
	root: {
		width: "350px",
		height: "350px",
		borderRadius: "23px",
	},
	action: {
		height: "100%",
		padding: "30px",
	},
	content: {
		padding: "16px 0",
	},
	media: {
		width: "287px",
		height: "193px",
		margin: "auto",
	},
	title: {
		fontSize: "27px",
		lineHeight: "32px",
		fontWeight: "bold",
	},
	price: {
		fontSize: "36px",
		lineHeight: "42px",
		color: "#1565C0",
		fontWeight: "bold",
	},
});

const Product = (props: Types.ProductPropsI) => {
	const { productId, productName, cover, price } = props;

	const clickHandler = () => {
		history.push(`/product/${productId}`);
	};

	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardActionArea onClick={clickHandler} className={classes.action}>
				<CardMedia
					className={classes.media}
					image={cover}
					title={productName}
				/>
				<CardContent className={classes.content}>
					<Typography
						className={classes.title}
						gutterBottom
						variant="h5"
						component="h2">
						{productName}
					</Typography>
					<Typography className={classes.price} variant="h2" component="p">
						{price} $
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default Product;
