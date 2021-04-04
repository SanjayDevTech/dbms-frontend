import { ProductType } from "utils/types";

export default interface ProductStateType {
	product: ProductType[];
	loading: boolean;
	error: string;
}
