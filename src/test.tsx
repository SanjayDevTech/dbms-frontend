import React from "react";
import { useParams } from "react-router";
import Header from "components/header";
import Product from "components/product";
import ErrorPage from "pages/info/error";
import { productList } from "fixtures/product";

const Test = () => {
	const { component } = useParams<{
		component: string;
	}>();

	const product = productList[0];

	switch (component) {
		case "header":
			return <Header />;

		case "product":
			return (
				<Product
					productId={product.productId}
					cover={product.cover}
					productName={product.productName}
					price={product.price}
				/>
			);

		default:
			return <ErrorPage error={"404"} />;
	}
};

export default Test;
