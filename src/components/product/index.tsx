import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import placeholder from "assets/images/placeholder.png";

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

const Product = () => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardActionArea className={classes.action}>
				<CardMedia
					className={classes.media}
					image={placeholder}
					title="Contemplative Reptile"
				/>
				<CardContent className={classes.content}>
					<Typography
						className={classes.title}
						gutterBottom
						variant="h5"
						component="h2">
						Lizard
					</Typography>
					<Typography className={classes.price} variant="h2" component="p">
						$ 200
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default Product;
