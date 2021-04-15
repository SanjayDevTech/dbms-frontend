import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Typography, Box } from "@material-ui/core";
import Header from "components/header";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "state/slices";
import { removeCart } from "state/cart/actions";

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

	const cartList = useSelector(selectCart);
	const dispatch = useDispatch();

	const removeHandler = (id: number) => {
		dispatch(removeCart(id));
	};

	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.section}>
				<Paper className={classes.content}>
					<Box display={"flex"} height={"100%"} flexDirection={"column"}>
						{cartList.length > 0 ? (
							cartList.map((cart) => (
								<Box
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
				<Button className={classes.btn} variant={"contained"} color={"primary"}>
					Checkout
				</Button>
			</div>
		</div>
	);
};

export default CartPage;
