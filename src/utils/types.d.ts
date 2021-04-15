export interface ProductType {
	id: number;
	name: string;
	des: string;
	price: string;
	image: string;
	sellerId: number;
}

export interface PurchaseType {
	id: number;
	userId: number;
	productId: number;
	status: number;
}

export interface OrderType {
	id: number;
	name: string;
	status: number;
}
