import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Header from "components/header";
import Product from "components/product";
import { ProductType } from "utils/types";
import { backendAPI } from "services/http";

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
	white: {
		color: "#FFF",
	},
});

const HomePage = () => {
	const classes = useStyles();
	const [products, setProducts] = React.useState<ProductType[]>([]);
	const [error, setError] = React.useState("");

	// eslint-disable-next-line
	React.useEffect(() => {
		backendAPI
			.get<ProductType[]>("/products?query=")
			.then((res) => {
				if (res.status === 200) {
					setProducts(res.data);
				} else {
					setError("Error code: " + res.status);
				}
			})
			.catch((e) => {
				setError(e.message);
			});
	}, []);

	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.section}>
				<Grid container spacing={2} justify="space-around">
					{products?.length > 0 &&
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
					{error && (
						<Grid item>
							<Typography className={classes.white}>{error}</Typography>
						</Grid>
					)}
				</Grid>
			</div>
		</div>
	);
};

export default HomePage;
