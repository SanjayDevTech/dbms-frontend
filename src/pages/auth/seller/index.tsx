import Auth from "components/auth";

const SellerAuthPage = () => {
	const authHandler = (email: any, pwd: any, mode: string) => {
		console.log(`Seller => Email: ${email}, Pwd: ${pwd}, Mode: ${mode}`);
	};

	return <Auth option="seller" handler={authHandler} />;
};

export default SellerAuthPage;
