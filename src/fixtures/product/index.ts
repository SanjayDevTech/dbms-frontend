import { ProductPropsI } from "components/product/types";
import placeholder from "assets/images/placeholder.png";

export const productList: ProductPropsI[] = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
].map((v) => ({
	productId: v,
	productName: "Product Name",
	price: "200",
	cover: placeholder,
}));
