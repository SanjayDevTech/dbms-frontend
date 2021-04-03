import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import Header from "components/header";
import Product from "components/product";
import { productList } from "fixtures/product";

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
	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.section}>
				<Grid container spacing={2} justify="space-around">
					{productList.length > 0 &&
						productList.map((product) => (
							<Grid key={product.productId} item>
								<Product
									productId={product.productId}
									cover={product.cover}
									productName={product.productName}
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
