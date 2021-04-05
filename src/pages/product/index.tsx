import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import Header from "components/header";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectProductData } from "state/slices";
import history from "utils/history";

const useStyles = makeStyles({
	root: {
		height: "100%",
		display: "flex",
		flexFlow: "column",
	},
	section: {
		flexGrow: 1,
		display: "flex",
		padding: "40px",
	},
	left: {
		flex: 1,
	},
	right: {
		flexGrow: 1,
		overflow: "auto",
		marginLeft: "50px",
		display: "flex",
		flexDirection: "column",
	},
	btnBar: {
		display: "flex",
		height: "80px",
		width: "100%",
		"& > *": {
			flex: 1,
		},
	},
	name: {
		fontWeight: "bold",
		fontSize: "40px",
		lineHeight: "56px",
	},
	price: {
		fontWeight: "bold",
		fontSize: "28px",
		lineHeight: "42px",
		color: "#1565C0",
	},
	des: {
		fontSize: "28px",
		lineHeight: "42px",
	},
});

const ProductOverviewPage = () => {
	const classes = useStyles();
	let { productId } = useParams<{ productId: any }>();
	productId = Number(productId);

	const products = useSelector(selectProductData);

	const { name, price, image, des } = products.filter(
		(p) => p.id === productId
	)[0];

	useEffect(() => {
		if (!name) {
			history.push("/");
		}
	}, []);

	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.section}>
				<div className={classes.left}>
					<div>
						<img width={"100%"} src={image} alt={name} />
					</div>
					<ButtonGroup color={"primary"} className={classes.btnBar}>
						<Button variant={"contained"}>Buy now</Button>
						<Button>Add to cart</Button>
					</ButtonGroup>
				</div>
				<div className={classes.right}>
					<Typography className={classes.name} component={"h3"}>
						{name}
					</Typography>
					<Typography className={classes.price} component={"h3"}>
						{price} $
					</Typography>
					<Typography className={classes.des} component={"p"}>
						{des}
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default ProductOverviewPage;
