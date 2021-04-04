export interface ProductType {
	id: number;
	name: string;
	des: string;
	price: string;
	cover: string;
	sellerId: string;
}

export interface PurchaseType {
	id: number;
	userId: string;
	productId: string;
	status: number;
}
