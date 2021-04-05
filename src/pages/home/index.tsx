import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "components/header";
import Product from "components/product";
import { useSelector, useDispatch } from "react-redux";
import { selectProductData, selectProductStatus } from "state/slices";
import { ProductAction } from "state/actions";

const useStyles = makeStyles({
	root: {
		height: "100%",
		display: "flex",
		flexFlow: "column",
	},
	section: {
		flexGrow: 1,
		background: "linear-gradient(180deg, #006064 0%, #E5E5E5 100%)",
		padding: 20,
		overflow: "auto",
	},
});

const HomePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const products = useSelector(selectProductData);

	React.useEffect(() => {
		dispatch(ProductAction.fetchRequestProduct());
	}, []);

	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.section}>
				<Grid container spacing={2} justify="space-around">
					{products.length > 0 &&
						products.map((product) => (
							<Grid key={product.id} item>
								<Product
									productId={product.id}
									cover={product.image}
									productName={product.name}
									price={product.price}
								/>
							</Grid>
						))}
				</Grid>
			</div>
		</div>
	);
};

export default HomePage;
