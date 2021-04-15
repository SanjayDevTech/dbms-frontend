import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Paper,
	Button,
	Typography,
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import Header from "components/header";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectUserAuth } from "state/slices";
import { removeCart } from "state/cart/actions";
import { PurchaseType, OrderType } from "utils/types";
import { backendAPI } from "services/http";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

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
		height: "40px",
	},
	name: {
		fontWeight: "bold",
		fontSize: "30px",
		lineHeight: "56px",
	},
	price: {
		fontWeight: "bold",
		fontSize: "18px",
		lineHeight: "38px",
		color: "#1565C0",
	},
	cartItem: {
		margin: 10,
		padding: 20,
		backgroundColor: "#FFF",
		borderRadius: "20px",
	},
});

const CartPage = () => {
	const classes = useStyles();

	const [buyNowDialog, setBuyNowDialog] = React.useState(false);
	const [ordersDialog, setOrdersDialog] = React.useState(false);
	const [orders, setOrders] = React.useState<OrderType[]>([]);

	const cartList = useSelector(selectCart);
	const user = useSelector(selectUserAuth);
	const dispatch = useDispatch();

	const removeHandler = (id: number) => {
		dispatch(removeCart(id));
	};

	const handleDialogOpen = () => {
		setBuyNowDialog(true);
	};

	const handleDialogClose = () => {
		setBuyNowDialog(false);
	};

	const handleOrdersDialogOpen = () => {
		setOrdersDialog(true);
	};

	const handleOrdersDialogClose = () => {
		setOrdersDialog(false);
	};

	React.useEffect(() => {
		backendAPI
			.post<{
				status: boolean;
				error: string | null;
				purchases: OrderType[] | null;
			}>("/purchases/get", {
				email: user.email,
				hash: user.hash,
			})
			.then((res) => {
				if (res.status === 200 && res.data.status) {
					setOrders(res.data.purchases || []);
				} else {
					console.log("Error " + res.data.error);
				}
			})
			.catch(console.log);
	}, []);

	return (
		<div className={classes.root}>
			<Header />
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
						Do u want to buy these products now?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} color="primary">
						No
					</Button>
					<Button onClick={handleDialogClose} color="primary">
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={ordersDialog}
				TransitionComponent={Transition}
				keepMounted
				scroll={"body"}
				onClose={handleOrdersDialogClose}
				aria-labelledby="orders-dialog-slide-title"
				aria-describedby="orders-dialog-slide-description">
				<DialogTitle id="orders-dialog-slide-title">{"Orders"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="orders-dialog-slide-description">
						{orders.map((o) => (
							<h1>{o.name}</h1>
						))}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleOrdersDialogClose} color="primary">
						Dismiss
					</Button>
				</DialogActions>
			</Dialog>
			<div className={classes.section}>
				<Paper className={classes.content}>
					<Box display={"flex"} height={"100%"} flexDirection={"column"}>
						{cartList.length > 0 ? (
							cartList.map((cart) => (
								<Box
									key={cart.id}
									display={"flex"}
									flexDirection={"column"}
									className={classes.cartItem}>
									<Typography className={classes.name} component={"h2"}>
										{cart.name}
									</Typography>
									<Typography className={classes.price} component={"h2"}>
										{cart.price} $
									</Typography>
									<Button
										onClick={() => removeHandler(cart.id)}
										variant={"outlined"}
										color={"primary"}>
										Remove
									</Button>
								</Box>
							))
						) : (
							<Box
								flex={"1"}
								height={"100%"}
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}>
								<Typography>Nothing in the cart</Typography>
							</Box>
						)}
					</Box>
				</Paper>
				<Box display={"flex"}>
					<Button
						disabled={cartList.length === 0}
						onClick={handleDialogOpen}
						className={classes.btn}
						variant={"contained"}
						color={"primary"}>
						Checkout
					</Button>
					<Button
						onClick={handleOrdersDialogOpen}
						className={classes.btn}
						variant={"contained"}
						color={"primary"}>
						Orders
					</Button>
				</Box>
			</div>
		</div>
	);
};

export default CartPage;
