import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import Header from "components/header";
import { useParams } from "react-router";
import { BACKEND } from "utils/constants";
import { ProductType } from "utils/types";
import { backendAPI } from "services/http";
import ErrorPage from "pages/info/error";
import LoadingPage from "pages/info/loading";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "state/slices";
import Message from "components/snackbar";
import { CartAction } from "state/actions";

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

	const [product, setProduct] = React.useState<ProductType>();
	const [error, setError] = React.useState<any | null>(null);
	const [snackbar, setSnackbar] = React.useState({ open: false, msg: "" });

	const cartList = useSelector(selectCart);
	const dispatch = useDispatch();

	const addToCartHandler = () => {
		if (cartList.findIndex((c) => c.id === productId) >= 0) return;
		backendAPI
			.get<{ status: boolean; error: string | null; product: ProductType }>(
				"/products/" + productId
			)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					if (data.status) {
						const temp = data.product;
						if (!temp.image.startsWith("http")) {
							temp.image = BACKEND + "res/" + temp.image;
						}
						dispatch(CartAction.addCart(temp));
					} else {
						console.log(data.error);
						setSnackbar({
							open: true,
							msg: "Product not found, please reload this page",
						});
					}
				} else {
					setSnackbar({ open: true, msg: "Internal server error" });
					console.log("Error code: " + res.status);
				}
			})
			.catch((e) => {
				console.log(e);
				setSnackbar({ open: true, msg: "Oops! something went wrong" });
			});
	};

	const snackbarHandler = () => {
		setSnackbar({ open: false, msg: "" });
	};

	useEffect(() => {
		backendAPI
			.get<{ status: boolean; error: string | null; product: ProductType }>(
				"/products/" + productId
			)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					if (data.status) {
						const temp = data.product;
						if (!temp.image.startsWith("http")) {
							temp.image = BACKEND + "res/" + temp.image;
						}
						setProduct(temp);
						setError(null);
					} else {
						console.log(data.error);
						setError({ code: 404 });
					}
				} else {
					setError({ code: 500 });
					console.log("Error code: " + res.status);
				}
			})
			.catch((e) => {
				console.log(e);
				setError({ code: 500 });
			});
	}, []);

	const isAddedToCart = cartList.findIndex((c) => c.id === productId) >= 0;

	return (
		<div className={classes.root}>
			<Header />
			<Message
				open={snackbar.open}
				msg={snackbar.msg}
				closeHandler={snackbarHandler}
			/>
			<div className={classes.section}>
				{error ? (
					<ErrorPage error={error.code} />
				) : product ? (
					<>
						<div className={classes.left}>
							<div>
								<img width={"100%"} src={product.image} alt={product.name} />
							</div>
							<ButtonGroup color={"primary"} className={classes.btnBar}>
								<Button variant={"contained"}>Buy now</Button>
								<Button onClick={addToCartHandler} disabled={isAddedToCart}>
									{isAddedToCart ? "Added to cart" : "Add to cart"}
								</Button>
							</ButtonGroup>
						</div>
						<div className={classes.right}>
							<Typography className={classes.name} component={"h3"}>
								{product.name}
							</Typography>
							<Typography className={classes.price} component={"h3"}>
								{product.price} $
							</Typography>
							<Typography className={classes.des} component={"p"}>
								{product.des}
							</Typography>
						</div>
					</>
				) : (
					<LoadingPage />
				)}
			</div>
		</div>
	);
};

export default ProductOverviewPage;
