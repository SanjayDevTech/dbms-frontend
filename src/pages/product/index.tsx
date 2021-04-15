import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	ButtonGroup,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from "@material-ui/core";
import Header from "components/header";
import { useParams } from "react-router";
import { BACKEND } from "utils/constants";
import { ProductType } from "utils/types";
import { backendAPI } from "services/http";
import ErrorPage from "pages/info/error";
import LoadingPage from "pages/info/loading";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectUserAuth } from "state/slices";
import Message from "components/snackbar";
import { CartAction } from "state/actions";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

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
	const [buyNowDialog, setBuyNowDialog] = React.useState(false);

	const cartList = useSelector(selectCart);
	const user = useSelector(selectUserAuth);
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

	const handleDialogOpen = () => {
		setBuyNowDialog(true);
	};

	const handleDialogClose = () => {
		setBuyNowDialog(false);
	};

	const purchaseProduct = () => {
		backendAPI
			.post("/purchases", {
				email: user.email,
				hash: user.hash,
				purchase: {
					id: 0,
					userId: 0,
					productId: product?.id,
					status: 0,
				},
			})
			.then((res) => {
				if (res.status === 200 && res.data.status) {
					setSnackbar({
						msg: "Succesfully ordered ur product",
						open: true,
					});
				} else {
					console.log("Error");
					setSnackbar({
						msg: res.data.error || "Errorrr",
						open: true,
					});
				}
			})
			.catch((e) => {
				console.log(e.message);
				setSnackbar({
					msg: e.message,
					open: true,
				});
			})
			.finally(() => {
				handleDialogClose();
			});
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
			<Dialog
				open={buyNowDialog}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{"Checkout"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Do u want to buy {product?.name}?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} color="primary">
						No
					</Button>
					<Button onClick={purchaseProduct} color="primary">
						Yes
					</Button>
				</DialogActions>
			</Dialog>
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
								<Button onClick={handleDialogOpen} variant={"contained"}>
									Buy now
								</Button>
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
